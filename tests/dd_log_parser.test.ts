import { DdParser } from '../src/parser/dd_log_parser';
import { Reader } from '../src/reader/reader_interface';
import { Writer } from '../src/writer/writer_interface';
import { Log } from '../src/log/log_interface';

class ReaderMock implements Reader {
  read(): Log[] {
    return [];
  }
}

class WriterMock implements Writer {
  writeWithFilter(path: string): boolean {
    if (path == '') {
      return false;
    }
    return true;
  }
}

test('Should return false', () => {
  const parser = new DdParser(new ReaderMock(), new WriterMock());
  expect(parser.parseErrors('', '')).toBe(false);
});

test('Should return false', () => {
  const parser = new DdParser(new ReaderMock(), new WriterMock());
  expect(parser.parseErrors('', 'path')).toBe(true);
});
