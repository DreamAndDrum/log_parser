import { Log } from '../src/log/log_interface';

export class LogMock implements Log {
  timestamp: 0;
  level: string;
  params: { transactionId: ''; details: '' };

  constructor(input = 'input') {
    this.level = input;
  }

  isValid(): boolean {
    return this.level == 'error' ? false : true;
  }
  isErrorLog(): boolean {
    return true;
  }
  getOutputLog(): string {
    return "";
  }
}