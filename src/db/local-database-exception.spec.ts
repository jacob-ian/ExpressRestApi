import { LocalDatabaseException } from './local-database-exception';
import assert from 'assert';

describe('DatabaseException Class', function () {
  describe('Test getMessage()', function () {
    let error: 'internal-error' = 'internal-error';
    let message = "The database couldn't be connected to.";
    let exception = new LocalDatabaseException(error, message);

    it('Should return a message with the error ID, error, and message.', function () {
      let expectedMessage = `DBx ${error}: ${message}`;
      assert.deepStrictEqual(exception.getMessage(), expectedMessage);
    });
  });
});
