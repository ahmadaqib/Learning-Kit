import React from 'react';
import type { Mode } from '@/content/schema';
import {
  DetektifKontrasSim,
  FittsTargetSim,
  GenericTrackASim,
  HickMenuSim,
  KupasBoxModelSim,
  MesinBlenderSim,
  PenggeserLayarSim,
  PlaygroundFlexboxSim,
  RakLabelHtmlSim,
  RestoranWebSim,
  RodaWarnaSim,
  TombolSeribuWajahSim,
} from './SimulatorsA';
import {
  BalapRealtimeSim,
  BelWebhookSim,
  DokterJsonSim,
  EmpatWajahLayarSim,
  PelayanGraphqlSim,
  PembacaGelangJwtSim,
  PenyortirStatusSim,
  PerakitRequestSim,
  PuncakApiSim,
  SatpamCorsSim,
  TeleponSopanSim,
} from './SimulatorsB';

interface SimulatorHostProps {
  simId: string;
  mode: Mode;
  props?: Record<string, unknown>;
  onCompleteInteraction?: () => void;
}

export const SimulatorHost: React.FC<SimulatorHostProps> = ({
  simId,
  mode,
  props,
  onCompleteInteraction,
}) => {
  const shared = { mode, props, onCompleteInteraction };

  switch (simId) {
    case 'restoran-web':
    case 'restoran-api':
      return <RestoranWebSim {...shared} />;
    case 'rak-label-html':
      return <RakLabelHtmlSim {...shared} />;
    case 'kupas-box-model':
      return <KupasBoxModelSim {...shared} />;
    case 'playground-flexbox':
      return <PlaygroundFlexboxSim {...shared} />;
    case 'mesin-blender':
      return <MesinBlenderSim {...shared} />;
    case 'penggeser-layar':
      return <PenggeserLayarSim {...shared} />;
    case 'desa-ux':
      return <GenericTrackASim {...shared} variant="desa-ux" />;
    case 'hick-menu':
      return <HickMenuSim {...shared} />;
    case 'fitts-target':
      return <FittsTargetSim {...shared} />;
    case 'roda-warna':
      return <RodaWarnaSim {...shared} />;
    case 'detektif-kontras':
      return <DetektifKontrasSim {...shared} />;
    case 'tombol-seribu-wajah':
      return <TombolSeribuWajahSim {...shared} />;
    case 'taman-akses':
      return <GenericTrackASim {...shared} variant="taman-akses" />;
    case 'menara-alat':
      return <GenericTrackASim {...shared} variant="menara-alat" />;
    case 'benteng-xss':
      return <GenericTrackASim {...shared} variant="benteng-xss" />;
    case 'penyortir-status':
      return <PenyortirStatusSim {...shared} />;
    case 'perakit-request':
      return <PerakitRequestSim {...shared} />;
    case 'dokter-json':
      return <DokterJsonSim {...shared} />;
    case 'pelayan-graphql':
      return <PelayanGraphqlSim {...shared} />;
    case 'balap-realtime':
      return <BalapRealtimeSim {...shared} />;
    case 'bel-webhook':
      return <BelWebhookSim {...shared} />;
    case 'pembaca-gelang-jwt':
      return <PembacaGelangJwtSim {...shared} />;
    case 'satpam-cors':
      return <SatpamCorsSim {...shared} />;
    case 'telepon-sopan':
      return <TeleponSopanSim {...shared} />;
    case 'empat-wajah-layar':
      return <EmpatWajahLayarSim {...shared} />;
    case 'puncak-api':
    default:
      return <PuncakApiSim {...shared} />;
  }
};
