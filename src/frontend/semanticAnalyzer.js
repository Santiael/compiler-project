function semanticAnalyzer(parseTree) {
  const ATTRS = getAllATTR(parseTree);
  const attributions = ATTRS.map(a => buildExpression(a));

  typeChecker(attributions);

  return attributions;
}

function getAllATTR(node) {
  const result = [];
  const find = node.children.find(c => c.production === 'ATTR');

  if (find) result.push(find);

  node.children
    .filter(c => c.production !== 'ATTR')
    .forEach(sibling => result.push(...getAllATTR(sibling)));

  return result;
}

function buildExpression(node) {
  const result = [];

  result.time = node.time;

  result.push(
    ...node.children
      .filter(c => c.value)
      .map(({ production, value }) => ({
        key: production,
        value,
      }))
  );

  const productions = node.children.filter(c => !c.value);

  if (productions.length)
    productions.forEach(c => result.push(...buildExpression(c)));

  return result;
}

function typeChecker(attributions) {
  const types = [];

  attributions.forEach(attr => {
    const varType = {
      id: attr[0].value,
      time: attr.time,
      type: null,
    };

    function reducer(type, { key, value }) {
      if (type === 'string' && key === 'mat_op' && value !== '+')
        throw new Error(
          `At node ${varType.time}: You can't use math operators, other then '+', with strings.`
        );

      switch (key) {
        case 'id':
          const lastAttr = [...types].reverse().find(v => v.id === value);

          if (!lastAttr)
            throw new Error(`You need to declare '${value}' before use it.`);
          if (lastAttr.type !== type)
            throw new Error(
              `Invalid ${varType.id} attribution at node: ${varType.time}.`
            );

          return lastAttr.type;

        case 'null':
        case 'num':
        case 'bool':
        case 'string':
          if (type && type !== key)
            throw new Error(
              `Invalid ${varType.id} attribution at node: ${varType.time}.`
            );
          return key;

        default:
          return type;
      }
    }

    varType.type = attr.slice(2).reduce(reducer, null);

    types.push(varType);
  });
}

module.exports = semanticAnalyzer;
