/**
 * Server startup file
 *
 * The connection to the database should be established first, before starting the rest
 */
import App from './app';

import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import loggerMiddleware from './middleware/logger';
import HomeController from './controllers/home.controller';
import * as dotenv from 'dotenv';

dotenv.config();

createConnection()
    .then(async (_) => {
        const app = new App({
            port: Number.parseInt(process.env.PORT) || 5000,
            controllers: [new HomeController()],
            middlewares: [
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                loggerMiddleware,
                morgan('dev'),
            ],
        });

        app.listen();
    })
    .catch((err) => {
        console.log(err);
    });
