const fs = require('fs');

const grammar = [
  /^;/,
  /^const/,
  /^var/,
  /^fn/,
  /^\(/,
  /^\)/,
  /^\[/,
  /^\]/,
  /^{/,
  /^}/,
  /^=/,
  /^\./,
  /^,/,
  /^:/,
  /^(\+|-|\*|\/|%)/,
  /^(>=|<=|==|!=|>|<)/,
  /^(or|and|not)/,
  /^if/,
  /^else/,
  /^repeat/,
  /^return/,
  /^null/,
  /^(true|false)/,
  /^"[^"]*"/,
  /^\d*\.?\d+/,
  /^[_a-zA-Z]\w*/,
];

function scanner(filePath) {
  const pairs = [];
  let sourceCode = fs
    .readFileSync(filePath)
    .toString()
    .replace(/(\n|\r)/g, '');

  let pair, match;

  while (sourceCode.length) {
    pair = { value: null, token: undefined };

    grammar.some(
      (regex, token) =>
        (match = regex.exec(sourceCode)) && (pair = { value: match[0], token })
    );

    if (pair.value) {
      pairs.push(pair);
      sourceCode = sourceCode.slice(pair.value.length + match.index).trim();
    }
  }

  return pairs;
}

module.exports = scanner;
