import { Request, Response } from 'express';
import BaseController from './base.controller';

class HomeController extends BaseController {
    constructor() {
        super();
        this.initRoutes();
    }

    protected get = (req: Request, res: Response) => {
        const users = [
            {
                id: 1,
                name: 'Rimbo',
            },
        ];
        res.render('home/index', { users });
    };
}

export default HomeController;
