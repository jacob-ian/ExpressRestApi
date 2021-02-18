import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export class Server {
  private EXTERNAL_PORT: number;
  private expressApp = express();
  private expressServer: any;

  constructor(port: number) {
    this.EXTERNAL_PORT = port;
    this.setUpMiddleware();
  }

  private setUpMiddleware(): void {
    this.connectThirdPartyMiddleware();
    this.connectApiRoutes();
  }

  private connectThirdPartyMiddleware(): void {
    this.expressApp.use(cors());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
  }

  private connectApiRoutes(): void {
    this.expressApp.get('/', (req, res) => {
      return res.status(200).send();
    });
  }

  public start(): void {
    this.expressServer = this.expressApp.listen(this.EXTERNAL_PORT, () => {
      this.logServerStarted();
    });
  }

  private logServerStarted(): void {
    console.log(`🌐 Server is listening on port: ${this.EXTERNAL_PORT}`);
  }

  public stop(): void {
    this.expressServer.close();
    this.logServerStopped();
  }

  private logServerStopped(): void {
    console.log('🛑 Server has been stopped.');
  }
}
