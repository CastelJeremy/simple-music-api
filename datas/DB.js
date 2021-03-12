import pg from 'pg';

class DB {
    static client = null;

    constructor() {}

    static async open() {
        if (DB.client === null) {
            const pool = new pg.Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                port: process.env.DB_PORT,
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
