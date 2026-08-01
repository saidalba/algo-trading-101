export type TokenClass = 'plain' | 'comment' | 'keyword' | 'string' | 'number' | 'type' | 'fn';

export interface Token {
  text: string;
  cls?: TokenClass;
}

export const codeLines: Token[][] = [
  [{ text: '// polymarket_arb.cpp', cls: 'comment' }],
  [{ text: '#include ', cls: 'keyword' }, { text: '"venue/polymarket.hpp"', cls: 'string' }],
  [{ text: '#include ', cls: 'keyword' }, { text: '"math/bivariate_lognormal.hpp"', cls: 'string' }],
  [{ text: '#include ', cls: 'keyword' }, { text: '"risk/limits.hpp"', cls: 'string' }],
  [{ text: ' ' }],
  [
    { text: 'constexpr ', cls: 'keyword' },
    { text: 'double', cls: 'keyword' },
    { text: '   EDGE_BPS = ' },
    { text: '25.0', cls: 'number' },
    { text: ';' },
  ],
  [
    { text: 'constexpr ', cls: 'keyword' },
    { text: 'uint32_t', cls: 'keyword' },
    { text: ' MAX_SIZE = ' },
    { text: '3000', cls: 'number' },
    { text: ';' },
  ],
  [{ text: ' ' }],
  [
    { text: 'void ', cls: 'keyword' },
    { text: 'on_equity_tick', cls: 'fn' },
    { text: '(' },
    { text: 'const ', cls: 'keyword' },
    { text: 'Tick', cls: 'type' },
    { text: '& t,' },
  ],
  [{ text: '                    ' }, { text: 'Polymarket', cls: 'type' }, { text: '& pm,' }],
  [{ text: '                    ' }, { text: 'Limits', cls: 'type' }, { text: '& risk) {' }],
  [
    { text: '  ' },
    { text: 'const auto ', cls: 'keyword' },
    { text: 'fair = ' },
    { text: 'bivariate_lognormal', cls: 'fn' },
    { text: '(t.spot, IV, T);' },
  ],
  [
    { text: '  ' },
    { text: 'const auto', cls: 'keyword' },
    { text: '& book = pm.' },
    { text: 'book', cls: 'fn' },
    { text: '(contract_);' },
  ],
  [{ text: ' ' }],
  [
    { text: '  ' },
    { text: 'if ', cls: 'keyword' },
    { text: '(fair > book.best_ask + EDGE_BPS * ' },
    { text: '1e-4', cls: 'number' },
    { text: ') {' },
  ],
  [
    { text: '    ' },
    { text: 'if ', cls: 'keyword' },
    { text: '(!risk.' },
    { text: 'check', cls: 'fn' },
    { text: '(contract_, ' },
    { text: 'Side', cls: 'type' },
    { text: '::BUY, book.best_ask, MAX_SIZE))' },
  ],
  [{ text: '      ' }, { text: 'return', cls: 'keyword' }, { text: ';' }],
  [
    { text: '    pm.' },
    { text: 'send_order', cls: 'fn' },
    { text: '(contract_, ' },
    { text: 'Side', cls: 'type' },
    { text: '::BUY, book.best_ask, MAX_SIZE);' },
  ],
  [{ text: '  }' }],
  [{ text: '}' }],
];
