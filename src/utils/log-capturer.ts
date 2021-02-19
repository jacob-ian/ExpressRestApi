//@ts-ignore
import CaptureStdout from 'capture-stdout';

export class LogCapturer {
  private capturer: any;

  constructor() {
    this.capturer = new CaptureStdout();
  }

  public startCapture(): void {
    return this.capturer.startCapture();
  }

  public stopCapture(): void {
    return this.capturer.stopCapture();
  }

  public getLoggedText(): string[] {
    return this.capturer.getCapturedText();
  }

  public captureMethodLogs(method: () => void): string[] {
    this.startCapture();
    method();
    this.stopCapture();
    return this.getLoggedText();
  }
}
