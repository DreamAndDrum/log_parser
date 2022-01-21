import { Parser } from './parser_interface';
import { Reader } from '../reader/reader_interface';
import { Writer } from '../writer/writer_interface';
import { Log } from '../log/log_interface';

export class DdParser implements Parser {
  private reader: Reader;
  private writer: Writer;

  constructor(reader: Reader, writer: Writer) {
    this.reader = reader;
    this.writer = writer;
  }

  parseErrors(inputPath: string, outputPath: string): boolean {
    const filter = function (log: Log): boolean {
      return log.isErrorLog();
    };
    return this.writer.writeWithFilter(outputPath, this.reader.read(inputPath), filter);
  }
}
