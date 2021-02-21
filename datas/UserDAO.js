import { DB } from './DB.js';
import { User } from '../models/User.js';

class UserDAO {
    constructor() {}

    async get(userId) {
        const client = await DB.open();
        const result = await client.query(
            'SELECT * FROM "user" WHERE user_id = $1',
            [userId]
        );

        return result && result.rows && result.rows[0]
            ? new User(
                  result.rows[0].user_id,
                  result.rows[0].user_username,
                  result.rows[0].user_password
              )
            : null;
    }

    async getByUsername(userUsername) {
        const client = await DB.open();
        const result = await client.query(
            'SELECT * FROM "user" WHERE user_username = $1',
            [userUsername]
        );

        return result && result.rows && result.rows[0]
            ? new User(
                  result.rows[0].user_id,
                  result.rows[0].user_username,
                  result.rows[0].user_password
              )
            : null;
    }
}

export { UserDAO };
