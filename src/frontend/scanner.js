const grammar = require('../definitions/grammar');

function scanner(file) {
  const pairs = [];
  let sourceCode = file;
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
