import { loadEnv, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import { companionHttp, tutorHttp } from './companionHttp';

export function companionPlugin(): Plugin {
  function mount(server: ViteDevServer | PreviewServer) {
    const env = loadEnv(server.config.mode, server.config.envDir, 'ONEINFERENCE_');
    const read = (name: string) => process.env[name] || env[name];
    server.middlewares.use('/api/companion', companionHttp(() => ({
      apiKey: read('ONEINFERENCE_API_KEY'),
      models: read('ONEINFERENCE_MODELS'),
    })));
    server.middlewares.use('/api/tutor', tutorHttp(() => ({
      apiKey: read('ONEINFERENCE_API_KEY'),
      model: read('ONEINFERENCE_TUTOR_MODEL'),
    })));
  }
  return { name: 'local-companion-api', configureServer: mount, configurePreviewServer: mount };
}
