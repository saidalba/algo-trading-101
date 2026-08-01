import type { TermLine, Venue } from '../../types';
import styles from './CodeEditor.module.css';

interface TerminalProps {
  venue: Venue;
  host: string;
  path: string;
  lines: TermLine[];
}

export function Terminal({ venue, host, path, lines }: TerminalProps) {
  return (
    <div className={styles.term} data-testid={`terminal-${venue}`}>
      {lines.map((line) => (
        <div key={line.id} className={`${styles.termLine} ${styles[line.cls]}`}>
          {line.text}
        </div>
      ))}
      <div>
        <span className={styles.promptHost}>{host}</span>
        <span className={styles.promptPlain}>:</span>
        <span className={styles.promptPath}>{path}</span>
        <span className={styles.promptPlain}>$ </span>
        <span className={`${styles.cursor} ${styles.promptPlain}`}>&#9608;</span>
      </div>
    </div>
  );
}
