/** Reads a chat response the way the client does: the final "done" event of an NDJSON stream, or plain JSON. */
export async function readReply(res: Response): Promise<Record<string, unknown>> {
  if (!(res.headers.get('content-type') ?? '').includes('ndjson')) return res.json();
  const events = (await res.text()).trim().split('\n').map((line) => JSON.parse(line));
  const last = events.at(-1);
  return last.t === 'done' ? { reply: last.reply, options: last.options, sig: last.sig } : { error: last.error };
}

export async function readEvents(res: Response): Promise<{ t: string; v?: string; reply?: string; options?: string[] }[]> {
  return (await res.text()).trim().split('\n').map((line) => JSON.parse(line));
}
