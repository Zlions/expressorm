import * as express from 'express';
import { Application } from 'express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import IControllerBase from 'interfaces/IControllerBase.interface';

/**
 * App is the main entrypoint for the web application
 *
 * Register global middlewares, routes, assets and templates engines here
 */
class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middlewares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middlewares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
    }

    private middlewares(middleWares: {
        forEach: (arg0: (middleware: any) => void) => void;
    }) {
        middleWares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    private routes(controllers: {
        forEach: (arg0: (controller: IControllerBase) => void) => void;
    }) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    private assets() {
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
    }

    private template() {
        nunjucks.configure(['views/'], {
            autoescape: true,
            express: this.app,
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port :${this.port}`);
        });
    }
}

export default App;
