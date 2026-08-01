import { PixelGrid } from './PixelGrid';
import type { VenueStats } from '../../types';
import { fmtInt } from '../../utils/fakeFill';
import styles from './DemoPanel.module.css';

interface DemoPanelProps {
  venueLabel: 'FPGA' | 'CPU';
  colorClass: 'f' | 'c';
  batchSize: number;
  stats: VenueStats;
  perOrderLatency: string;
  batchLatency: string;
  throughput: string;
  footnote?: string;
}

export function DemoPanel({
  venueLabel,
  colorClass,
  batchSize,
  stats,
  perOrderLatency,
  batchLatency,
  throughput,
  footnote,
}: DemoPanelProps) {
  const labelClass = colorClass === 'f' ? styles.labelF : styles.labelC;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headline}>
          <span className={labelClass}>{venueLabel}</span>
          <span className={styles.statusText} data-testid={`status-${colorClass}`}>
            {stats.status}
          </span>
        </div>
        <span className={styles.count} data-testid={`count-${colorClass}`}>
          {fmtInt(stats.count)} / {fmtInt(batchSize)}
        </span>
      </div>
      <div className={styles.sub}>
        <span className={styles.pct} data-testid={`pct-${colorClass}`}>
          {Math.round(stats.pct)}%
        </span>
        <span className={styles.wall}>wall t = {stats.wallMs.toFixed(2)} ms</span>
      </div>
      <PixelGrid progressPct={stats.pct} colorClass={colorClass} testId={`grid-${colorClass}`} />
      <div className={styles.stats}>
        <span>per-order latency</span>
        <span className={styles.value}>{perOrderLatency}</span>
        <span>batch latency</span>
        <span className={styles.value}>{batchLatency}</span>
        <span>throughput</span>
        <span className={styles.value}>{throughput}</span>
      </div>
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </div>
  );
}
