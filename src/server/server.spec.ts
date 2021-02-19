import assert from 'assert';
import { LogCapturer } from '../utils/log-capturer';
import { Server } from './server';

const SERVER_PORT = 8000;
describe('Express Server', function () {
  describe('Server Start Up and Shut Down', function () {
    describe('Start and Stop Messages', function () {
      let server = new Server(SERVER_PORT);
      let consoleCapturer = new LogCapturer();

      before(function (done) {
        consoleCapturer.startCapture();
        server.start(() => {
          server.stop(() => {
            consoleCapturer.stopCapture();
            done();
          });
        });
      });

      it('Should log a "Listening" and "Stop" Message on Cycle.', function () {
        const listeningMessage = `🌐 Server is listening on port: ${SERVER_PORT}.`;
        const stoppedMessage = '🛑 Server has been stopped.';

        const expectedLogs = [listeningMessage, stoppedMessage];
        const capturedLogs = consoleCapturer.getLoggedText();

        assert.deepStrictEqual(capturedLogs, expectedLogs);
      });
    });
  });
});
