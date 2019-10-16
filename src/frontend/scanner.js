const fs = require('fs');

const grammar = [
  [';', /^;/],
  ['CONST', /^const/],
  ['VAR', /^var/],
  ['FN', /^fn/],
  ['(', /^\(/],
  [')', /^\)/],
  ['{', /^{/],
  ['}', /^}/],
  ['=', /^=/],
  [',', /^,/],
  ['MAT_OP', /^(\+|-|\*|\/|%)/],
  ['COMP_OP', /^(>=|<=|==|!=|>|<)/],
  ['LOG_OP', /^(or|and)/],
  ['NOT', /^not/],
  ['IF', /^if/],
  ['ELSE', /^else/],
  ['WHILE', /^while/],
  ['RETURN', /^return/],
  ['NULL', /^null/],
  ['BOOL', /^(true|false)/],
  ['STRING', /^"[^"]*"/],
  ['NUM', /^\d*\.?\d+/],
  ['ID', /^[_a-zA-Z]\w*/],
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
