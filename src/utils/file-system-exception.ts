import { Exception } from './exception';

export class FileSystemException extends Exception {
  constructor(error: 'not-found' | 'unknown');
  constructor(error: 'not-found' | 'unknown', message: string);
  constructor(error: 'not-found' | 'unknown', message: string, context: any);
  constructor(error: 'not-found' | 'unknown', message?: string, context?: any) {
    if (message) {
      super('FSx', error, message, context);
    } else {
      super('FSx', error);
    }
  }
}
