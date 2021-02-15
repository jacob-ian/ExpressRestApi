/**
 * A RESTful API using Express.
 * @copyright 2021 Jacob Ian Matthews
 */

import { Server } from './server/server';
import { config as loadConfig } from 'dotenv';

/**
 * The REST API Server.
 */
export class Application {
  private server: Server;

  constructor(externalPort?: number) {
    if (this.isDevelopmentEnvironment()) {
      this.loadConfigFromFile();
    }
    let EXTERNAL_PORT = externalPort ? externalPort : this.getExternalPort();
    this.server = new Server(EXTERNAL_PORT);
  }

  private isDevelopmentEnvironment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  private loadConfigFromFile(): void {
    loadConfig();
    this.logLocalConfig();
  }

  private logLocalConfig(): void {
    console.log('✅ Local Config Loaded.');
  }

  private getExternalPort(): number {
    return process.env.PORT ? parseInt(process.env.PORT) : 80;
  }

  public start(): void {
    this.server.start();
  }

  public stop(): void {
    this.server.stop();
  }
}

let application = new Application();
application.start();
