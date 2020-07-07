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
import * as expressSession from 'express-session';
import * as passport from 'passport';

import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import AuhtControllerAPI from './controllers/api/auth.controller';
import initPassport from './config/passport';
import authenticateJWT from './middleware/jwt';
import { SessionSecret } from './config/secrets';
import ValidationHandler from './middleware/validators';

dotenv.config();

createConnection()
    .then(async (_) => {
        initPassport(passport);

        const app = new App({
            port: Number.parseInt(process.env.PORT) || 5000,
            controllers: [
                new HomeController('/'),
                new AuthController('/auth'),
                new AuhtControllerAPI('/api/auth', [ValidationHandler]),
            ],
            middlewares: [
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                morgan('dev'),
                cors(),
                authenticateJWT,
                expressSession({
                    secret: SessionSecret,
                    resave: false,
                    saveUninitialized: false,
                }),
                passport.initialize(),
                passport.session(),
            ],
        });

        app.listen();
    })
    .catch((err) => {
        console.log(err);
    });
