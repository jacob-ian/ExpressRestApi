import { Cat } from './cat';
import assert from 'assert';

describe('Cat Class Tests', function () {
  let name = 'Sophie';
  let age = 22;
  let cat = new Cat(name, age);

  describe('Test getJsonObject()', function () {
    it('Should return the inputs and species.', function () {
      assert.deepStrictEqual(cat.getJsonObject(), {
        name,
        age,
        species: 'cat',
      });
    });
  });

  describe('Test getSpeechPattern()', function () {
    it('Should return a cat specific speech pattern.', function () {
      assert.deepStrictEqual(cat.getSpeechPattern(), 'This animal says: Meow!');
    });
  });

  describe('Test meow()', function () {
    it('Should return a meow', function () {
      assert.deepStrictEqual(cat.meow(), 'Meow!');
    });
  });
});
