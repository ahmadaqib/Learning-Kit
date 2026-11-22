import type { Lesson, World } from './schema';

export interface WorldBundle {
  world: World;
  lessons: Lesson[];
}

const cache = new Map<string, Promise<WorldBundle>>();

export function loadWorldBundle(worldId: string): Promise<WorldBundle> {
  const cached = cache.get(worldId);
  if (cached) return cached;

  const promise = (async () => {
    switch (worldId) {
      case 'a01':
        return import('./worlds/a01-kota-web');
      case 'a02':
        return import('./worlds/a02-hutan-html');
      case 'a03':
        return import('./worlds/a03-bengkel-css');
      case 'a04':
        return import('./worlds/a04-pabrik-js');
      case 'a05':
        return import('./worlds/a05-pulau-responsif');
      case 'a06':
        return import('./worlds/a06-desa-ux');
      case 'a07':
        return import('./worlds/a07-galeri-desain');
      case 'a08':
        return import('./worlds/a08-studio-warna-huruf');
      case 'a09':
        return import('./worlds/a09-toko-komponen');
      case 'a10':
        return import('./worlds/a10-taman-ramah');
      case 'a11':
        return import('./worlds/a11-menara-alat');
      case 'a12':
        return import('./worlds/a12-benteng-keamanan');
      case 'b01':
        return import('./worlds/b01-restoran-api');
      case 'b02':
        return import('./worlds/b02-kantor-pos-http');
      case 'b03':
        return import('./worlds/b03-gudang-json');
      case 'b04':
        return import('./worlds/b04-peta-jenis-api');
      case 'b05':
        return import('./worlds/b05-menara-realtime');
      case 'b06':
        return import('./worlds/b06-lonceng-kejadian');
      case 'b07':
        return import('./worlds/b07-gerbang-login');
      case 'b08':
        return import('./worlds/b08-satpam-api');
      case 'b09':
        return import('./worlds/b09-dapur-frontend');
      case 'b10':
        return import('./worlds/b10-puncak-petualang');
      default:
        throw new Error(`Dunia tidak ditemukan: ${worldId}`);
    }
  })();

  cache.set(worldId, promise);
  return promise;
}

export function prefetchWorldBundle(worldId: string): void {
  void loadWorldBundle(worldId).catch(() => {});
}
