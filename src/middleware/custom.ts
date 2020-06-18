import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    console.log('custom middleware');
    next();
};

export default loggerMiddleware;
