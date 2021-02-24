export class Exception {
  private errorId: string;
  private error: string;
  private errorMessage: string | undefined;
  private errorContext: any;

  constructor(errorId: string, error: string);
  constructor(errorId: string, error: string, message: string);
  constructor(errorId: string, error: string, message: string, context: any);
  constructor(errorId: string, error: string, message?: string, context?: any) {
    this.errorId = errorId;
    this.error = error;
    this.errorMessage = message;
    this.errorContext = context;
  }

  public getMessage(): string {
    return `${this.errorId} ${this.error}${this.formatMessage()}`;
  }

  private formatMessage(): string {
    return this.errorMessage ? `: ${this.errorMessage}` : '';
  }

  public getErrorCode(): string {
    return this.error;
  }

  public getContext(): any {
    return this.errorContext;
  }
}
