import { Animal } from './animal';

export class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age, 'cat');
  }

  public meow(): string {
    return 'Meow!';
  }

  public getSpeechPattern(): string {
    return super.getSpeechPattern() + this.meow();
  }
}
