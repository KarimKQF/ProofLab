/**
 * Correcteur IA optionnel de ProofLab : petit serveur local, désactivé par défaut.
 *
 * - Ne démarre la correction que si PROOFLAB_AI=1 est défini dans l'environnement.
 * - La clé reste côté serveur : le navigateur ne la voit jamais. Le SDK la lit dans
 *   ANTHROPIC_API_KEY (ou dans un profil `ant auth login`).
 * - N'écoute que sur 127.0.0.1. Le serveur de Vite relaie /api vers ce port.
 * - Une relecture par IA n'est jamais une vérification formelle : l'interface l'affiche
 *   comme « relecture non formelle », distincte des verdicts du vérifieur déterministe.
 *
 * Usage : PROOFLAB_AI=1 ANTHROPIC_API_KEY=... node server/ai-proxy.mjs
 * Variables facultatives : PROOFLAB_AI_MODEL (défaut claude-opus-5-5), PROOFLAB_AI_PORT (défaut 8787).
 */
import http from 'node:http';
import Anthropic from '@anthropic-ai/sdk';

const ENABLED = process.env.PROOFLAB_AI === '1';
const MODEL = process.env.PROOFLAB_AI_MODEL || 'claude-opus-5-5';
const PORT = Number(process.env.PROOFLAB_AI_PORT || 8787);
const MAX_BODY = 200_000;

const SYSTEM = `Tu relis la démonstration d'un étudiant de M1-M2 en analyse fonctionnelle et EDP, en français.
On te donne l'énoncé, une solution de référence et la rédaction de l'étudiant. Une autre méthode que la référence peut être correcte.
Écris une relecture brève et structurée : ce qui est établi correctement ; les hypothèses non vérifiées ou les étapes non justifiées ; les erreurs caractérisées, avec un contre-exemple quand c'est possible ; une suggestion pour progresser, sans réécrire toute la preuve.
Emploie un langage strictement mathématique, sans analogie physique. Distingue existence, unicité, régularité, stabilité, et convergence faible, forte, faible-*.
Ne déclare jamais la preuve « validée » : tu n'es pas un vérificateur formel. Formules en LaTeX entre $…$.`;

const client = ENABLED ? new Anthropic() : null;
let busy = false;

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('Requête trop volumineuse.'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function review({ statement, solution, proof }) {
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'high' },
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: `## Énoncé\n${statement}\n\n## Solution de référence\n${solution}\n\n## Rédaction de l'étudiant\n${proof}`,
      },
    ],
  });
  const message = await stream.finalMessage();
  if (message.stop_reason === 'refusal') {
    const category = message.stop_details?.category;
    return { error: `Le modèle a décliné cette relecture${category ? ` (catégorie : ${category})` : ''}.` };
  }
  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n\n')
    .trim();
  if (!text) return { error: 'Réponse vide du correcteur.' };
  const truncated = message.stop_reason === 'max_tokens' ? '\n\n*(Relecture tronquée.)*' : '';
  return { text: text + truncated, model: message.model };
}

function errorMessage(e) {
  if (e instanceof Anthropic.AuthenticationError) return [401, 'Identifiants API invalides ou absents.'];
  if (e instanceof Anthropic.PermissionDeniedError) return [403, 'Accès refusé par l’API.'];
  if (e instanceof Anthropic.RateLimitError) return [429, 'Limite de requêtes atteinte : réessaie plus tard.'];
  if (e instanceof Anthropic.BadRequestError) return [400, `Requête refusée par l’API : ${e.message}`];
  if (e instanceof Anthropic.APIConnectionError) return [502, 'Connexion à l’API impossible.'];
  if (e instanceof Anthropic.APIError) return [502, `Erreur de l’API (${e.status}).`];
  return [500, e instanceof Error ? e.message : 'Erreur inattendue.'];
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (req.method === 'GET' && url.pathname === '/api/ai/status') {
    return send(res, 200, { enabled: ENABLED, model: ENABLED ? MODEL : null });
  }
  if (req.method === 'POST' && url.pathname === '/api/ai/review') {
    if (!ENABLED) return send(res, 403, { error: 'Correcteur désactivé (PROOFLAB_AI n’est pas défini à 1).' });
    if (busy) return send(res, 429, { error: 'Une relecture est déjà en cours.' });
    let payload;
    try {
      payload = JSON.parse(await readBody(req));
    } catch (e) {
      return send(res, 400, { error: e instanceof Error ? e.message : 'Corps de requête illisible.' });
    }
    const { statement, solution, proof } = payload ?? {};
    if (![statement, solution, proof].every((x) => typeof x === 'string' && x.length > 0)) {
      return send(res, 400, { error: 'Champs attendus : statement, solution, proof.' });
    }
    busy = true;
    try {
      const result = await review({ statement, solution, proof });
      return send(res, result.error ? 422 : 200, result);
    } catch (e) {
      const [status, message] = errorMessage(e);
      return send(res, status, { error: message });
    } finally {
      busy = false;
    }
  }
  return send(res, 404, { error: 'Route inconnue.' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Correcteur ProofLab sur http://127.0.0.1:${PORT} — ${ENABLED ? `activé (${MODEL})` : 'désactivé (définir PROOFLAB_AI=1)'}`);
});
