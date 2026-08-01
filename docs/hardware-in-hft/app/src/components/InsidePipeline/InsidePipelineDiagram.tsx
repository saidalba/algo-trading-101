import type { StageBlock } from '../../data/pipelineStages';

interface InsidePipelineDiagramProps {
  title: string;
  subtitle: string;
  titleColor: string;
  stages: StageBlock[];
}

const BOX_X = 36;
const BOX_W = 648;
const BOX_H = 78;
const BOX_Y0 = 120;
const SPACING = 104;

const KIND_STYLE: Record<StageBlock['kind'], { fill: string; stroke: string; strokeWidth: number }> = {
  io: { fill: '#ffe4cc', stroke: '#c2410c', strokeWidth: 1.5 },
  compute: { fill: '#cfe0ff', stroke: '#1d4ed8', strokeWidth: 1.5 },
  'compute-strong': { fill: '#93c5fd', stroke: '#1d4ed8', strokeWidth: 2 },
};

const KIND_TEXT_COLOR: Record<StageBlock['kind'], string> = {
  io: '#c2410c',
  compute: '#1d4ed8',
  'compute-strong': '#1d4ed8',
};

export function InsidePipelineDiagram({ title, subtitle, titleColor, stages }: InsidePipelineDiagramProps) {
  const contentBottom = BOX_Y0 + (stages.length - 1) * SPACING + BOX_H;
  const viewHeight = contentBottom + 40;

  return (
    <svg viewBox={`0 0 720 ${viewHeight}`} preserveAspectRatio="xMidYMid meet">
      <text x="36" y="42" fontSize="21" fill={titleColor} fontFamily="'JetBrains Mono',monospace" fontWeight="500" letterSpacing="0.06em">
        {title}
      </text>
      <text x="36" y="70" fontSize="13" fill="#0a0a0a" fontFamily="'Inter',sans-serif">
        {subtitle}
      </text>

      <rect x="480" y="28" width="11" height="11" fill="#ffe4cc" stroke="#c2410c" strokeWidth="1" />
      <text x="496" y="39" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.18em">
        I/O
      </text>
      <rect x="534" y="28" width="11" height="11" fill="#cfe0ff" stroke="#1d4ed8" strokeWidth="1" />
      <text x="550" y="39" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.18em">
        COMPUTE
      </text>
      <rect x="622" y="28" width="11" height="11" fill="#bff0d2" stroke="#15803d" strokeWidth="1" />
      <text x="638" y="39" fontSize="10" fill="#0a0a0a" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.18em">
        MEMORY
      </text>

      {stages.map((stage, i) => {
        const y = BOX_Y0 + i * SPACING;
        const style = KIND_STYLE[stage.kind];
        const isLast = i === stages.length - 1;
        const arrowColor = !isLast && stages[i + 1].kind === 'io' ? '#c2410c' : '#1d4ed8';
        const lineY1 = y + BOX_H;
        const lineY2 = y + BOX_H + 24;
        const tipY = y + BOX_H + 26;

        return (
          <g key={stage.label + i}>
            <rect x={BOX_X} y={y} width={BOX_W} height={BOX_H} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
            <text x={BOX_X + 24} y={y + 46} fontSize="21" fill="#0a0a0a" fontFamily="'Inter',sans-serif" fontWeight="500">
              {stage.label}
            </text>
            <text
              x={BOX_X + BOX_W - 26}
              y={y + 46}
              textAnchor="end"
              fontSize="19"
              fill={KIND_TEXT_COLOR[stage.kind]}
              fontFamily="'JetBrains Mono',monospace"
              fontWeight="500"
            >
              {stage.ns} ns
            </text>
            {!isLast && (
              <>
                <line x1="360" y1={lineY1} x2="360" y2={lineY2} stroke={arrowColor} strokeWidth="2.2" opacity="0.85" />
                <polygon
                  points={`360,${tipY} 356.5,${tipY - 6} 363.5,${tipY - 6}`}
                  fill={arrowColor}
                  opacity="0.85"
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
