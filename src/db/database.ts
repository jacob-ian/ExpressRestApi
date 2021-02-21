import { promises as fsPromises } from 'fs';
import { DatabaseException } from './database-exception';

export class Database {
  private databaseJson: any;
  private databaseLocation: string = `${process.cwd()}/database/db.json`;

  private EMPTY_DATABASE = {};

  constructor();
  constructor(databaseLocation: string);
  constructor(databaseLocation?: string) {
    if (databaseLocation) {
      this.databaseLocation = databaseLocation;
    }

    this.getDatabaseContents().then((json) => {
      this.databaseJson = json;
    });
  }

  private async getDatabaseContents(): Promise<any> {
    if (await this.databaseFileExists()) {
      return await this.parseDatabaseFile();
    } else {
      return await this.createDatabaseFile();
    }
  }

  private async databaseFileExists(): Promise<boolean> {
    try {
      let stats = await fsPromises.stat(this.databaseLocation);
      return !!stats;
    } catch (err) {
      return false;
    }
  }

  private async parseDatabaseFile(): Promise<any> {
    try {
      let fileBuffer = await fsPromises.readFile(this.databaseLocation);
      return this.parseBufferAsJson(fileBuffer);
    } catch (err) {
      throw new DatabaseException(
        'internal-error',
        `Could not read the database file. ${err.message}`
      );
    }
  }

  private parseBufferAsJson(data: Buffer): any {
    let unparsedBuffer = data.toString();
    let jsonParsedBuffer = JSON.parse(unparsedBuffer);
    return jsonParsedBuffer;
  }

  private async createDatabaseFile(): Promise<any> {
    try {
      await fsPromises.writeFile(
        this.databaseLocation,
        JSON.stringify(this.EMPTY_DATABASE),
        { flag: 'w' }
      );
      return this.EMPTY_DATABASE;
    } catch (err) {
      throw new DatabaseException(
        'internal-error',
        `Could not create new database file. ${err.message}`
      );
    }
  }

  public getDatabaseJsonObject(): any {
    return this.databaseJson;
  }

  public writeToDatabase(databaseJson: any) {
    this.databaseJson = databaseJson;
    this.overWriteDatabaseFile();
  }

  private async overWriteDatabaseFile(): Promise<void> {
    try {
      return await fsPromises.writeFile(
        this.databaseLocation,
        JSON.stringify(this.databaseJson),
        { flag: 'w' }
      );
    } catch (err) {
      throw new DatabaseException(
        'internal-error',
        `Could not write to database. ${err.message}`
      );
    }
  }
}
