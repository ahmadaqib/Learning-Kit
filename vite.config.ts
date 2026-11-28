import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { companionPlugin } from './server/companionVite';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';

// Identifies this build. The app compares it with /version.json to notice a newer deploy (src/engine/appUpdate.ts).
const BUILD_ID = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) || (process.env.VITEST ? 'test' : Date.now().toString(36));

function versionFile(): Plugin {
  return {
    name: 'version-file',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ id: BUILD_ID }) });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), companionPlugin(), versionFile()],
  define: {
    // The dev server never reloads itself for updates.
    __BUILD_ID__: JSON.stringify(process.env.NODE_ENV === 'production' ? BUILD_ID : 'dev'),
  },
  resolve: {
    alias: {
      '@': decodeURIComponent(new URL('./src', import.meta.url).pathname),
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('zod') || id.includes('zustand')) {
              return 'vendor-state';
            }
          }
          const worldMatch = id.match(/src\/content\/worlds\/([^/]+)\//);
          if (worldMatch) {
            return `world-${worldMatch[1]}`;
          }
          if (id.includes('src/components/sims/')) {
            return 'simulators';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
