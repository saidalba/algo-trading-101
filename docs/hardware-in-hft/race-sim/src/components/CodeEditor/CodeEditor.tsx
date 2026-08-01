import { CodeBlock } from './CodeBlock';
import { Terminal } from './Terminal';
import type { TermLine, Venue, VenueStatus } from '../../types';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  venue: Venue;
  host: string;
  path: string;
  fileName: string;
  status: VenueStatus;
  disabled: boolean;
  lines: TermLine[];
  onRun: () => void;
}

export function CodeEditor({ venue, host, path, fileName, status, disabled, lines, onRun }: CodeEditorProps) {
  const running = status === 'RUNNING';

  return (
    <div className={styles.editor}>
      <div className={styles.titlebar}>
        <div className={styles.titleLeft}>
          <span className={`${styles.dot} ${running ? styles.running : ''}`} />
          <span className={styles.host}>{host}</span>
        </div>
        <button className={styles.run} onClick={onRun} disabled={disabled} data-testid={`run-${venue}`}>
          &#9654; Run
        </button>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tab}>{fileName}</div>
      </div>
      <CodeBlock />
      <div className={styles.status}>
        <span>Problems</span>
        <span>Output</span>
        <span>Debug Console</span>
        <span className={styles.statusActive}>Terminal</span>
        <span>Ports</span>
        <span className={styles.statusRight}>bash &middot; {host.split('.')[0]}</span>
      </div>
      <Terminal venue={venue} host={`lse@${host.split('.')[0]}`} path={path} lines={lines} />
    </div>
  );
}
