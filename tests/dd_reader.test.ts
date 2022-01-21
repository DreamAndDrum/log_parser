import { DdReader } from '../src/reader/dd_reader';
import { LogMock } from './log.mock';

const fs = require('fs');
jest.mock('fs');

test('Should read logs', () => {
  const spy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
    return 'log1\nerror\nlog3';
  });
  fs.readFileSync = spy;

  console.log = jest.fn();
  const txtReader = new DdReader(LogMock);
  const logs = txtReader.read('path');

  expect(logs.length).toBe(2);
  expect(logs[0].level).toBe('log1');
  expect(logs[1].level).toBe('log3');
});
