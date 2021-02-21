import { Animal } from './animal';

export class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, 'dog');
  }

  public bark(): string {
    return 'Woof!';
  }

  public getSpeechPattern(): string {
    return super.getSpeechPattern() + this.bark();
  }
}
