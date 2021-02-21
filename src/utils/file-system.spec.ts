import { FileSystem } from './file-system';
import { FileSystemException } from './file-system-exception';
import assert from 'assert';
import { writeFileSync } from 'fs';

describe('FileSystem tests', function () {
  let testFile = `${process.cwd()}/test/file.json`;
  let testFileObject = { test: 'yo' };
  let testFileContents = JSON.stringify(testFileObject);
  let fs = new FileSystem();
  describe('Test fileExists()', function () {
    let testFileTrue = `${process.cwd()}/src/utils/file-system.spec.ts`;
    let testFileFalse = `${process.cwd()}/src/utils/this-is-fake.ts`;

    it('Should return true (file actually exists)', async function () {
      await assertFileExists(testFileTrue, fs, true);
    });

    it("Should return false (file doesn't exist)", async function () {
      await assertFileExists(testFileFalse, fs, false);
    });
  });

  describe('Test deleteFile()', function () {
    before(function () {
      createTestFile(testFile, testFileContents);
    });

    it("File shouldn't exist after call.", async function () {
      try {
        fs.deleteFile(testFile).then(async () => {
          await assertFileDeleted(fs, testFile);
        });
      } catch (err) {
        throw err;
      }
    });

    it("Should throw a 'not-found' error.", async function () {
      let expectedError = new FileSystemException('not-found', '');

      assert.rejects(async () => {
        fs.deleteFile('asdkjlkwnekjw.ts');
      }, expectedError);
    });
  });

  describe('Test readJsonFile()', async function () {
    before(function () {
      createTestFile(testFile, testFileContents);
    });

    after(async function () {
      await deleteTestFile(testFile);
    });

    it('Should return the testFileObject', async function () {
      try {
        let actualObject = await fs.readJsonFile(testFile);
        assert.deepStrictEqual(actualObject, testFileObject);
      } catch (err) {
        throw err;
      }
    });

    it('Should throw a "not-found" error', async function () {
      let expectedError = new FileSystemException(
        'not-found',
        `ENOENT: no such file or directory, open '${testFile}'`
      );
      return await assert.rejects(async () => {
        await fs.readJsonFile(testFile);
      }, expectedError);
    });
  });

  describe('Test writeToFile()', function () {
    before(async function () {
      return await deleteTestFile(testFile);
    });

    it('Should create the test file and write to it.', async function () {
      return fs
        .writeToFile(testFile, testFileContents)
        .then(() => {
          let exists = testFileExists(testFile);
          assert.deepStrictEqual(exists, true);
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});

function logError(err: any): void {
  if (err instanceof FileSystemException) {
    console.error(err.getMessage());
  } else {
    console.error(err);
  }
}

function createTestFile(path: string, testFileContents: string): void {
  try {
    writeFileSync(path, testFileContents);
  } catch (err) {
    throw err;
  }
}

async function deleteTestFile(path: string): Promise<void> {
  try {
    let fs = new FileSystem();
    return await fs.deleteFile(path);
  } catch (err) {
    throw err;
  }
}

async function testFileExists(path: string): Promise<boolean | undefined> {
  try {
    let fs = new FileSystem();
    return await fs.fileExists(path);
  } catch (err) {
    throw err;
  }
}

async function assertFileExists(
  path: string,
  fs: FileSystem,
  assertion: boolean
) {
  try {
    let exists = await fs.fileExists(path);
    assert.deepStrictEqual(exists, assertion);
  } catch (err) {
    throw err;
  }
}

async function assertFileDeleted(fs: FileSystem, path: string): Promise<void> {
  try {
    let exists = await fs.fileExists(path);
    assert.deepStrictEqual(exists, false);
  } catch (err) {
    throw err;
  }
}
