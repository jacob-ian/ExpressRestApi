import { Database } from './database';
import assert from 'assert';

const TEST_DB_LOCATION = `${__dirname}/test/db.json`;
/*
describe('Database Class Tests', function () {
  beforeEach(async function () {
    return await setUpTestDatabase();
  });
  describe('Test Database File Creation', function () {
    it('Should create a new database file.', async function () {
      let db = createTestDatabase();
      let newFileExists = await databaseExists();
      assert.deepStrictEqual(newFileExists, true);
    });
  });
});

async function setUpTestDatabase(): Promise<void> {
  try {
    await resetTestDatabase();
  } catch (err) {
    console.error(err);
  }
}

async function resetTestDatabase(): Promise<void> {
  if (await databaseExists()) {
    deleteDatabaseFile();
  }
}

async function databaseExists(): Promise<boolean> {
  try {
    let stats = await fs.stat(TEST_DB_LOCATION);
    return !!stats;
  } catch (err) {
    return false;
  }
}

function deleteDatabaseFile(): void {
  try {
    return rmSync(TEST_DB_LOCATION);
  } catch (err) {
    console.error(err);
  }
}

function createTestDatabase(): Database | undefined {
  try {
    return new Database(TEST_DB_LOCATION);
  } catch (err) {
    console.error(err);
  }
}
*/
