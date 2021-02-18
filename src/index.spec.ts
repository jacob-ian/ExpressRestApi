import { Application } from '.';
import assert from 'assert';
import { fancy } from 'fancy-test';
import fetch from 'node-fetch';
import { config } from 'dotenv';

const SERVER_PORT = '8000';
describe('Application Tests', function () {
  describe('Application Environment Config', function () {
    describe('Development Environment', function () {
      describe('Local Config Loading', function () {
        fancy
          .env({ NODE_ENV: 'development' })
          .stdout()
          .it("Should log '✅ Local Config Loaded.'", (output) => {
            new Application();
            assert.strictEqual(output.stdout, '✅ Local Config Loaded.\n');
          });
      });
      describe('External Port Setting', function () {
        const expectedPort = getLocalConfigPort();
        fancy
          .env({ NODE_ENV: 'development' })
          .stdout()
          .it(`Port should equal ${expectedPort}`, () => {
            const application = new Application();
            const actualPort = application.getExternalPort();
            assert.strictEqual(actualPort, expectedPort);
          });
      });
    });

    describe('Production Environment', function () {
      describe('Environment Config Loading', function () {
        fancy
          .env({ NODE_ENV: 'production', PORT: SERVER_PORT })
          .stdout()
          .it("Should not log '✅ Local Config Loaded.'", (output) => {
            new Application();
            assert.strictEqual(output.stdout, '');
          });
      });
      describe('External Port Setting', function () {
        fancy
          .env({ NODE_ENV: 'production', PORT: SERVER_PORT })
          .stdout()
          .it(`Port should equal ${SERVER_PORT}`, (output) => {
            const application = new Application();
            const actualPort = application.getExternalPort();
            assert.strictEqual(actualPort, parseInt(SERVER_PORT));
          });
      });
    });
  });
  ``;

  describe('Application Startup', function () {
    fancy
      .env({ NODE_ENV: 'development', PORT: SERVER_PORT })
      .stdout()
      .it("GET '/' should respond with 200 Status.", (ctx, done) => {
        const application = new Application();
        application.start();

        getServerStatus().then((statusCode) => {
          application.stop();
          assert.strictEqual(statusCode, 200);
          done();
        });
      });
  });
});

function getLocalConfigPort(): number {
  try {
    const configPort = getPortFromConfig();
    return parseInt(configPort);
  } catch (err) {
    console.error(err);
  }
  throw 'Error(index.spec.ts): Could not get local config port from .env file. Please create a .env file with a PORT value.';
}

function getPortFromConfig(): string {
  const parsedConfig = config().parsed;
  if (!parsedConfig) {
    throw 'Could not parse local config.';
  }
  const possiblyDefinedPort = parsedConfig.PORT;
  if (possiblyDefinedPort) {
    return possiblyDefinedPort;
  } else {
    throw 'PORT is not defined in .env file.';
  }
}

async function getServerStatus(): Promise<number> {
  return fetch(`http://localhost:${SERVER_PORT}`).then((res) => {
    return res.status;
  });
}
