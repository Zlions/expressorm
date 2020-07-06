import { Request, Response } from 'express';
import BaseController from './base.controller';

class HomeController extends BaseController {
    constructor(public path: string = '/') {
        super(path);
        this.initRoutes();
    }

    protected get = (req: Request, res: Response) => {
        // const users = await User.find();

        res.render('index.html', { name: 'Rimvydas' });
    };
}

export default HomeController;
