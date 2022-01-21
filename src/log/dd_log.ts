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
      let hyphen = inputString.indexOf(' - ');
      this.timestamp = Date.parse(inputString.substring(0, hyphen));
      if (isNaN(this.timestamp)) {
        throw 'wrong timestamp';
      }
      inputString = inputString.substring(hyphen + 3);
      hyphen = inputString.indexOf(' - ');
      this.level = inputString.substring(0, hyphen);
      inputString = inputString.substring(hyphen + 3);
      this.params = JSON.parse(inputString);
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
