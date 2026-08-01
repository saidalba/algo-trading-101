import type { TermLine } from '../types';

let nextLineId = 1;

export function fakeFillLine(seq: number): TermLine {
  const side = Math.random() < 0.5 ? 'BUY' : 'SELL';
  const price = (0.4 + Math.random() * 0.12).toFixed(5);
  const size = Math.floor(3000 + Math.random() * 6000);
  const bps = Math.floor(1 + Math.random() * 29);
  const ts = Date.now() * 1000 + Math.floor(Math.random() * 999);
  const seqStr = String(seq).padStart(6, '0');
  const text =
    `[${seqStr}] ${side.padEnd(5, ' ')}${price.padEnd(9, ' ')}` +
    `x${String(size).padEnd(6, ' ')}+${bps} bps  filled @ ${ts}`;
  return { id: nextLineId++, text, cls: side === 'BUY' ? 'buy' : 'sell' };
}

export function metaLine(text: string): TermLine {
  return { id: nextLineId++, text, cls: 'meta' };
}

export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString();
}
