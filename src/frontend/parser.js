const parseTable = require('../definitions/parse-table');

class Node {
  constructor(value, parent = null) {
    this.parent = parent;
    this.value = value;
    this.childs = [];
    this.visited = false;
  }
}

function parser(values) {
  const sentence = [...values, '$'].reverse();
  const stack = ['EXP'];
  const productions = [];
  const parseTree = new Node('EXP');

  let read, state;
  let currentNode = parseTree;

  function nextNodeRight() {
    let nextNode;

    while (!nextNode) {
      if (currentNode.parent) {
        currentNode = currentNode.parent;
        nextNode = currentNode.childs.find(c => !c.visited);
      } else break;
    }

    return nextNode;
  }

  while (stack.length) {
    state = stack.pop();
    currentNode.visited = true;

    if (!read) read = sentence.pop();

    if (state === read) {
      read = null;
      currentNode = nextNodeRight();
      continue;
    }

    const production = [...parseTable[state][read]];

    production.forEach(p => currentNode.childs.push(new Node(p, currentNode)));

    currentNode = currentNode.childs[0];

    productions.push([state, '→', ...production].join(' '));

    if (production[0] === 'ɛ') {
      currentNode.visited = true;
      currentNode = nextNodeRight();
      continue;
    }

    stack.push(...production.reverse());
  }

  return [parseTree, productions];
}

module.exports = parser;
