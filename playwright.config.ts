import { defineConfig } from '@playwright/test';

/**
 * Tests de bout en bout avec le Chrome installé sur la machine (aucun navigateur
 * n'est téléchargé). Le serveur de développement est lancé automatiquement.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4174',
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    trace: 'off',
    // Autorise le WebGL logiciel (SwiftShader) si aucun GPU n’est disponible ; sur la machine
    // de développement, Chrome utilise le GPU (ANGLE / Direct3D 11).
    launchOptions: { args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] },
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js --port 4174 --strictPort --host 127.0.0.1',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
