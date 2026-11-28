import { describe, expect, it } from 'vitest';
import { GLOSSARY_BY_ID, GLOSSARY_TOPICS } from '@/content/glossary';

describe('glossary topics', () => {
  it('only lists existing terms, each once per topic', () => {
    for (const topic of GLOSSARY_TOPICS) {
      expect(topic.termIds.filter((id) => !GLOSSARY_BY_ID[id]), topic.id).toEqual([]);
      expect(new Set(topic.termIds).size, topic.id).toBe(topic.termIds.length);
    }
    expect(new Set(GLOSSARY_TOPICS.map((t) => t.id)).size).toBe(GLOSSARY_TOPICS.length);
  });
});
