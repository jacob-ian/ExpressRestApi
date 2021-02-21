import { FileSystem } from './file-system';
import { FileSystemException } from './file-system-exception';
import assert from 'assert';
import { writeFileSync } from 'fs';
import { writeFile } from 'fs-extra';

describe('FileSystem tests', function () {
  describe('Test fileExists()', function () {
    let testFileTrue = `${process.cwd()}/src/utils/file-system.spec.ts`;
    let testFileFalse = `${process.cwd()}/src/utils/this-is-fake.ts`;

    let fs = new FileSystem();

    it('Should return true (file actually exists)', async function () {
      try {
        let exists = await fs.fileExists(testFileTrue);
        assert.deepStrictEqual(exists, true);
      } catch (err) {
        logError(err);
      }
    });

    it("Should return false (file doesn't exist)", async function () {
      try {
        let exists = await fs.fileExists(testFileFalse);
        assert.deepStrictEqual(exists, false);
      } catch (err) {
        logError(err);
      }
    });
  });

  describe('Test deleteFile()', function () {
    let testFile = `${process.cwd()}/test/file.txt`;
    let fs = new FileSystem();

    before(function () {
      createTestFile(testFile);
    });

    it("File shouldn't exist after call.", async function () {
      try {
        fs.deleteFile(testFile).then(async () => {
          await assertFileDeleted(fs, testFile);
        });
      } catch (err) {
        logError(err);
      }
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

function createTestFile(path: string): void {
  try {
    writeFileSync(path, 'test');
  } catch (err) {
    logError(err);
  }
}

async function assertFileDeleted(fs: FileSystem, path: string): Promise<void> {
  try {
    let exists = await fs.fileExists(path);
    assert.deepStrictEqual(exists, false);
  } catch (err) {
    logError(err);
  }
}
