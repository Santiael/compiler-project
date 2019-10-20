const fs = require('fs');
const path = require('path');
const compiler = require('commander');
const scanner = require('./frontend/scanner');
const parser = require('./frontend/parser');

const outputDir = './output';

compiler
  .version('0.0.1')
  .option('-v --verbose', 'Print results of each compile step.')
  .option(
    '-s --source <file_path>',
    'Receives path of source code to compile.',
    './sample/source.code'
  )
  .parse(process.argv);

try {
  const { source, verbose, dev } = compiler;

  const pairs = scanner(source);

  if (verbose) console.log('Scanner Result: ', pairs);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  fs.writeFileSync(
    path.resolve(outputDir, 'TokensAndValues.txt'),
    pairs.reduce((acc, pair) => acc + `${pair.token}, ${pair.value}\n`, ''),
    {
      encoding: 'utf-8',
    }
  );

  const productions = parser(pairs.map(pair => pair.token), dev);

  if (verbose) console.log('Parser Result: ', productions);

  fs.writeFileSync(
    path.resolve(outputDir, 'Productions.txt'),
    productions.join('\n'),
    {
      encoding: 'utf-8',
    }
  );
} catch (error) {
  console.error(error);
}
