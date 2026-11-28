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

/** True when a reply repeats 8+ consecutive words of the system prompt or names the model behind the chat. */
export function leaks(reply: string, systemPrompt: string, modelIds: string[]): boolean {
  const lower = reply.toLowerCase();
  if (/deepseek/.test(lower) || modelIds.some((id) => id && lower.includes(id.toLowerCase()))) return true;
  // Models sometimes name their maker ("model bahasa yang dibuat oleh ..."), which reveals the vendor.
  if (/(model bahasa|language model|dibuat oleh|dikembangkan oleh|dilatih oleh|trained by|developed by|built by)\W+(\w+\W+){0,4}(openai|google|anthropic|meta|mistral|alibaba|qwen|deepseek)/.test(lower)) return true;
  const prompt = words(systemPrompt);
  const grams = new Set<string>();
  for (let i = 0; i + 8 <= prompt.length; i++) grams.add(prompt.slice(i, i + 8).join(' '));
  const out = words(reply);
  for (let i = 0; i + 8 <= out.length; i++) if (grams.has(out.slice(i, i + 8).join(' '))) return true;
  return false;
}

/** The UI shows plain text; some models add Markdown despite the prompt, so emphasis and heading marks are removed. */
export const plainText = (text: string) => text
  .replace(/\*\*(.+?)\*\*/g, '$1')
  .replace(/^#{1,6}\s+/gm, '');
