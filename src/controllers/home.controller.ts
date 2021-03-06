import { Request, Response } from 'express';
import BaseController from './base.controller';

class HomeController extends BaseController {
    constructor(public path: string = '/', protected middlewares: any[] = []) {
        super(path, middlewares);
        this.initRoutes();
    }

    protected get = (req: Request, res: Response) => {
        res.render('index.html');
    };
}

export default HomeController;
