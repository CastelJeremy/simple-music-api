import pg from 'pg';

class DB {
    static client = null;

    constructor() {}

    static async open() {
        if (DB.client === null) {
            const pool = new pg.Pool({
                user: 'user',
                host: 'host',
                database: 'db_name',
                password: 'password',
                port: 5432,
            });

            DB.client = await pool.connect();
        }

        return DB.client;
    }

    static async close() {
        await DB.client.end();
        DB.client = null;
    }
}

export { DB };
