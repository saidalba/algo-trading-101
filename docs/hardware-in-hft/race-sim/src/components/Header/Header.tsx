import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/">
          <span className={styles.logoEmoji} role="img" aria-label="bar chart trending up">
            📊📈
          </span>
          <div>
            <div className={styles.name}>
              algo-trading <span>101</span>
            </div>
            <div className={styles.sub}>Micro guide</div>
          </div>
        </a>
        <nav className={styles.links}>
          <a href="https://github.com/saidalba/algo-trading-101" target="_blank" rel="noopener noreferrer">
            Guide home
          </a>
        </nav>
      </div>
    </header>
  );
}
