function semanticAnalyzer(parseTree) {
  const DECLS = getAllDECL(parseTree);
  const declarationList = DECLS.map(d => ({
    id: d.children[1].children[0].value,
    time: d.time,
  }));

  const ATTRS = getAllATTR(parseTree);
  const expressions = ATTRS.map(a => buildExpression(a));

  return [declarationList, expressions];
}

// * ------------ DECL ------------

function getAllDECL(node) {
  const result = [];
  const find = node.children.find(c => c.production === 'DECL');

  if (find) result.push(find);

  node.children
    .filter(c => c.production !== 'DECL')
    .forEach(sibling => result.push(...getAllDECL(sibling)));

  return result;
}

// * ------------ ATTR ------------

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

// * ---------- ANALYSIS ----------

module.exports = semanticAnalyzer;
