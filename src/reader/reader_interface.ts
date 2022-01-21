import { Log } from '../log/log_interface';

export interface Reader {
  read(input: unknown): Log[];
}
