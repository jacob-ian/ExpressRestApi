import { stat, remove, readJson, writeFile, WriteFileOptions } from 'fs-extra';
import { FileSystemException } from './file-system-exception';

export class FileSystem {
  public async fileExists(path: string): Promise<boolean> {
    try {
      let stats = await stat(path);
      return !!stats;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw new FileSystemException('unknown', err.message);
      }
    }
  }

  public async deleteFile(path: string): Promise<void> {
    try {
      return await remove(path);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new FileSystemException('not-found', err.message);
      } else {
        throw new FileSystemException('unknown', err.message);
      }
    }
  }

  public async readJsonFile(path: string): Promise<any> {
    try {
      return await readJson(path);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new FileSystemException('not-found', err.message);
      } else {
        throw new FileSystemException('unknown', err.message);
      }
    }
  }

  public async writeToFile(path: string, data: any): Promise<void> {
    try {
      return await writeFile(path, data);
    } catch (err) {
      throw new FileSystemException('unknown', err.message);
    }
  }
}
