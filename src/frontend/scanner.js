const fs = require('fs');

const grammar = [
  ['var', /^var/],
  ['null', /^null/],
  ['bool', /^(true|false)/],
  ['string', /^"[^"]*"/],
  ['num', /^\d*\.?\d+/],
  ['if', /^if/],
  ['else', /^else/],
  ['while', /^while/],
  ['print', /^print/],
  ['comp_op', /^(>=|<=|==|!=|>|<)/],
  ['mat_op', /^(\+|-|\*|\/|%)/],
  ['log_op', /^(or|and)/],
  ['id', /^[_a-zA-Z]\w*/],
  ['=', /^=/],
  ['(', /^\(/],
  [')', /^\)/],
  ['{', /^{/],
  ['}', /^}/],
  [';', /^;/],
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
      ([token, regex]) =>
        (match = regex.exec(sourceCode)) && (pair = { token, value: match[0] })
    );

    if (error) throw new Error('Scanner - Unable to define lexemes.');

    if (pair.value) {
      pairs.push(pair);
      sourceCode = sourceCode.slice(pair.value.length).trim();
    }
  }

  return pairs;
}

module.exports = scanner;
