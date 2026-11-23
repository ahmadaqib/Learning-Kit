import recordings from './petVoiceManifest.json';

export const PET_VOICE_SAMPLE = 'Halo! Aku teman belajarmu. Mau kita coba satu langkah kecil?';
const phrases: Readonly<Record<string, string>> = recordings;

/** Return a complete spoken tip or let the device reader speak the whole text. */
export function petVoiceFiles(text: string): string[] {
  const sentences = text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];
  const files: string[] = [];
  for (const sentence of sentences) {
    const phrase = sentence.trim();
    if (!Object.hasOwn(phrases, phrase)) return [];
    files.push('/audio/pet/' + phrases[phrase] + '.mp3');
  }
  return files;
}
