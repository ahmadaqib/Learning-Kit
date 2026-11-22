/**
 * Pembaca teks (Web Speech API) dengan suara id-ID bila tersedia (§12.1).
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function getIndonesianVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.toLowerCase() === 'id-id') ??
    voices.find((v) => v.lang.toLowerCase().startsWith('id')) ??
    null
  );
}

export function hasIndonesianVoiceAvailable(): boolean {
  if (!isSpeechSupported()) return false;
  const voices = window.speechSynthesis.getVoices();
  // Saat browser belum memuat daftar suara (voices = []), jangan langsung menyembunyikan tombol
  // kecuali daftar sudah dimuat dan memang tidak ada id-*
  if (voices.length === 0) return true;
  return voices.some((v) => v.lang.toLowerCase().startsWith('id'));
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}

export function speakText(text: string, onEnd?: () => void): boolean {
  if (!isSpeechSupported() || !text.trim()) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getIndonesianVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'id-ID';
  }
  utterance.rate = 0.96;
  utterance.pitch = 1.02;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
  return true;
}
