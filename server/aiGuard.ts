import { createHmac, timingSafeEqual } from 'node:crypto';

/** Shared defences for the learner chats: clean input, unforgeable history, and no prompt or model leaks. */

// Control and invisible formatting characters are a common way to hide injected instructions.
const HIDDEN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤﻿]/g;
export const clean = (text: string) => text.replace(HIDDEN, '').trim();

const secretFor = (apiKey: string) => createHmac('sha256', apiKey).update('petualang-chat-history-v1').digest();

/** Signs an assistant reply so a later request cannot pass off invented "assistant" turns. */
export function signReply(apiKey: string, content: string): string {
  return createHmac('sha256', secretFor(apiKey)).update(content).digest('base64url').slice(0, 32);
}

export function validReply(apiKey: string, content: string, sig: unknown): boolean {
  if (typeof sig !== 'string' || sig.length !== 32) return false;
  const expected = Buffer.from(signReply(apiKey, content));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export type ChatTurn = { role: 'user' | 'assistant'; content: string; sig?: string };

/** Keeps learner turns (cleaned) and only the assistant turns this server signed. */
export function trustedHistory(apiKey: string, turns: ChatTurn[]): { role: 'user' | 'assistant'; content: string }[] {
  return turns
    .filter((turn) => turn.role === 'user' || validReply(apiKey, turn.content, turn.sig))
    .map((turn) => ({ role: turn.role, content: turn.role === 'user' ? clean(turn.content) : turn.content }))
    .filter((turn) => turn.content.length > 0);
}

export const SAFE_REPLY = 'Aku Tutor Petualang Web. Aku tidak membahas cara kerjaku di balik layar. Ayo kembali ke pelajaran: bagian mana yang ingin kamu pahami?';

const words = (text: string) => text.toLowerCase().normalize('NFKC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);

/** True when a reply repeats 8+ consecutive words of the system prompt, or names the model as itself or its maker. */
export function leaks(reply: string, systemPrompt: string, modelIds: string[]): boolean {
  const lower = reply.toLowerCase();
  // The exact model id and the gateway never belong in a lesson answer.
  if (/1inference|tokenportal/.test(lower) || modelIds.some((id) => id && lower.includes(id.toLowerCase()))) return true;
  // Naming a model is fine as lesson content ("coba API DeepSeek atau OpenAI"); claiming to be one is not.
  if (/\b(aku|saya|tutor ini|model ini|ai ini|kamu sedang (?:berbicara|bicara|chat) dengan)\b[^.\n]{0,40}\b(deepseek|gpt|chatgpt|gemini|claude|llama|qwen|mistral|grok|kimi|glm)/.test(lower)) return true;
  // Models sometimes name their maker ("model bahasa yang dibuat oleh ..."), which reveals the vendor.
  if (/(model bahasa|language model|dibuat oleh|dikembangkan oleh|dilatih oleh|trained by|developed by|built by)\W+(\w+\W+){0,4}(openai|google|anthropic|meta|mistral|alibaba|qwen|deepseek)/.test(lower)) return true;
  const prompt = words(systemPrompt);
  const grams = new Set<string>();
  for (let i = 0; i + 8 <= prompt.length; i++) grams.add(prompt.slice(i, i + 8).join(' '));
  const out = words(reply);
  for (let i = 0; i + 8 <= out.length; i++) if (grams.has(out.slice(i, i + 8).join(' '))) return true;
  return false;
}

/** Button labels are plain text, so Markdown emphasis and heading marks are removed from them. */
export const plainText = (text: string) => text
  .replace(/\*\*(.+?)\*\*/g, '$1')
  .replace(/^#{1,6}\s+/gm, '');

/**
 * Splits the optional last line "PILIHAN: a | b | c" off a reply. The options become tap-to-send buttons,
 * so they are capped at 3 (Hick's law) and kept short; anything malformed is dropped, never shown.
 */
export function splitOptions(text: string): { reply: string; options: string[] } {
  // The model sometimes writes the label with nothing after it; the line is removed either way.
  const match = text.match(/\n*[ \t]*PILIHAN[ \t]*:[ \t]*(.*?)\s*$/i);
  if (!match || match.index === undefined) return { reply: text, options: [] };
  const options = [...new Set(match[1].split('|').map((o) => clean(plainText(o)).replace(/^["'“”]+|["'“”.]+$/g, '').trim()))]
    .filter((o) => o.length > 0 && o.length <= 60)
    .slice(0, 3);
  return { reply: text.slice(0, match.index).trim(), options };
}

/**
 * The house style has no long dashes, but models use them as pauses anyway. Outside code, "—" becomes a comma
 * and a spaced "–" does too; an unspaced "–" is a range ("44–48px") and stays.
 */
export function noLongDashes(text: string): string {
  return text
    .split(/(```[\s\S]*?(?:```|$)|`[^`\n]*`)/)
    .map((part, i) => (i % 2 ? part : part
      .replace(/\s*—\s*/g, ', ')
      .replace(/\s+–\s+/g, ', ')
      .replace(/,\s*([.,;:!?])/g, '$1')))
    .join('');
}

/**
 * Per-learner and per-instance request limits for one endpoint. `take` claims a slot or returns false;
 * the caller must call `release` when the request finishes.
 * shortcut: counts live in one warm instance, not across instances; the WAF rule caps each IP globally.
 */
export function createLimiter(limits: { perMinute: number; perHour: number; perInstanceMinute: number; inFlight: number }) {
  const perClient = new Map<string, number[]>();
  let recent: number[] = [];
  let inFlight = 0;
  return {
    take(clientId: string, t: number): boolean {
      recent = recent.filter((at) => t - at < 60_000);
      const mine = (perClient.get(clientId) ?? []).filter((at) => t - at < 3_600_000);
      const lastMinute = mine.filter((at) => t - at < 60_000).length;
      if (lastMinute >= limits.perMinute || mine.length >= limits.perHour
        || recent.length >= limits.perInstanceMinute || inFlight >= limits.inFlight) return false;
      mine.push(t);
      perClient.set(clientId, mine);
      recent.push(t);
      if (perClient.size > 2000) perClient.delete(perClient.keys().next().value!);
      inFlight++;
      return true;
    },
    release() {
      inFlight = Math.max(0, inFlight - 1);
    },
  };
}
