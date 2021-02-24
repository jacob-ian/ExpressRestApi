import { Exception } from '../utils/exception';

export class LocalDatabaseException extends Exception {
  constructor(error: 'internal-error' | 'not-found');
  constructor(error: 'internal-error' | 'not-found', message: string);
  constructor(
    error: 'internal-error' | 'not-found',
    message: string,
    context: any
  );
  constructor(
    error: 'internal-error' | 'not-found',
    message?: string,
    context?: any
  ) {
    if (message) {
      super('DBx', error, message, context);
    } else {
      super('DBx', error);
    }
  }
}
