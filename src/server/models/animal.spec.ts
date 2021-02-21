import { Animal } from './animal';
import assert from 'assert';

describe('Animal Class Tests', function () {
  const name = 'Jeff';
  const age = 10;
  const species = 'elephant';

  let animal = new Animal(name, age, species);

  describe('Test getJsonObject()', function () {
    it('Data Object should equal inputs', function () {
      assert.deepStrictEqual(animal.getJsonObject(), { name, age, species });
    });
  });

  describe('Test getSpeechPattern()', function () {
    it('Should return a string with no speech', function () {
      assert.deepStrictEqual(animal.getSpeechPattern(), 'This animal says: ');
    });
  });
});
