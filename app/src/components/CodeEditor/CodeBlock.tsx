import { codeLines, type TokenClass } from '../../data/codeSample';
import styles from './CodeEditor.module.css';

const TOKEN_CLASS: Record<TokenClass, string> = {
  plain: styles.tokPlain,
  comment: styles.tokComment,
  keyword: styles.tokKeyword,
  string: styles.tokString,
  number: styles.tokNumber,
  type: styles.tokType,
  fn: styles.tokFn,
};

export function CodeBlock() {
  return (
    <div className={styles.code}>
      {codeLines.map((tokens, i) => (
        <div className={styles.codeLine} key={i}>
          <span className={styles.ln}>{i + 1}</span>
          <span>
            {tokens.map((tok, j) => (
              <span key={j} className={TOKEN_CLASS[tok.cls ?? 'plain']}>
                {tok.text}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
