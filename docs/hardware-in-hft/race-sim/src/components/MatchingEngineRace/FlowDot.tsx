import styles from './MatchingEngineRace.module.css';

interface FlowDotProps {
  cx: number;
  cy: number;
  color: string;
  durationS: number;
  delayS: number;
  running: boolean;
}

export function FlowDot({ cx, cy, color, durationS, delayS, running }: FlowDotProps) {
  return (
    <circle
      className={styles.flowDot}
      cx={cx}
      cy={cy}
      r="5"
      fill={color}
      style={{
        animationDuration: `${durationS}s`,
        animationDelay: `${delayS}s`,
        animationPlayState: running ? 'running' : 'paused',
      }}
    />
  );
}
