import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as status from 'http-status-codes';
import User, { JWTUserInterface } from '../models/User';
import { JWTprivateKey } from '../config/secrets';

/**
 * JWT authentication middleware
 *
 * Add Authorization key to request headers
 */
export default function authenticateJWT(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, JWTprivateKey, (err, user: JWTUserInterface) => {
                if (err) {
                    return res.status(status.BAD_REQUEST).json({
                        detail: err.message,
                    });
                }

                req.user = User.findOne(user._id);
            });
        }
    }

    next();
}
