import { logger } from '../logger/logger';
import { Log, LogParams } from './log_interface';

const errorLevel = 'error';

export class DdLog implements Log {
  private valide = true;
  timestamp: number;
  level: string;
  params: LogParams;

  // The conversion of log string to Log object happens here
  // That's why we need fabric
  constructor(inputString: string) {
    try {
      const testReg = /.{24} - (debug|info|warn|error) - {.*}/g;
      if (!testReg.test(inputString)) {
        throw 'wrong input string';
      }
      const [timestamp, level, json] = inputString.split(' - ', 3);
      this.timestamp = Date.parse(timestamp);
      if (isNaN(this.timestamp)) {
        throw 'wrong timestamp';
      }
      this.level = level;
      this.params = JSON.parse(json);
    } catch {
      this.valide = false;
    }
  }

  isValid(): boolean {
    return this.valide && 'transactionId' in this.params && 'details' in this.params;
  }

  isErrorLog(): boolean {
    if (this.level == errorLevel) {
      return true;
    }
    return false;
  }

  getOutputLog(): any {
    return {
      timestamp: this.timestamp,
      level: this.level,
      transactionId: this.params.transactionId,
      err: this.params.err,
    };
  }
}
