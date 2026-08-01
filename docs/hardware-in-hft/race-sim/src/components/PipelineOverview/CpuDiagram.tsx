import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { PipelineDiagramHandle } from './PipelineDiagramHandle';

export const CpuDiagram = forwardRef<PipelineDiagramHandle>(function CpuDiagram(_props, ref) {
  const dotRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<SVGRectElement>(null);
  const tradesRef = useRef<SVGTextElement>(null);

  useImperativeHandle(ref, () => ({
    setDotX(x: number) {
      dotRef.current?.setAttribute('cx', x.toFixed(1));
      barRef.current?.setAttribute('width', Math.max(0, x - 20).toFixed(1));
    },
    setTrades(n: number) {
      if (tradesRef.current) tradesRef.current.textContent = Math.round(n).toLocaleString();
    },
  }));

  return (
    <svg viewBox="0 0 1080 350" preserveAspectRatio="xMidYMid meet">
      <text x="20" y="42" fontSize="34" fill="#7f1d1d" fontFamily="'JetBrains Mono',monospace" fontWeight="600" letterSpacing="0.06em">
        CPU
      </text>
      <text x="20" y="72" fontSize="20" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif">
        Linux with kernel bypass
      </text>
      <text x="870" y="26" textAnchor="end" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em">
        PER TRADE
      </text>
      <text x="870" y="50" textAnchor="end" fontSize="19" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" fontWeight="500">
        2.5 us
      </text>
      <text x="1058" y="26" textAnchor="end" fontSize="10" fill="#7f1d1d" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em" fontWeight="600">
        TRADES
      </text>
      <text
        ref={tradesRef}
        data-testid="cpu-trades-count"
        x="1058"
        y="50"
        textAnchor="end"
        fontSize="22"
        fill="#7f1d1d"
        fontFamily="'JetBrains Mono',monospace"
        fontWeight="600"
      >
        0
      </text>

      <rect x="22" y="120" width="169" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="106" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        NIC ingress
      </text>
      <rect x="196" y="120" width="169" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="280" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        Kernel
      </text>
      <rect x="370" y="120" width="169" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="454" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        User space
      </text>
      <rect x="544" y="120" width="169" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="628" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        Model
      </text>
      <rect x="718" y="120" width="169" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="802" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        Kernel
      </text>
      <rect x="892" y="120" width="166" height="120" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="1.25" />
      <text x="975" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        NIC egress
      </text>

      <rect ref={barRef} x="20" y="250" width="0" height="3" fill="#7f1d1d" />
      <circle ref={dotRef} data-testid="cpu-dot" cx="26" cy="180" r="11" fill="#7f1d1d" />

      <line x1="20" y1="290" x2="1058" y2="290" stroke="#0a0a0a" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="290" x2="20" y2="297" stroke="#0a0a0a" strokeWidth="1" opacity="0.6" />
      <text x="20" y="312" textAnchor="middle" fontSize="12" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
        100 ns
      </text>
      <line x1="366" y1="290" x2="366" y2="297" stroke="#0a0a0a" strokeWidth="1" opacity="0.6" />
      <text x="366" y="312" textAnchor="middle" fontSize="12" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
        1 us
      </text>
      <line x1="712" y1="290" x2="712" y2="297" stroke="#0a0a0a" strokeWidth="1" opacity="0.6" />
      <text x="712" y="312" textAnchor="middle" fontSize="12" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
        10 us
      </text>
      <line x1="1058" y1="290" x2="1058" y2="297" stroke="#0a0a0a" strokeWidth="1" opacity="0.6" />
      <text x="1058" y="312" textAnchor="middle" fontSize="12" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
        100 us
      </text>
    </svg>
  );
});
