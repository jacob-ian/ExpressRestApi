import { Exception } from './exception';
import assert from 'assert';

describe('Exception Class', function () {
  let errorId = '0x';
  let error = 'invalid-argument';
  let message = 'There was an invalid input.';

  describe('Exception with Message: getMessage()', function () {
    let exception = new Exception(errorId, error, message);
    let expectedMessage = `${errorId} ${error}: ${message}`;

    it('Should return a string with all info and message formatted.', function () {
      assert.deepStrictEqual(exception.getMessage(), expectedMessage);
    });
  });

  describe('Exception without Message: getMessage()', function () {
    let exception = new Exception(errorId, error);
    let expectedMessage = `${errorId} ${error}`;

    it('Should return a string with only error ID and error.', function () {
      assert.deepStrictEqual(exception.getMessage(), expectedMessage);
    });
  });
});
