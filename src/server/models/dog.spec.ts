import { Dog } from './dog';
import assert from 'assert';

describe('Dog Class Tests', function () {
  let name = 'Banjo';
  let age = 12;
  let dog = new Dog(name, age);

  describe('Test getJsonObject()', function () {
    it('Should return the inputs and species.', function () {
      assert.deepStrictEqual(dog.getJsonObject(), {
        name,
        age,
        species: 'dog',
      });
    });
  });

  describe('Test getSpeechPattern()', function () {
    it('Should return a dog specific speech pattern.', function () {
      assert.deepStrictEqual(dog.getSpeechPattern(), 'This animal says: Woof!');
    });
  });

  describe('Test bark()', function () {
    it('Should return a woof', function () {
      assert.deepStrictEqual(dog.bark(), 'Woof!');
    });
  });
});
