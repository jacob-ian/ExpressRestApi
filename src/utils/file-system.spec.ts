import { FileSystem } from './file-system';
import { FileSystemException } from './file-system-exception';
import assert from 'assert';
import { outputFile } from 'fs-extra';

let { testFile, testFileContents, testFileObject } = getTestObject();

describe('FileSystem tests', function () {
  describe('Test fileExists()', function () {
    let testFileTrue = `${process.cwd()}/src/utils/file-system.spec.ts`;
    let testFileFalse = `${testFileTrue}x`;

    it('Should return true (file actually exists)', async function () {
      await assertFileExists(testFileTrue, true);
    });

    it("Should return false (file doesn't exist)", async function () {
      await assertFileExists(testFileFalse, false);
    });
  });

  describe('Test deleteFile()', function () {
    before(function () {
      prepareTestFile();
    });

    it("File shouldn't exist after call.", async function () {
      try {
        FileSystem.deleteFile(testFile).then(async () => {
          await assertFileDeleted(testFile);
        });
      } catch (err) {
        throw err;
      }
    });

    it("Should throw a 'not-found' error.", async function () {
      let expectedError = new FileSystemException('not-found', '');

      assert.rejects(async () => {
        FileSystem.deleteFile('asdkjlkwnekjw.ts');
      }, expectedError);
    });
  });

  describe('Test readJsonFile()', function () {
    before(async function () {
      return await prepareTestFile().catch((err) => console.error(err));
    });

    it('Should return the testFileObject', async function () {
      try {
        let actualObject = await FileSystem.readJsonFile(testFile);
        assert.deepStrictEqual(actualObject, testFileObject);
      } catch (err) {
        throw err;
      }
    });

    it('Should throw a "not-found" error', async function () {
      let fakePath = `${testFile}fake`;

      let expectedError = new FileSystemException(
        'not-found',
        `ENOENT: no such file or directory, open '${fakePath}'`
      );
      return await assert.rejects(async () => {
        await FileSystem.readJsonFile(fakePath);
      }, expectedError);
    });

    after(async function () {
      return await deleteTestFile(testFile);
    });
  });

  describe('Test outputJsonFile()', function () {
    describe('Test creating the file and writing to it.', function () {
      before(async function () {
        return await deleteTestFile(testFile);
      });

      after(async function () {
        return await deleteTestFile(testFile);
      });

      it('Should return the JSON object when read.', async function () {
        return FileSystem.outputJsonFile(testFile, testFileContents)
          .then(async () => {
            let json = await FileSystem.readJsonFile(testFile);
            assert.deepStrictEqual(json, testFileContents);
          })
          .catch((err) => console.error(err));
      });
    });

    describe('Test writing to an existing file.', function () {
      before(async function () {
        return await prepareTestFile();
      });

      after(async function () {
        return await deleteTestFile(testFile);
      });

      let newTestData = { new: 'test' };

      it('Should return the new test data.', async function () {
        return FileSystem.outputJsonFile(testFile, newTestData)
          .then(async () => {
            let json = await FileSystem.readJsonFile(testFile);
            assert.deepStrictEqual(json, newTestData);
          })
          .catch((err) => console.error(err));
      });
    });
  });
});

function getTestObject(): {
  testFile: string;
  testFileObject: any;
  testFileContents: string;
} {
  let testFile = `${process.cwd()}/test/file.json`;
  let testFileObject = { test: 'yo' };
  let testFileContents = JSON.stringify(testFileObject);
  return { testFile, testFileObject, testFileContents };
}

async function prepareTestFile(): Promise<void> {
  return createTestFile().then(async () => {
    return await verifyTestFile();
  });
}

async function createTestFile(): Promise<void> {
  try {
    return await outputFile(testFile, testFileContents);
  } catch (err) {
    throw `Could not create test file. ${err.message}.`;
  }
}

async function verifyTestFile(): Promise<void> {
  try {
    let exists = await FileSystem.fileExists(testFile);
    if (!exists) {
      throw `Test file was not created during test preparation.`;
    }
  } catch (err) {
    throw `Could not verify test file existence. ${err.message}.`;
  }
}

async function deleteTestFile(path: string): Promise<void> {
  try {
    return await FileSystem.deleteFile(path);
  } catch (err) {
    throw err;
  }
}

async function testFileExists(path: string): Promise<boolean | undefined> {
  try {
    return await FileSystem.fileExists(path);
  } catch (err) {
    throw err;
  }
}

async function assertFileExists(path: string, assertion: boolean) {
  try {
    let exists = await FileSystem.fileExists(path);
    assert.deepStrictEqual(exists, assertion);
  } catch (err) {
    throw err;
  }
}

async function assertFileDeleted(path: string): Promise<void> {
  try {
    let exists = await FileSystem.fileExists(path);
    assert.deepStrictEqual(exists, false);
  } catch (err) {
    throw err;
  }
}
