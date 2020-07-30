import express, { Request, Response } from 'express';
import next from 'next';
import nextRoutes from '../src/routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();
// @ts-ignore: can't infer from next-routes
const routesHandler = nextRoutes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
});
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(routesHandler);
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();