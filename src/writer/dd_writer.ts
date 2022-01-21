import { Writer } from './writer_interface';
import { Log } from '../log/log_interface';
import * as fs from 'fs';
import { logger } from '../logger/logger';

export class DdWriter implements Writer {
  writeWithFilter(path: string, logs: Log[], filter: (log: Log) => boolean): boolean {
    try {
      fs.writeFileSync(
        path,
        JSON.stringify(logs.filter((val) => filter(val)).map((val) => val.getOutputLog())),
      );
    } catch (err) {
      logger.error(err);
      return false;
    }
    return true;
  }
}
