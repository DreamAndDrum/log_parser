import { Log } from './log_interface';

export type LogConstructor<T extends Log> = new (...args: any[]) => T;
