import { body } from 'express-validator';

export const AuthValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
];

export const RegisterValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('firstName').isLength({ min: 3 }),
    body('lastName').isLength({ min: 3 }),
];
