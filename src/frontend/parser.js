const parseTable = require('../definitions/parse-table');

class ASTNode {
  constructor(production, parent = null, time = 0) {
    this.parent = parent;
    this.production = production;
    this.children = null;
    this.value = null;
    this.time = time;
  }
}

function parser(tokens) {
  const sentence = [...tokens.map(t => t.key), '$'].reverse();
  const values = [...tokens.map(t => t.value)].reverse();
  const stack = ['EXP'];
  const productions = [];
  const parseTree = new ASTNode('EXP');

  let read, state;
  let time = 1;
  let currentNode = parseTree;

  function nextNodeRight() {
    let nextNode;

    while (!nextNode) {
      if (currentNode.parent) {
        currentNode = currentNode.parent;
        nextNode = currentNode.children.find(c => !c.children);
      } else break;
    }

    return nextNode;
  }

  while (stack.length) {
    state = stack.pop();
    currentNode.children = [];

    if (!read) read = sentence.pop();

    if (state === read) {
      currentNode.value = values.pop();
      read = null;
      currentNode = nextNodeRight();
      continue;
    }

    const production = [...parseTable[state][read]];

    production.forEach(p =>
      currentNode.children.push(new ASTNode(p, currentNode, time++))
    );

    currentNode = currentNode.children[0];

    productions.push([state, '→', ...production].join(' '));

    if (production[0] === 'ɛ') {
      currentNode.children = [];
      currentNode = nextNodeRight();
      continue;
    }

    stack.push(...production.reverse());
  }

  return [parseTree, productions];
}

module.exports = parser;
