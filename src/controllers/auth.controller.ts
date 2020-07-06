import { Request, Response } from 'express';
import BaseController from './base.controller';

class AuthController extends BaseController {
    constructor(public path: string = '/') {
        super(path);
        this.initRoutes();
    }

    protected initRoutes() {
        super.initRoutes();
        this.router.get('/register', this.registerGet);
    }

    protected get = (req: Request, res: Response) => {
        res.render('login.html');
    };

    protected registerGet = (req: Request, res: Response) => {
        res.json({ type: 'register' });
    };
}

export default AuthController;
