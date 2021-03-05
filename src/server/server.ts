import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export class Server {
  private EXTERNAL_PORT: number;

  private express = express();
  private server: any;

  private isServerActive: boolean = false;

  constructor(port: number) {
    this.EXTERNAL_PORT = port;
    this.setUpMiddleware();
  }

  private setUpMiddleware(): void {
    this.connectThirdPartyMiddleware();
    this.createApiRoutes();
  }

  private connectThirdPartyMiddleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private createApiRoutes(): void {
    return;
  }

  public start(onCompleteFn?: () => void): void {
    if (this.serverIsInactive()) {
      this.startServerListening(onCompleteFn);
    }
  }

  private serverIsInactive(): boolean {
    return !this.isServerActive;
  }

  private startServerListening(onCompleteFn?: () => void): void {
    this.server = this.express.listen(this.EXTERNAL_PORT, () => {
      this.isServerActive = true;
      this.notifyServerListening();
      this.callOnCompleteFn(onCompleteFn);
    });
  }

  private callOnCompleteFn(onCompleteFn?: () => void): void {
    if (onCompleteFn) {
      onCompleteFn();
    }
  }

  private notifyServerListening(): void {
    this.logServerStarted();
  }

  private logServerStarted(): void {
    console.log(`🌐 Server is listening on port: ${this.EXTERNAL_PORT}.`);
  }

  public stop(onCompleteFn?: () => void): void {
    if (this.serverIsActive()) {
      this.stopServerListening(onCompleteFn);
    }
  }

  private serverIsActive(): boolean {
    return this.isServerActive;
  }

  private stopServerListening(onCompleteFn?: () => void): void {
    return this.server.close(() => {
      this.isServerActive = false;
      this.notifyServerStopped();
      this.callOnCompleteFn(onCompleteFn);
    });
  }

  private notifyServerStopped(): void {
    this.logServerStopped();
  }

  private logServerStopped(): void {
    console.log('🛑 Server has been stopped.');
  }

  public getExpressServer(): any {
    return this.server;
  }
}
