const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contract = process.argv[2];

if (!contract) {
  console.log('Invalid contract');
  process.exit(1);
}

const outputPath = path.resolve(
  __dirname,
  '..',
  'build',
  `${contract}.bytecode.json`,
);

const inputPath = path.resolve(__dirname, '..', 'contracts', `${contract}.yul`);
const source = fs.readFileSync(inputPath, 'utf-8');

const key = `${contract}.sol`;

var input = {
  language: 'Yul',
  sources: {
    key: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['evm.bytecode'],
      },
    },
  },
};

const compiledContract = solc.compile(JSON.stringify(input));
const bytecode = JSON
  .parse(compiledContract)
  .contracts
  .key
  [contract]
  .evm
  .bytecode
  .object;

fs.writeFile(outputPath, JSON.stringify(bytecode), (_) => {});

console.log('Compiled');
