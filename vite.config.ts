/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5173,
    strictPort: false,
    // Le correcteur IA est optionnel et désactivé par défaut. Le proxy local n'est
    // contacté que si l'utilisateur démarre server/ai-proxy.mjs lui-même.
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
  build: {
    target: 'es2022',
    // Le contenu des 34 résultats forme à lui seul un morceau d'environ 1,7 Mo (non compressé).
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');
          if (path.includes('/src/content/')) return 'contenu';
          if (path.includes('/node_modules/katex/')) return 'katex';
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(path)) return 'react';
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/tests/**/*.test.{ts,tsx}'],
    testTimeout: 30000,
  },
});
