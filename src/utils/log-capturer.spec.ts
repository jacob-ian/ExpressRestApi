import { LogCapturer } from './log-capturer';
import assert from 'assert';

describe('Log Capturer Tests', function () {
  let logCapturer: LogCapturer;

  beforeEach(function (done) {
    logCapturer = new LogCapturer();
    done();
  });

  describe('Single Log Call Tests', function () {
    it(`Should Capture the single lined console log.`, function () {
      const singleLineLog = 'This is a test.';
      const capturedLog = getCapturedLogs(logCapturer, [singleLineLog])[0];
      assert.strictEqual(capturedLog, singleLineLog);
    });
  });

  describe('Multiple Log Call Tests', function () {
    it('Should capture multiple singled lined console logs.', function () {
      const singleLineMessages = [
        'This is a test',
        'Here is another test',
        'And a third.',
      ];
      const capturedLog = getCapturedLogs(logCapturer, singleLineMessages);
      assert.deepStrictEqual(capturedLog, singleLineMessages);
    });
  });

  describe('Test captureMethodLogs', function () {
    const logMessage = 'This is the test message.';
    const testMethod = () => {
      console.log(logMessage);
    };

    it('Should capture the logs in the test method.', function () {
      const capturedLog = logCapturer.captureMethodLogs(testMethod)[0];
      assert.strictEqual(capturedLog, logMessage);
    });
  });
});

function getCapturedLogs(
  logCapturer: LogCapturer,
  messages: string[]
): string[] {
  logCapturer = captureLogs(logCapturer, messages);
  return logCapturer.getLoggedText();
}

function captureLogs(
  logCapturer: LogCapturer,
  messages: string[]
): LogCapturer {
  logCapturer.startCapture();
  messages.forEach((message) => console.log(message));
  logCapturer.stopCapture();
  return logCapturer;
}
