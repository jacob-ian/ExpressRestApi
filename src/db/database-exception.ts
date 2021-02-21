import { Exception } from '../utils/exception';

export class DatabaseException extends Exception {
  constructor(error: 'internal-error' | 'not-found');
  constructor(error: 'internal-error' | 'not-found', message: string);
  constructor(error: 'internal-error' | 'not-found', message?: string) {
    if (message) {
      super('DBx', error, message);
    } else {
      super('DBx', error);
    }
  }
}
