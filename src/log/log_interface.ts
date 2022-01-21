export interface Log {
  timestamp: number;
  level: string;
  params: LogParams;
  isValid(): boolean;
  isErrorLog(): boolean;
  getOutputLog(): any;
}

export interface LogParams {
  [index: string]: string;
}
