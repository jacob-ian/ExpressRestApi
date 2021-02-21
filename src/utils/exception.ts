export class Exception {
  private errorId: string;
  private error: string;
  private errorMessage: string | undefined;

  constructor(errorId: string, error: string);
  constructor(errorId: string, error: string, message: string);
  constructor(errorId: string, error: string, message?: string) {
    this.errorId = errorId;
    this.error = error;
    this.errorMessage = message;
  }

  public getMessage(): string {
    return `${this.errorId} ${this.error}${this.formatMessage()}`;
  }

  private formatMessage(): string {
    return this.errorMessage ? `: ${this.errorMessage}` : '';
  }
}
