import { DdLog } from '../src/log/dd_log';

test('constructor works correct', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","err":"unexpected error","other":"other log"}',
  );
  expect(testLog.isValid()).toBe(true);
  expect(testLog.timestamp).toBe(1628475171253);
  expect(testLog.level).toBe('info');
  expect(testLog.params.transactionId).toBe('9abc55b2-807b-4361-9dbe-aa88b1b2e978');
  expect(testLog.params.details).toBe('Service is started');
});

test('constructor works incorrect because of time', () => {
  const testLog = new DdLog(
    '2021008-PKT02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}',
  );
  expect(testLog.isValid()).toBe(false);
});

test('constructor works incorrect because of json', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - info - 8b1b2e978","details":"Service is started"}',
  );
  expect(testLog.isValid()).toBe(false);
});

test('constructor works incorrect because of empty info level', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}',
  );
  expect(testLog.isValid()).toBe(false);
});

test('not error', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","err":"unexpected error","other":"other log"}',
  );
  expect(testLog.isErrorLog()).toBe(false);
});

test('not error', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","err":"unexpected error","other":"other log"}',
  );
  expect(testLog.isErrorLog()).toBe(true);
});

test('print with error', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","err":"unexpected error","other":"other log"}',
  );
  const print = testLog.getOutputLog();
  expect(print.timestamp).toBe(1628475171253);
  expect(print.level).toBe('error');
  expect(print.transactionId).toBe('9abc55b2-807b-4361-9dbe-aa88b1b2e978');
  expect(print.err).toBe('unexpected error');
});

test('print without error', () => {
  const testLog = new DdLog(
    '2021-08-09T02:12:51.253Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started","other":"other log"}',
  );
  const print = testLog.getOutputLog();
  expect(print.timestamp).toBe(1628475171253);
  expect(print.level).toBe('error');
  expect(print.transactionId).toBe('9abc55b2-807b-4361-9dbe-aa88b1b2e978');
  expect(print.err).toBeUndefined();
});
