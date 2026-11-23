import { loadEnv, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import { companionHttp } from './companionHttp';

export function companionPlugin(): Plugin {
  function mount(server: ViteDevServer | PreviewServer) {
    const env = loadEnv(server.config.mode, server.config.envDir, 'TOKENPORTAL_');
    const handler = companionHttp(() => ({
      apiKey: process.env.TOKENPORTAL_API_KEY || env.TOKENPORTAL_API_KEY,
      models: process.env.TOKENPORTAL_MODELS || env.TOKENPORTAL_MODELS,
    }));
    server.middlewares.use('/api/companion', handler);
  }
  return { name: 'local-companion-api', configureServer: mount, configurePreviewServer: mount };
}
