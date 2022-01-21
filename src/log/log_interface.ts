export interface Log {
  timestamp: number;
  level: string;
  params: LogParams;
  isValid(): boolean;
  isErrorLog(): boolean;
  getOutputLog(): OutputLog;
}

export interface LogParams {
  transactionId: string;
  details: string;
  err?: string;
  [index: string]: string;
}

export interface OutputLog {
  timestamp: number;
  level: string;
  transactionId: string;
  err?: string;
}
