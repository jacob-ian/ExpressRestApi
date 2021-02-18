import { Application } from '.';
import assert from 'assert';
import { fancy } from 'fancy-test';
import fetch from 'node-fetch';

let SERVER_PORT = '8000';
describe('Application Tests', function () {
  describe('Application Environment Config', function () {
    describe('Development Environment', function () {
      fancy
        .env({ NODE_ENV: 'development', PORT: SERVER_PORT })
        .stdout()
        .it("Should log '✅ Local Config Loaded.'", (output) => {
          new Application();
          assert.strictEqual(output.stdout, '✅ Local Config Loaded.\n');
        });
    });

    describe('Production Environment', function () {
      fancy
        .env({ NODE_ENV: 'production', PORT: SERVER_PORT })
        .stdout()
        .it("Should not log '✅ Local Config Loaded.'", (output) => {
          new Application();
          assert.strictEqual(output.stdout, '');
        });
    });
  });

  describe('Application Startup', function () {
    fancy
      .env({ NODE_ENV: 'development', PORT: SERVER_PORT })
      .stdout()
      .it("GET '/' should respond with 200 Status.", (ctx, done) => {
        let application = new Application();
        application.start();

        getServerStatus().then((statusCode) => {
          application.stop();
          assert.strictEqual(statusCode, 200);
          done();
        });
      });
  });
});

async function getServerStatus(): Promise<number> {
  return fetch(`http://localhost:${SERVER_PORT}`).then((res) => {
    return res.status;
  });
}
