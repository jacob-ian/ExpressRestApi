import express from 'express';
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
    this.connectApiRoutes();
  }

  private connectThirdPartyMiddleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private connectApiRoutes(): void {
    this.express.get('/', (req, res) => {
      return res.status(200).send();
    });
  }

  public start(callback?: () => void): void {
    if (this.serverIsInactive()) {
      this.startServerListening(callback);
    }
  }

  private serverIsInactive(): boolean {
    return !this.isServerActive;
  }

  private startServerListening(callback?: () => void): void {
    this.server = this.express.listen(this.EXTERNAL_PORT, () => {
      this.isServerActive = true;
      this.notifyServerStart();
      if (callback) {
        callback();
      }
    });
  }

  private notifyServerStart(): void {
    this.logServerStarted();
  }

  private logServerStarted(): void {
    console.log(`🌐 Server is listening on port: ${this.EXTERNAL_PORT}.`);
  }

  public stop(callback?: () => void): void {
    if (this.serverIsActive()) {
      this.stopServerListening(callback);
    }
  }

  private serverIsActive(): boolean {
    return this.isServerActive;
  }

  private stopServerListening(callback?: () => void): void {
    return this.server.close(() => {
      this.isServerActive = false;
      this.notifyServerStopped();
      if (callback) {
        callback();
      }
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
