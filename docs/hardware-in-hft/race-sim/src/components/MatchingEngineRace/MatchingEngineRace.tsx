import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { FlowDot } from './FlowDot';
import { useAmbientLoop } from '../../hooks/useAmbientLoop';
import { MATCHING_BASE_FILLS, MATCHING_TICK_MS } from '../../data/constants';
import type { AmbientHandle } from '../../types';
import styles from './MatchingEngineRace.module.css';

// dots ordered far-from-engine -> near-engine so delay index reads as motion toward the engine
// left group sits next to Firm A (CPU), right group sits next to Firm B (FPGA)
const leftDots = [286, 307, 328, 349].map((cx, i, arr) => ({ cx, delayIndex: arr.length - 1 - i }));
const rightDots = [727, 740, 753, 766, 779, 792, 800].map((cx, i) => ({ cx, delayIndex: i }));

export const MatchingEngineRace = forwardRef<AmbientHandle>(function MatchingEngineRace(_props, ref) {
  const firmARef = useRef<SVGTextElement>(null); // Firm A = CPU
  const firmBRef = useRef<SVGTextElement>(null); // Firm B = FPGA
  const [dotGeneration, setDotGeneration] = useState(0);

  const onTick = useCallback((elapsedMs: number) => {
    const cpuFills = MATCHING_BASE_FILLS.cpu + Math.floor(elapsedMs / MATCHING_TICK_MS.cpu);
    const fpgaFills = MATCHING_BASE_FILLS.fpga + Math.floor(elapsedMs / MATCHING_TICK_MS.fpga);
    if (firmARef.current) firmARef.current.textContent = cpuFills.toLocaleString();
    if (firmBRef.current) firmBRef.current.textContent = fpgaFills.toLocaleString();
  }, []);

  const { running, start, stop, reset: resetLoop } = useAmbientLoop(onTick);

  const reset = useCallback(() => {
    resetLoop();
    setDotGeneration((g) => g + 1); // remount flow dots so their CSS animation restarts from t=0
  }, [resetLoop]);

  useImperativeHandle(ref, () => ({ start, stop, reset }), [start, stop, reset]);

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 1080 440" preserveAspectRatio="xMidYMid meet">
        <text x="32" y="34" fontSize="19" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" fontWeight="500" letterSpacing="0.04em">
          MATCHING ENGINE RACE
        </text>
        <text x="32" y="60" fontSize="13" fill="#0a0a0a" fontFamily="'Inter',sans-serif">
          Two firms running the same arbitrage. The faster bitstream wins the fill.
        </text>

        {/* Firm A box = CPU (light red) */}
        <rect x="32" y="140" width="248" height="252" fill="#fdf5f5" stroke="#7f1d1d" strokeWidth="2" />
        <text x="54" y="176" fontSize="17" fill="#0a0a0a" fontFamily="'Inter',sans-serif" fontWeight="500">
          Firm A
        </text>
        <text x="54" y="197" fontSize="11" fill="#7f1d1d" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.18em">
          CPU
        </text>
        <text x="156" y="278" textAnchor="middle" fontSize="11" fill="#0a0a0a" fontFamily="'Inter',sans-serif" letterSpacing="0.22em">
          FILLS
        </text>
        <text
          ref={firmARef}
          data-testid="firmA-fills"
          x="156"
          y="328"
          textAnchor="middle"
          fontSize="40"
          fill="#7f1d1d"
          fontFamily="'JetBrains Mono',monospace"
          fontWeight="500"
        >
          {MATCHING_BASE_FILLS.cpu.toLocaleString()}
        </text>

        {/* Firm B box = FPGA (light blue) */}
        <rect x="800" y="140" width="248" height="252" fill="#f1f7fb" stroke="#0c4a6e" strokeWidth="2" />
        <text x="822" y="176" fontSize="17" fill="#0a0a0a" fontFamily="'Inter',sans-serif" fontWeight="500">
          Firm B
        </text>
        <text x="822" y="197" fontSize="11" fill="#0c4a6e" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.18em">
          FPGA
        </text>
        <text x="924" y="278" textAnchor="middle" fontSize="11" fill="#0a0a0a" fontFamily="'Inter',sans-serif" letterSpacing="0.22em">
          FILLS
        </text>
        <text
          ref={firmBRef}
          data-testid="firmB-fills"
          x="924"
          y="328"
          textAnchor="middle"
          fontSize="40"
          fill="#0c4a6e"
          fontFamily="'JetBrains Mono',monospace"
          fontWeight="500"
        >
          {MATCHING_BASE_FILLS.fpga.toLocaleString()}
        </text>

        {/* Matching Engine box */}
        <rect x="362" y="112" width="356" height="308" fill="rgba(10,10,10,0.02)" stroke="#0a0a0a" strokeWidth="2" />
        <text x="540" y="134" textAnchor="middle" fontSize="12" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em" fontWeight="500">
          MATCHING ENGINE
        </text>
        <text x="540" y="154" textAnchor="middle" fontSize="11" fill="#0a0a0a" fontFamily="'Inter',sans-serif" opacity="0.6">
          fills in arrival order
        </text>

        <rect x="392" y="178" width="296" height="32" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <text x="412" y="200" fontSize="15" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          0.44
        </text>
        <text x="672" y="200" textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          11,000
        </text>
        <rect x="392" y="215" width="296" height="32" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <text x="412" y="237" fontSize="15" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          0.43
        </text>
        <text x="672" y="237" textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          7,000
        </text>
        <rect x="392" y="252" width="296" height="32" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <text x="412" y="274" fontSize="15" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          0.42
        </text>
        <text x="672" y="274" textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          4,600
        </text>
        <rect x="392" y="289" width="296" height="32" fill="rgba(12,74,110,0.08)" stroke="#e5e7eb" strokeWidth="1" />
        <text x="412" y="311" fontSize="15" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" fontWeight="500">
          0.41
        </text>
        <text x="672" y="311" textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace">
          2,900
        </text>
        <text x="460" y="311" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.22em" opacity="0.6">
          best ask
        </text>

        {leftDots.map((d) => (
          <FlowDot
            key={`${d.cx}-${dotGeneration}`}
            cx={d.cx}
            cy={260}
            color="#7f1d1d"
            durationS={1.5}
            delayS={d.delayIndex * (1.5 / 4)}
            running={running}
          />
        ))}
        {rightDots.map((d) => (
          <FlowDot
            key={`${d.cx}-${dotGeneration}`}
            cx={d.cx}
            cy={260}
            color="#0c4a6e"
            durationS={0.55}
            delayS={d.delayIndex * (0.55 / 4)}
            running={running}
          />
        ))}
      </svg>
    </div>
  );
});
