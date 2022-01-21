import { Log } from '../log/log_interface';

export interface Writer {
  // returns success or not
  writeWithFilter(output: unknown, logs: Log[], filter: (log: Log) => boolean): boolean;
}
