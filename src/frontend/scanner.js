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

  let pair, match, error;

  while (sourceCode.length) {
    error = !grammar.some(
      (regex, token) =>
        (match = regex.exec(sourceCode)) && (pair = { token, value: match[0] })
    );

    if (error) throw new Error('Scanner - Unable to define lexems.');

    if (pair.value) {
      pairs.push(pair);
      sourceCode = sourceCode.slice(pair.value.length).trim();
    }
  }

  return pairs;
}

module.exports = scanner;
