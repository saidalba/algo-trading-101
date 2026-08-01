import { useEffect, useRef } from 'react';
import { GRID_CELLS } from '../../data/constants';
import styles from './PixelGrid.module.css';

interface PixelGridProps {
  progressPct: number;
  colorClass: 'f' | 'c';
  testId?: string;
}

export function PixelGrid({ progressPct, colorClass, testId }: PixelGridProps) {
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onCount = Math.round((progressPct / 100) * GRID_CELLS);
    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      const filled = i < onCount;
      cell.className = filled ? `${styles.cell} ${styles[colorClass]}` : styles.cell;
      cell.dataset.filled = filled ? 'true' : 'false';
    });
  }, [progressPct, colorClass]);

  return (
    <div className={styles.gridWrap} data-testid={testId}>
      {Array.from({ length: GRID_CELLS }, (_, i) => (
        <div key={i} className={styles.cell} data-filled="false" ref={(el) => { cellRefs.current[i] = el; }} />
      ))}
    </div>
  );
}
