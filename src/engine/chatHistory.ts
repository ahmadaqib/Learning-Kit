import type { ChatMessage } from '@/components/chat/ChatBox';

/**
 * The Tanya conversation, kept in this browser only (localStorage), per profile, so it survives a hard refresh
 * like quiz progress does. Capped to the latest messages so it stays small; nothing here is sent to a server
 * except as the chat history the learner is already sending.
 */
const key = (profileId: string) => `petualang-web-chat-v1:${profileId}`;
const MAX_MESSAGES = 40;
const MAX_CHARS = 60_000;

const isMessage = (m: unknown): m is ChatMessage => {
  const v = m as ChatMessage;
  return !!v && (v.role === 'user' || v.role === 'assistant') && typeof v.content === 'string'
    && (v.sig === undefined || typeof v.sig === 'string')
    && (v.options === undefined || (Array.isArray(v.options) && v.options.every((o) => typeof o === 'string')));
};

export function loadChat(profileId: string): ChatMessage[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key(profileId)) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isMessage).slice(-MAX_MESSAGES) : [];
  } catch {
    return [];
  }
}

export function saveChat(profileId: string, messages: ChatMessage[]): void {
  try {
    if (!messages.length) return localStorage.removeItem(key(profileId));
    // Older answer buttons are never shown again, so only the last message keeps them.
    let kept = messages.slice(-MAX_MESSAGES).map((m, i, all) => (i === all.length - 1 ? m : { ...m, options: undefined }));
    let json = JSON.stringify(kept);
    while (json.length > MAX_CHARS && kept.length > 2) {
      kept = kept.slice(2);
      json = JSON.stringify(kept);
    }
    localStorage.setItem(key(profileId), json);
  } catch {
    // Storage full or blocked (private mode): the chat still works for this tab, it just is not kept.
  }
}

export function clearChat(profileId: string): void {
  try {
    localStorage.removeItem(key(profileId));
  } catch {
    // Nothing stored or storage blocked.
  }
}
