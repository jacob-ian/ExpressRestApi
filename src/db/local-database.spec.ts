import { LocalDatabase } from './local-database';
import assert from 'assert';
import { FileSystem as fs } from '../utils/file-system';
import { FileSystemException } from '../utils/file-system-exception';
import { LocalDatabaseException } from './local-database-exception';
import { EMPTY } from 'rxjs';
import { load } from 'dotenv/types';

const TEST_DB_LOCATION = `${process.cwd()}/test/db.json`;
const TEST_DB_OBJECT = { test: 'test' };
const EMPTY_DATABASE = {};

describe('LocalDatabase Class Tests', function () {
  describe('Test Creating the Database Instance', function () {
    describe('Test Loading a non-existing database', function () {
      it('Should return a LocalDatabase object', async function () {
        return await assertReturnsLocalDatabase();
      });
    });

    describe('Test Loading an existing database', function () {
      before(async function () {
        return await createTestDatabaseFile();
      });

      it('Should return a LocalDatabase Object', async function () {
        return await assertReturnsLocalDatabase();
      });

      after(async function () {
        return await deleteTestDatabase();
      });
    });
  });
  describe('Test Returning the Database Contents', function () {
    describe('Test Returning a non-existing database.', function () {
      let database: LocalDatabase;

      before(async function () {
        database = await loadDatabase();
      });

      it('Should return an empty object.', async function () {
        return await assertDatabaseContentsEqual(database, EMPTY_DATABASE);
      });

      after(async function () {
        return await deleteTestDatabase();
      });
    });

    describe('Test Returning an existing database.', function () {
      let database: LocalDatabase;

      before(async function () {
        return createTestDatabaseFile().then(async () => {
          database = await loadDatabase();
        });
      });

      it('Should return the test object.', async function () {
        return await assertDatabaseContentsEqual(database, TEST_DB_OBJECT);
      });

      after(async function () {
        return await deleteTestDatabase();
      });
    });
  });

  describe('Test Setting the Database Contents', function () {
    describe('Test Setting the Contents of a non-existent database.', function () {
      let database: LocalDatabase;
      before(async function () {
        return deleteTestDatabase().then(async () => {
          database = await loadDatabase();
          return await setDatabaseObject(database, TEST_DB_OBJECT);
        });
      });

      it('FS should return the test object.', async function () {
        return await assertWithFsDatabaseContents(TEST_DB_OBJECT);
      });

      after(async function () {
        return await deleteTestDatabase();
      });
    });

    describe('Test Setting the Contents of an existing database.', function () {
      let database: LocalDatabase;
      before(async function () {
        return createTestDatabaseFile().then(async () => {
          database = await loadDatabase();
          return await setDatabaseObject(database, EMPTY_DATABASE);
        });
      });

      it('FS should return the empty database.', async function () {
        return await assertWithFsDatabaseContents(EMPTY_DATABASE);
      });

      after(async function () {
        return await deleteTestDatabase();
      });
    });
  });

  describe('Test Setting and Getting the Database contents', function () {
    let database: LocalDatabase;

    before(async function () {
      return deleteTestDatabase().then(async () => {
        database = await loadDatabase();
        return await setDatabaseObject(database, TEST_DB_OBJECT);
      });
    });

    it('Should return the test database object.', async function () {
      return await assertDatabaseContentsEqual(database, TEST_DB_OBJECT);
    });

    after(async function () {
      return await deleteTestDatabase();
    });
  });
});

async function assertReturnsLocalDatabase(): Promise<void> {
  try {
    let database = await LocalDatabase.load(TEST_DB_LOCATION);
    assert.ok(database !== null && database instanceof LocalDatabase);
  } catch (err) {
    throw err;
  }
}

async function loadDatabase(): Promise<LocalDatabase> {
  try {
    return await LocalDatabase.load(TEST_DB_LOCATION);
  } catch (err) {
    throw err;
  }
}

async function createTestDatabaseFile(): Promise<void> {
  try {
    return await fs.outputJsonFile(TEST_DB_LOCATION, TEST_DB_OBJECT);
  } catch (err) {
    throw err;
  }
}

async function deleteTestDatabase(): Promise<void> {
  try {
    return await fs.deleteFile(TEST_DB_LOCATION);
  } catch (error) {
    throw error;
  }
}

async function assertDatabaseContentsEqual(
  database: LocalDatabase,
  expectedObject: any
): Promise<void> {
  try {
    let databaseContents = await database.getDatabaseObject();
    assert.deepStrictEqual(databaseContents, expectedObject);
  } catch (error) {
    throw error;
  }
}

async function assertWithFsDatabaseContents(
  expectedObject: any
): Promise<void> {
  try {
    let contents = await fs.readJsonFile(TEST_DB_LOCATION);
    assert.deepStrictEqual(contents, expectedObject);
  } catch (error) {
    throw error;
  }
}

async function setDatabaseObject(
  database: LocalDatabase,
  object: any
): Promise<void> {
  try {
    return await database.setDatabaseObject(object);
  } catch (error) {
    throw error;
  }
}
