import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichText, renderableSegments } from '../src/components/ui/RichText';
import { rBold, rCode, rJunior, rPro, rText } from '../src/content/lessonHelpers';
import type { Mode, Rich } from '../src/content/schema';

afterEach(cleanup);

function renderText(segments: Rich[], mode: Mode) {
  const { container } = render(<RichText segments={segments} mode={mode} />);
  const prose = container.querySelector('.pw-prose') as HTMLElement;
  return {
    text: (prose.textContent ?? '').replace(/\s+/g, ' ').trim(),
    codes: Array.from(prose.querySelectorAll('code')).map((c) => c.textContent),
  };
}

describe('RichText: Junior and Pro text', () => {
  it('shows only the Junior sentence when Pro code is marked modes [pro]', () => {
    const segments = [
      rJunior('Bito mengirim pesan ke server.'),
      rPro('Browser mengirim '),
      rCode('GET /api', ['pro']),
      rPro(' ke server.'),
    ];
    const junior = renderText(segments, 'junior');
    expect(junior.text).toBe('Bito mengirim pesan ke server.');
    expect(junior.codes).toEqual([]);
  });

  it('shows the Pro text and the Pro code, and not the Junior sentence', () => {
    const segments = [
      rJunior('Bito mengirim pesan ke server.'),
      rPro('Browser mengirim '),
      rCode('GET /api', ['pro']),
      rPro(' ke server.'),
    ];
    const pro = renderText(segments, 'pro');
    expect(pro.text).toBe('Browser mengirim GET /api ke server.');
    expect(pro.codes).toEqual(['GET /api']);
  });

  it('renders no code and no stray punctuation for a legacy body whose Junior sentence is complete', () => {
    // Legacy shape: a complete Junior sentence, then an untagged code token and a letterless closing mark.
    const segments = [rText('Kamu mengirim permintaan ke server. '), rCode('fetch(url)'), rText(' .')];
    const junior = renderText(segments, 'junior');
    expect(junior.codes).toEqual([]);
    expect(junior.text).toBe('Kamu mengirim permintaan ke server.');
  });

  it('leaves the Pro output of that legacy body unchanged', () => {
    const segments = [rText('Kamu mengirim permintaan ke server. '), rCode('fetch(url)'), rText(' .')];
    const pro = renderText(segments, 'pro');
    expect(pro.codes).toEqual(['fetch(url)']);
    expect(pro.text).toBe('Kamu mengirim permintaan ke server. fetch(url) .');
  });

  it('still renders a code segment that sits between two Junior text parts', () => {
    const segments = [rText('Ketik '), rCode('npm install'), rText(' lalu tekan Enter.')];
    const junior = renderText(segments, 'junior');
    expect(junior.codes).toEqual(['npm install']);
    expect(junior.text).toBe('Ketik npm install lalu tekan Enter.');
  });

  it('keeps a bold part and a Pro-only mark apart in Junior', () => {
    const segments = [rText('Server menjawab '), rBold('200'), rText(' artinya berhasil.'), rPro(' (OK)')];
    expect(renderText(segments, 'junior').text).toBe('Server menjawab 200 artinya berhasil.');
    expect(renderText(segments, 'pro').text).toBe('Server menjawab 200 artinya berhasil. (OK)');
  });
});

describe('renderableSegments: the local glue guard', () => {
  it('drops an untagged connecting fragment that follows a hidden Pro code segment', () => {
    const segments = [
      rJunior('Bito mengirim pesan.'),
      rCode('send()', ['pro']),
      rText(' lalu menunggu jawaban'),
      rText('.'),
    ];
    const kept = renderableSegments(segments, 'junior');
    expect(kept).toHaveLength(1);
    expect(renderText(segments, 'junior').text).toBe('Bito mengirim pesan.');
  });

  it('keeps a new sentence that follows a hidden segment', () => {
    const segments = [rJunior('Bito mengirim pesan.'), rCode('send()', ['pro']), rText(' Server menjawab.')];
    expect(renderText(segments, 'junior').text).toBe('Bito mengirim pesan. Server menjawab.');
  });

  it('does not change anything in Pro', () => {
    const segments = [rText('Selesai. '), rCode('npm run build', ['pro']), rText(' lalu deploy.')];
    expect(renderableSegments(segments, 'pro')).toHaveLength(3);
  });
});
