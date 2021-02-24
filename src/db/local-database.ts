import { FileSystem as fs } from '../utils/file-system';
import { LocalDatabaseException } from './local-database-exception';

const EMPTY_DATABASE = {};

export class LocalDatabase {
  private path: string;
  private contents: any = {};

  constructor(databaseContents: any);
  constructor(databaseContents: any, databasePath: string);
  constructor(databaseContents: any, databasePath?: string) {
    this.contents = databaseContents;
    this.path = databasePath ? databasePath : this.getDefaultDatabasePath();
  }

  public static async load(databasePath: string): Promise<LocalDatabase> {
    if (await this.databaseExists(databasePath)) {
      let databaseContents = await this.getDatabaseContents(databasePath);
      return new LocalDatabase(databaseContents, databasePath);
    } else {
      return new LocalDatabase(EMPTY_DATABASE, databasePath);
    }
  }

  private static async databaseExists(databasePath: string): Promise<boolean> {
    try {
      return await fs.fileExists(databasePath);
    } catch (err) {
      throw new LocalDatabaseException(
        'internal-error',
        'Could not check existence of database file.',
        err
      );
    }
  }

  private static async getDatabaseContents(databasePath: string): Promise<any> {
    try {
      return await fs.readJsonFile(databasePath);
    } catch (err) {
      throw new LocalDatabaseException(
        'internal-error',
        'Could not load database file.',
        err
      );
    }
  }

  private getDefaultDatabasePath(): string {
    return `${process.cwd()}/database/db.json`;
  }

  public async getDatabaseObject(): Promise<any> {
    return this.contents;
  }

  public async setDatabaseObject(newDatabaseObject: any): Promise<void> {
    this.contents = newDatabaseObject;
    return await this.saveDatabaseToFile();
  }

  private async saveDatabaseToFile(): Promise<void> {
    try {
      return await fs.outputJsonFile(this.path, this.contents);
    } catch (err) {
      throw new LocalDatabaseException(
        'internal-error',
        'Could not save database to file.',
        err
      );
    }
  }
}
