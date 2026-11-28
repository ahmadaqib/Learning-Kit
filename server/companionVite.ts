import { loadEnv, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import { companionHttp, tutorHttp } from './companionHttp';

export function companionPlugin(): Plugin {
  function mount(server: ViteDevServer | PreviewServer) {
    const env = loadEnv(server.config.mode, server.config.envDir, 'TOKENPORTAL_');
    const read = (name: string) => process.env[name] || env[name];
    server.middlewares.use('/api/companion', companionHttp(() => ({
      apiKey: read('TOKENPORTAL_API_KEY'),
      models: read('TOKENPORTAL_MODELS'),
    })));
    server.middlewares.use('/api/tutor', tutorHttp(() => ({
      apiKey: read('TOKENPORTAL_API_KEY'),
      model: read('TOKENPORTAL_TUTOR_MODEL'),
    })));
  }
  return { name: 'local-companion-api', configureServer: mount, configurePreviewServer: mount };
}
