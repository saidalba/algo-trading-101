import { BATCH_SIZES } from '../../data/constants';
import type { BatchSize } from '../../types';
import styles from './Demo.module.css';

interface DemoControlsProps {
  batchSize: BatchSize;
  running: boolean;
  onSetBatchSize: (n: BatchSize) => void;
}

export function DemoControls({ batchSize, running, onSetBatchSize }: DemoControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.sizeGroup}>
        {BATCH_SIZES.map((n) => (
          <button
            key={n}
            className={`${styles.sizeBtn} ${n === batchSize ? styles.active : ''}`}
            onClick={() => onSetBatchSize(n)}
            disabled={running}
            data-testid={`size-btn-${n}`}
          >
            {n.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
