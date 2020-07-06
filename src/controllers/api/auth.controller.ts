import { Request, Response } from 'express';
import * as status from 'http-status-codes';
import { validationResult } from 'express-validator';

import BaseController from '../base.controller';
import User from '../../models/User';
import { AuthValidator, RegisterValidator } from '../../utils/auth.utils';

/**
 * API authentication controller
 */
export default class AuhtControllerAPI extends BaseController {
    constructor(public path: string = '/') {
        super(path);
        this.initRoutes();
    }

    protected initRoutes() {
        this.router.get(this.route, this.get);
        this.router.post(this.route, AuthValidator, this.post);
        this.router.put(this.route, RegisterValidator, this.put);
    }

    protected get = (req: Request, res: Response) => {
        res.send();
    };

    protected post = async (req: Request, res: Response) => {
        let user = await User.findOne({ email: req.body.email });

        if (!user.validatePassword(req.body.password)) {
            return res
                .status(status.UNAUTHORIZED)
                .json({ detail: 'Bad credentials' });
        }

        return res.json(user.toJSON());
    };

    protected put = async (req: Request, res: Response) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.BAD_REQUEST).json(errors.array());
        }
        let users = await User.find({ email: req.body.email });

        if (users.length !== 0) {
            return res.status(status.BAD_REQUEST).json([
                {
                    msg: 'Already occupied',
                    param: 'email',
                    location: 'body',
                },
            ]);
        }

        let user = new User(req.body);
        user = await user.save();
        return res.status(status.CREATED).json(user.toJSON());
    };
}
