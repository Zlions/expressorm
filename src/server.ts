/**
 * Server startup file
 *
 * The connection to the database should be established first, before starting the rest
 * Use .env file to set environment variables
 */
import App from './app';

import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import loggerMiddleware from './middleware/logger';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import AuhtControllerAPI from './controllers/api/auth.controller';

dotenv.config();

createConnection()
    .then(async (_) => {
        const app = new App({
            port: Number.parseInt(process.env.PORT) || 5000,
            controllers: [
                new HomeController('/'),
                new AuthController('/auth'),
                new AuhtControllerAPI('/api/auth'),
            ],
            middlewares: [
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                loggerMiddleware,
                morgan('dev'),
                cors(),
            ],
        });

        app.listen();
    })
    .catch((err) => {
        console.log(err);
    });
