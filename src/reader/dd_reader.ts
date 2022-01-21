import { Log } from '../log/log_interface';
import { Reader } from './reader_interface';
import * as fs from 'fs';
import {} from '../log/log_fabric';
import { LogConstructor } from '../log/log_fabric';
import { logger } from '../logger/logger';

export class DdReader implements Reader {
  constructor(private ctr: LogConstructor<Log>) {}

  read(path: string): Log[] {
    const inputFile: string = fs.readFileSync(path, 'utf8');
    // assuming that logs fields have new string as "\n", otherwise need more complex parsing
    const logStrings = inputFile.split('\n');
    const res: Log[] = [];
    logStrings.forEach((val) => {
      const tempLog = new this.ctr(val);
      if (tempLog.isValid()) {
        res.push(tempLog);
      } else {
        logger.error(`incorrect log: ${val}`);
      }
    });
    return res;
  }
}
