import { Request, Response } from 'express';
import { authenticate } from 'passport';
import BaseController from './base.controller';

/**
 * Simple authentication controller
 */
class AuthController extends BaseController {
    constructor(public path: string = '/', protected middlewares: any[] = []) {
        super(path, middlewares);
        this.initRoutes();
    }

    protected initRoutes() {
        this.router.get('/register', this.registerGet);
        this.router.post(
            this.route,
            authenticate('local', {
                failureRedirect: '/auths',
                successRedirect: '/',
            }),
            this.post
        );
        this.router.get('/logout', this.logoutGet);
        super.initRoutes();
    }

    protected get = (req: Request, res: Response) => {
        res.render('login.html');
    };

    protected post = (req: Request, res: Response) => {
        res.render('login.html');
    };

    protected registerGet = (req: Request, res: Response) => {
        res.json({ type: 'register' });
    };

    protected logoutGet = (req: Request, res: Response) => {
        req.logout();
        res.redirect('/auth');
    };
}

export default AuthController;
