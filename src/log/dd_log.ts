import { Log, LogParams, OutputLog } from './log_interface';

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
      const regexp = /.+ - .+ - .+/g;
      const [timestamp, level, json] = inputString.split(regexp);
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
    return this.valide;
  }

  isErrorLog(): boolean {
    if (this.level == errorLevel) {
      return true;
    }
    return false;
  }

  getOutputLog(): OutputLog {
    return {
      timestamp: this.timestamp,
      level: this.level,
      transactionId: this.params.transactionId,
      err: this.params.err,
    };
  }
}
