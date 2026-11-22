import { world as world_a01, lessons as lessons_a01 } from './worlds/a01-kota-web';
import { world as world_a02, lessons as lessons_a02 } from './worlds/a02-hutan-html';
import { world as world_a03, lessons as lessons_a03 } from './worlds/a03-bengkel-css';
import { world as world_a04, lessons as lessons_a04 } from './worlds/a04-pabrik-js';
import { world as world_a05, lessons as lessons_a05 } from './worlds/a05-pulau-responsif';
import { world as world_a06, lessons as lessons_a06 } from './worlds/a06-desa-ux';
import { world as world_a07, lessons as lessons_a07 } from './worlds/a07-galeri-desain';
import { world as world_a08, lessons as lessons_a08 } from './worlds/a08-studio-warna-huruf';
import { world as world_a09, lessons as lessons_a09 } from './worlds/a09-toko-komponen';
import { world as world_a10, lessons as lessons_a10 } from './worlds/a10-taman-ramah';
import { world as world_a11, lessons as lessons_a11 } from './worlds/a11-menara-alat';
import { world as world_a12, lessons as lessons_a12 } from './worlds/a12-benteng-keamanan';
import { world as world_b01, lessons as lessons_b01 } from './worlds/b01-restoran-api';
import { world as world_b02, lessons as lessons_b02 } from './worlds/b02-kantor-pos-http';
import { world as world_b03, lessons as lessons_b03 } from './worlds/b03-gudang-json';
import { world as world_b04, lessons as lessons_b04 } from './worlds/b04-peta-jenis-api';
import { world as world_b05, lessons as lessons_b05 } from './worlds/b05-menara-realtime';
import { world as world_b06, lessons as lessons_b06 } from './worlds/b06-lonceng-kejadian';
import { world as world_b07, lessons as lessons_b07 } from './worlds/b07-gerbang-login';
import { world as world_b08, lessons as lessons_b08 } from './worlds/b08-satpam-api';
import { world as world_b09, lessons as lessons_b09 } from './worlds/b09-dapur-frontend';
import { world as world_b10, lessons as lessons_b10 } from './worlds/b10-puncak-petualang';
import type { Lesson, World } from './schema';

export const WORLDS: World[] = [
  world_a01,
  world_a02,
  world_a03,
  world_a04,
  world_a05,
  world_a06,
  world_a07,
  world_a08,
  world_a09,
  world_a10,
  world_a11,
  world_a12,
  world_b01,
  world_b02,
  world_b03,
  world_b04,
  world_b05,
  world_b06,
  world_b07,
  world_b08,
  world_b09,
  world_b10,
];

export const WORLDS_BY_ID: Record<string, World> = Object.fromEntries(
  WORLDS.map((w) => [w.id, w]),
);

export const ALL_LESSONS: Lesson[] = [
  ...lessons_a01,
  ...lessons_a02,
  ...lessons_a03,
  ...lessons_a04,
  ...lessons_a05,
  ...lessons_a06,
  ...lessons_a07,
  ...lessons_a08,
  ...lessons_a09,
  ...lessons_a10,
  ...lessons_a11,
  ...lessons_a12,
  ...lessons_b01,
  ...lessons_b02,
  ...lessons_b03,
  ...lessons_b04,
  ...lessons_b05,
  ...lessons_b06,
  ...lessons_b07,
  ...lessons_b08,
  ...lessons_b09,
  ...lessons_b10,
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(
  ALL_LESSONS.map((l) => [l.id, l]),
);
