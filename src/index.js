const compiler = require('commander');
const scanner = require('./frontend/scanner.js');

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
  const tokens = scanner(compiler.source);
  if (compiler.debug) console.log('Tokens: ', tokens);
} catch (error) {
  console.error(error);
}
