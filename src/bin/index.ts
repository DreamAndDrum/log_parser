#!/usr/bin/env node

import { DdParser } from '../parser/dd_log_parser';
import { DdReader } from '../reader/dd_reader';
import { DdWriter } from '../writer/dd_writer';
import { DdLog } from '../log/dd_log';
import yargs from 'yargs';
import { logger } from '../logger/logger';

const usage = 'Parser if error logs';
yargs
  .usage(usage)
  .option('i', {
    alias: 'input',
    describe: 'Input file path.',
    type: 'string',
    demandOption: false,
  })
  .option('o', {
    alias: 'output',
    describe: 'Output file path.',
    type: 'string',
    demandOption: false,
  })
  .help(true).argv;

if (typeof yargs.argv.i != 'string' || yargs.argv.i == '') {
  logger.info('Empty input file');
  process.exit(1);
}

if (typeof yargs.argv.o != 'string' || yargs.argv.o == '') {
  logger.info('Empty output file');
  process.exit(1);
}

logger.info('Started!');
const parser = new DdParser(new DdReader(DdLog), new DdWriter());
parser.parseErrors(yargs.argv.i, yargs.argv.o);
logger.info('Finished!');
