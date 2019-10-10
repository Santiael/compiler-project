const fs = require('fs');
const path = require('path');
const compiler = require('commander');
const scanner = require('./frontend/scanner.js');

const outputDir = './output';

compiler
  .version('0.0.1')
  .option('-d --debug', 'Print results of each compile step.')
  .option(
    '-s --source <file_path>',
    'Receives path of source code to compile.',
    './sample/source.code'
  )
  .parse(process.argv);

try {
  const pairs = scanner(compiler.source);
  if (compiler.debug) console.log('Scanner Result: ', pairs);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  fs.writeFileSync(
    path.resolve(outputDir, 'TokensAndValues.txt'),
    pairs.reduce((acc, pair) => acc + `${pair.token}, ${pair.value}\n`, ''),
    {
      encoding: 'utf-8',
    }
  );
} catch (error) {
  console.error(error);
}
