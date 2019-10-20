const parseTable = require('./parser-table');

function parser(values) {
  const sentence = [...values, '$'].reverse();
  const stack = ['EXP'];
  const productions = [];
  let read, state;

  while (stack.length) {
    state = stack.pop();
    if (!read) read = sentence.pop();

    if (state === read) {
      read = null;
      continue;
    }

    const production = [...parseTable[state][read]];
    productions.push([state, '→', ...production].join(' '));

    if (production[0] === 'ɛ') continue;

    stack.push(...production.reverse());
  }

  return productions;
}

module.exports = parser;
