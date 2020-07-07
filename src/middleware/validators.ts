import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as status from 'http-status-codes';

/**
 * Handle validation errors
 * Middleware has to be called after express-validator
 */
export default function ValidationHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(status.BAD_REQUEST).json(errors.array());
    }

    next();
}
