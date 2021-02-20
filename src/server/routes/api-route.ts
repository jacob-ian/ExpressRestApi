import { Router } from 'express';
import { Controller } from '../controllers/controller';

export class ApiRoute {
  private router = Router();
  private controller = new Controller();

  constructor(route: string) {
    let sanitizedRoute = this.sanitizeRoute(route);
    this.setBaseRoute(sanitizedRoute);
    this.connectControllersToRouter();
  }

  private sanitizeRoute(route: string): string {
    let santizedRoute = route.replace(/\//g, '');
    return `/${santizedRoute}`;
  }

  private setBaseRoute(sanitizedRoute: string): void {
    this.router = this.router.use(sanitizedRoute);
  }

  private connectControllersToRouter(): void {
    this.connectGetControllers();
    this.connectPutControllers();
    this.connectPostControllers();
    this.connectDeleteControllers();
  }

  private connectGetControllers(): void {
    this.router.get('/', (req, res) => this.controller.getList(req, res));
    this.router.get('/:id', (req, res) => this.controller.getById(req, res));
  }

  private connectPutControllers(): void {
    this.router.put('/:id', (req, res) => this.controller.updateById(req, res));
  }

  private connectPostControllers(): void {
    this.router.post('/', (req, res) => this.controller.create(req, res));
  }

  private connectDeleteControllers(): void {
    this.router.delete('/:id', (req, res) =>
      this.controller.deleteById(req, res)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
