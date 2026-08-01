import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { PipelineDiagramHandle } from './PipelineDiagramHandle';

export const FpgaDiagram = forwardRef<PipelineDiagramHandle>(function FpgaDiagram(_props, ref) {
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
      <text x="20" y="42" fontSize="34" fill="#0c4a6e" fontFamily="'JetBrains Mono',monospace" fontWeight="600" letterSpacing="0.06em">
        FPGA
      </text>
      <text x="20" y="72" fontSize="20" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif">
        Compiled bitstream on silicon
      </text>
      <text x="870" y="26" textAnchor="end" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em">
        PER TRADE
      </text>
      <text x="870" y="50" textAnchor="end" fontSize="19" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" fontWeight="500">
        174 ns
      </text>
      <text x="1058" y="26" textAnchor="end" fontSize="10" fill="#0c4a6e" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em" fontWeight="600">
        TRADES
      </text>
      <text
        ref={tradesRef}
        data-testid="fpga-trades-count"
        x="1058"
        y="50"
        textAnchor="end"
        fontSize="22"
        fill="#0c4a6e"
        fontFamily="'JetBrains Mono',monospace"
        fontWeight="600"
      >
        0
      </text>

      <rect x="22" y="120" width="342" height="120" fill="#f1f7fb" stroke="#0c4a6e" strokeWidth="1.25" />
      <text x="193" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        NIC ingress
      </text>
      <rect x="368" y="120" width="342" height="120" fill="#f1f7fb" stroke="#0c4a6e" strokeWidth="1.25" />
      <text x="539" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        Model in logic
      </text>
      <rect x="714" y="120" width="344" height="120" fill="#f1f7fb" stroke="#0c4a6e" strokeWidth="1.25" />
      <text x="886" y="186" textAnchor="middle" fontSize="17" fill="#0a0a0a" fontFamily="'IBM Plex Sans Condensed','Arial Narrow',sans-serif" fontWeight="600">
        NIC egress
      </text>

      <rect ref={barRef} x="20" y="250" width="0" height="3" fill="#0c4a6e" />
      <circle ref={dotRef} data-testid="fpga-dot" cx="26" cy="180" r="11" fill="#0c4a6e" />

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
