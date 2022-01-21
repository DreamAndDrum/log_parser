import { DdWriter } from '../src/writer/dd_writer';
import { Log } from '../src/log/log_interface';

const fs = require('fs');
jest.mock('fs');

test('Should write logs', () => {
  const spy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  fs.writeFileSync = spy;

  const txtReader = new DdWriter();
  const res = txtReader.writeWithFilter('path', [], (log: Log) => true);

  expect(spy).toBeCalledWith('path', JSON.stringify([]))
  expect(res).toBe(true)
});

test('Should throw error', () => {
  const spy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {throw "should not call"});
  fs.writeFileSync = spy;

  const txtReader = new DdWriter();
  const res = txtReader.writeWithFilter('path', [], (log: Log) => true);

  expect(res).toBe(false)
});
