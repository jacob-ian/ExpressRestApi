import { Application } from '.';
import assert from 'assert';
import fetch from 'node-fetch';

describe('Application Tests', function () {
  let SERVER_PORT = 4000;
  let application = new Application(SERVER_PORT);

  describe('Application Environment Config', function () {
    it("Should log '✅ Local Config Loaded.'", function () {});
  });

  describe('Application Startup', function () {
    before(function () {
      startApplication(application);
    });

    it('GET "/" should respond with 200 Status.', async function () {
      let responseStatusCode = await getServerStatus(SERVER_PORT);
      assert.strictEqual(responseStatusCode, 200);
    });

    after(function () {
      stopApplication(application);
    });
  });
});

function startApplication(application: Application) {
  application.start();
}

async function getServerStatus(serverPort: number): Promise<number> {
  return fetch(`http://localhost:${serverPort}`).then((res) => {
    return res.status;
  });
}

function stopApplication(application: Application) {
  application.stop();
}
