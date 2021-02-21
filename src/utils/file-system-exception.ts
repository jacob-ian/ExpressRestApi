import { Exception } from './exception';

export class FileSystemException extends Exception {
  constructor(error: string);
  constructor(error: string, message: string);
  constructor(error: string, message?: string) {
    if (message) {
      super('FSx', error, message);
    } else {
      super('FSx', error);
    }
  }
}
