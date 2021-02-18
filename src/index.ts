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

  constructor() {
    if (this.isDevelopmentEnvironment()) {
      this.loadConfigFromFile();
    }
    const EXTERNAL_PORT = this.getExternalPort();
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

  public getExternalPort(): number {
    return process.env.PORT ? parseInt(process.env.PORT) : 4000;
  }

  public start(): void {
    this.server.start();
  }

  public stop(): void {
    this.server.stop();
  }
}

const application = new Application();
application.start();
