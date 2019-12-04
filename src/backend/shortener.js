function shortner(attributions) {
  const values = attributions.map(attr => ({
    id: attr[0].value,
    value: attr.slice(2).map(a => (a.key === 'id' ? [a.value] : a.value)),
  }));

  const result = [];

  for (let i = 0; i < values.length; i++) {
    let current = values[i];

    current.value = current.value.map(v =>
      typeof v !== 'string'
        ? [...values].reverse().find(value => value.id === v[0]).value
        : v
    );

    let value = current.value.join(' ');
    result.push(`id:${current.id} = ${eval(value)}`);
  }

  return result;
}

module.exports = shortner;
