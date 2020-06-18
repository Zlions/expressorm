import App from './app';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';

import HomeController from './controllers/home.controller';
import { createConnection } from 'typeorm';

createConnection()
    .then(async (_) => {
        const app = new App({
            port: 5000,
            controllers: [new HomeController()],
            middlewares: [
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                loggerMiddleware,
            ],
        });

        app.listen();
    })
    .catch((err) => {
        console.log(err);
    });
