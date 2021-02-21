import jwt from 'jsonwebtoken';
import { unauthorizedError } from './errorHandler.js';

function tokenHandler(req, res, next) {
    const { authorization } = req.headers;

    if (typeof authorization != 'string') {
        return next(
            unauthorizedError('Your token is either invalid or expired.')
        );
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'appsecret');

        next();
    } catch (err) {
        return next(
            unauthorizedError('Your token is either invalid or expired.')
        );
    }
}

export { tokenHandler };
