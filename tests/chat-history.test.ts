import { beforeEach, describe, expect, it } from 'vitest';
import { clearChat, loadChat, saveChat } from '@/engine/chatHistory';
import type { ChatMessage } from '@/components/chat/ChatBox';

describe('Tanya chat history in localStorage', () => {
  beforeEach(() => localStorage.clear());

  it('survives a reload per profile and keeps answer buttons only on the last message', () => {
    const chat: ChatMessage[] = [
      { role: 'user', content: 'Uji aku' },
      { role: 'assistant', content: 'UI atau UX?', sig: 's1', options: ['UI', 'UX'] },
      { role: 'user', content: 'UX' },
      { role: 'assistant', content: 'Tepat.', sig: 's2', options: ['Lanjut'] },
    ];
    saveChat('p1', chat);
    const restored = loadChat('p1');
    expect(restored.map((m) => m.content)).toEqual(['Uji aku', 'UI atau UX?', 'UX', 'Tepat.']);
    expect(restored[1].options).toBeUndefined();
    expect(restored[3]).toEqual({ role: 'assistant', content: 'Tepat.', sig: 's2', options: ['Lanjut'] });
    expect(loadChat('p2')).toEqual([]);
  });

  it('caps the size, ignores corrupt data and clears on request', () => {
    const many: ChatMessage[] = Array.from({ length: 60 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'Pesan ' + i }));
    saveChat('p1', many);
    expect(loadChat('p1')).toHaveLength(40);
    expect(loadChat('p1')[0].content).toBe('Pesan 20');

    localStorage.setItem('petualang-web-chat-v1:p3', '{not json');
    expect(loadChat('p3')).toEqual([]);
    localStorage.setItem('petualang-web-chat-v1:p3', JSON.stringify([{ role: 'system', content: 'x' }, { role: 'user', content: 'ok' }]));
    expect(loadChat('p3')).toEqual([{ role: 'user', content: 'ok' }]);

    clearChat('p1');
    expect(loadChat('p1')).toEqual([]);
    saveChat('p1', many);
    saveChat('p1', []);
    expect(localStorage.getItem('petualang-web-chat-v1:p1')).toBeNull();
  });
});
