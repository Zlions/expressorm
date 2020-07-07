import { Strategy } from 'passport-local';
import User from '../models/User';

/**
 * Initialize passport passport
 * @param passport namespace import from the NPM module
 */
export default function initPassport(passport: any) {
    passport.use(
        new Strategy(
            { usernameField: 'email', passwordField: 'password' },
            (username: string, password: string, done) => {
                User.findOne({ email: username })
                    .then((user) => {
                        if (!user) {
                            return done(null, false);
                        } else if (!user.validatePassword(password)) {
                            return done(null, false);
                        }
                        return done(null, user);
                    })
                    .catch((err) => {
                        return done(err);
                    });
            }
        )
    );

    passport.serializeUser((user: User, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id: number, cb) => {
        User.findOne(id)
            .then((user) => {
                cb(null, user);
            })
            .catch((err) => {
                return cb(err);
            });
    });
}
