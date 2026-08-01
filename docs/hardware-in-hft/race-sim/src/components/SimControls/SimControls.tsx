import styles from './SimControls.module.css';

interface SimControlsProps {
  group: string;
  running: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function SimControls({ group, running, onStart, onStop, onReset }: SimControlsProps) {
  return (
    <div className={styles.controls}>
      <button
        className={`${styles.btn} ${styles.start}`}
        onClick={onStart}
        disabled={running}
        data-testid={`start-btn-${group}`}
      >
        Start
      </button>
      <button className={styles.btn} onClick={onStop} disabled={!running} data-testid={`stop-btn-${group}`}>
        Stop
      </button>
      <button className={styles.btn} onClick={onReset} data-testid={`reset-btn-${group}`}>
        Reset
      </button>
    </div>
  );
}
