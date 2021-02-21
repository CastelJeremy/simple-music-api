import jwt from 'jsonwebtoken';
import { UserDAO } from '../../datas/UserDAO.js';
import { queryParamError } from '../../system/errorHandler.js';

async function postLogin(req, res, next) {
    const { username, password } = req.body;

    console.log(req.headers);

    if (typeof username != 'string' || typeof password != 'string')
        return next(
            queryParamError(
                `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting username as string and password as string.`
            )
        );

    let dao = new UserDAO();
    let user = await dao.getByUsername(username);

    if (user && user.checkPassword(password)) {
        const token = jwt.sign({ username: username }, 'appsecret', {
            expiresIn: '30m',
        });

        res.json({
            'access-token': token,
        });
    } else {
        return next(
            queryParamError(
                `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting username as string and password as string.`
            )
        );
    }
}

export default { postLogin };
