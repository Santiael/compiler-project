const grammar = require('../definitions/grammar');

function scanner(file) {
  const tokens = [];
  let sourceCode = file;
  let token, match, error;

  while (sourceCode.length) {
    error = !grammar.some(
      ([key, regex]) =>
        (match = regex.exec(sourceCode)) && (token = { key, value: match[0] })
    );

    if (error) throw new Error('Scanner - Unable to define lexemes.');

    if (token.value) {
      tokens.push(token);
      sourceCode = sourceCode.slice(token.value.length).trim();
    }
  }

  return tokens;
}

module.exports = scanner;
