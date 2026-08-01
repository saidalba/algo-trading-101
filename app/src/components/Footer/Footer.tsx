import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>algo-trading-101 · a beginner friendly micro guide to algorithmic trading and HFT</p>
        <p className={styles.copy}>Illustrative simulation only · not real market data</p>
      </div>
    </footer>
  );
}
