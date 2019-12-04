const fs = require('fs');
const path = require('path');
const compiler = require('commander');
const scanner = require('./frontend/scanner');
const parser = require('./frontend/parser');
const semanticAnalyzer = require('./frontend/semanticAnalyzer');

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
  const { source, verbose } = compiler;

  const file = fs
    .readFileSync(source)
    .toString()
    .replace(/(\n|\r)/g, '');

  const tokens = scanner(file);

  if (verbose) console.log('Scanner Result: ', tokens);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  fs.writeFileSync(
    path.resolve(outputDir, 'Tokens.txt'),
    tokens.reduce((acc, token) => acc + `${token.key}, ${token.value}\n`, ''),
    {
      encoding: 'utf-8',
    }
  );

  const [parseTree, productions] = parser(tokens);

  console.log(semanticAnalyzer(parseTree));

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
