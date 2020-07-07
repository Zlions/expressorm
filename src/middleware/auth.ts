import { Request, Response, NextFunction } from 'express';
import * as status from 'http-status-codes';

/**
 * Check if user is authenticated. Otherwise return a HTTP 403 response
 */
export default function IsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return res.status(status.FORBIDDEN).json({ detail: 'Forbidden' });
    }

    next();
}
