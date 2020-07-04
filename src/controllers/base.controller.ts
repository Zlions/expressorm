import IControllerBase from 'interfaces/IControllerBase.interface';
import { Router } from 'express';
import { Request, Response } from 'express';
import * as status from 'http-status-codes';

/**
 * BaseController module helper for controller initializition
 *
 * All methods that are not defined will return a `405` status code
 */
export default abstract class BaseController implements IControllerBase {
    public router = Router();
    protected route = '/'; // This is an internal value for configuring routes

    constructor(public path: string = '/') {}

    /**
     * This method should be called inside the implementation constructor
     */
    protected initRoutes() {
        this.router.get(this.route, this.get);
        this.router.post(this.route, this.post);
        this.router.patch(this.route, this.patch);
        this.router.put(this.route, this.put);
        this.router.delete(this.route, this.delete);
    }

    protected get = (req: Request, res: Response) => {
        res.status(status.METHOD_NOT_ALLOWED).send();
    };

    protected post = (req: Request, res: Response) => {
        res.status(status.METHOD_NOT_ALLOWED).send();
    };

    protected patch = (req: Request, res: Response) => {
        res.status(status.METHOD_NOT_ALLOWED).send();
    };

    protected put = (req: Request, res: Response) => {
        res.status(status.METHOD_NOT_ALLOWED).send();
    };

    protected delete = (req: Request, res: Response) => {
        res.status(status.METHOD_NOT_ALLOWED).send();
    };
}
