import { stat, remove, readJson, outputJSON, outputJson } from 'fs-extra';
import { FileSystemException } from './file-system-exception';

export class FileSystem {
  public static async fileExists(path: string): Promise<boolean> {
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

  public static async deleteFile(path: string): Promise<void> {
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

  public static async readJsonFile(path: string): Promise<any> {
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

  public static async outputJsonFile(path: string, data: any): Promise<void> {
    try {
      return await outputJson(path, data);
    } catch (err) {
      throw new FileSystemException('unknown', err.message);
    }
  }
}
