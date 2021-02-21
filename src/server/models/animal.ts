export class Animal {
  private name: string | undefined;
  private age: number | undefined;
  private species: string | undefined;

  constructor();
  constructor(name: string);
  constructor(name: string, age: number);
  constructor(name: string, age: number, species: string);
  constructor(name?: string, age?: number, species?: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public getSpeechPattern(): string {
    return 'This animal says: ';
  }

  public getJsonObject(): any {
    return {
      name: this.name,
      age: this.age,
      species: this.species,
    };
  }
}
