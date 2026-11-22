/**
 * API Tiruan Lokal Toko Rani (toko-rani.example) untuk seluruh simulator (§13.5).
 * Tidak pernah memanggil jaringan eksternal.
 */

export interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  durationMs: number;
}

export interface MockRequestOptions {
  headers?: Record<string, string>;
  scenario?: 'ok' | 'error' | 'empty' | 'slow' | 'unauthorized' | 'ratelimit';
  delayMs?: number;
}

const PRODUCTS = [
  { id: 1, nama: 'Buku Catatan Saku', harga: 25000, stok: 12, kategori: 'alat-tulis' },
  { id: 2, nama: 'Tas Kanvas Bito', harga: 85000, stok: 5, kategori: 'tas' },
  { id: 7, nama: 'Botol Minum Polos', harga: 45000, stok: 9, kategori: 'perlengkapan' },
  { id: 12, nama: 'Stiker Paket Web', harga: 15000, stok: 30, kategori: 'aksesori' },
];

const ORDERS = [
  { id: 'ORD-101', pembeli: 'Dimas', produkId: 7, jumlah: 1, status: 'dikemas' },
  { id: 'ORD-102', pembeli: 'Sari', produkId: 2, jumlah: 2, status: 'dikirim' },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockFetch(
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  rawPath: string,
  body?: unknown,
  options: MockRequestOptions = {},
): Promise<MockResponse> {
  const [cleanPath, queryStr] = rawPath.split('?');
  const params = new URLSearchParams(queryStr ?? '');
  const scenarioParam = params.get('scenario') as MockRequestOptions['scenario'] | null;
  const scenario = options.scenario ?? scenarioParam ?? 'ok';

  const delay = options.delayMs ?? (scenario === 'slow' ? 900 : 350);
  await wait(delay);

  const baseHeaders = {
    'content-type': 'application/json; charset=utf-8',
    'x-powered-by': 'toko-rani.example-mock',
  };

  if (scenario === 'error') {
    return {
      status: 500,
      statusText: 'Internal Server Error',
      headers: baseHeaders,
      body: { error: 'Dapur sedang sibuk. Coba lagi sebentar lagi.' },
      durationMs: delay,
    };
  }

  if (scenario === 'unauthorized') {
    return {
      status: 401,
      statusText: 'Unauthorized',
      headers: baseHeaders,
      body: { error: 'Kamu belum membawa tiket login (token).' },
      durationMs: delay,
    };
  }

  if (scenario === 'ratelimit') {
    return {
      status: 429,
      statusText: 'Too Many Requests',
      headers: { ...baseHeaders, 'retry-after': '5' },
      body: { error: 'Terlalu banyak permintaan! Tunggu 5 detik sebelum mencoba lagi.' },
      durationMs: delay,
    };
  }

  if (scenario === 'empty') {
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: { data: [], total: 0 },
      durationMs: delay,
    };
  }

  if (cleanPath === '/produk' && method === 'GET') {
    const q = (params.get('q') ?? '').toLowerCase();
    const filtered = q
      ? PRODUCTS.filter((p) => p.nama.toLowerCase().includes(q))
      : PRODUCTS;
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: { data: filtered, total: filtered.length },
      durationMs: delay,
    };
  }

  if (cleanPath.startsWith('/produk/') && method === 'GET') {
    const id = Number(cleanPath.split('/')[2]);
    const found = PRODUCTS.find((p) => p.id === id);
    if (!found) {
      return {
        status: 404,
        statusText: 'Not Found',
        headers: baseHeaders,
        body: { error: `Produk dengan id ${id} tidak ditemukan di gudang.` },
        durationMs: delay,
      };
    }
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: found,
      durationMs: delay,
    };
  }

  if (cleanPath === '/pesanan' && method === 'GET') {
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: { data: ORDERS },
      durationMs: delay,
    };
  }

  if (cleanPath === '/pesanan' && method === 'POST') {
    if (!body || typeof body !== 'object') {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: baseHeaders,
        body: { error: 'Isi pesanan (JSON body) belum lengkap.' },
        durationMs: delay,
      };
    }
    return {
      status: 201,
      statusText: 'Created',
      headers: baseHeaders,
      body: {
        message: 'Pesanan baru berhasil dicatat!',
        pesanan: { id: 'ORD-103', ...(body as Record<string, unknown>), status: 'baru' },
      },
      durationMs: delay,
    };
  }

  if (cleanPath.startsWith('/pesanan/') && (method === 'PATCH' || method === 'PUT')) {
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: {
        message: 'Pesanan berhasil diperbarui.',
        id: cleanPath.split('/')[2],
        perubahan: body ?? {},
      },
      durationMs: delay,
    };
  }

  if (cleanPath.startsWith('/pesanan/') && method === 'DELETE') {
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: { message: `Pesanan ${cleanPath.split('/')[2]} dibatalkan.` },
      durationMs: delay,
    };
  }

  if (cleanPath === '/profil' && method === 'GET') {
    const auth = options.headers?.['authorization'] ?? options.headers?.['Authorization'] ?? '';
    if (!auth.startsWith('Bearer ')) {
      return {
        status: 401,
        statusText: 'Unauthorized',
        headers: baseHeaders,
        body: { error: 'Header Authorization: Bearer <token> dibutuhkan.' },
        durationMs: delay,
      };
    }
    if (auth.includes('tamu')) {
      return {
        status: 403,
        statusText: 'Forbidden',
        headers: baseHeaders,
        body: { error: 'Kamu dikenali sebagai Tamu, tetapi tidak punya izin membuka halaman pemilik toko.' },
        durationMs: delay,
      };
    }
    return {
      status: 200,
      statusText: 'OK',
      headers: baseHeaders,
      body: { nama: 'Rani', toko: 'Toko Rani', peran: 'pemilik' },
      durationMs: delay,
    };
  }

  return {
    status: 404,
    statusText: 'Not Found',
    headers: baseHeaders,
    body: { error: `Endpoint ${method} ${cleanPath} tidak terdaftar di buku menu API.` },
    durationMs: delay,
  };
}
