import express from 'express';
import routes from './routes/index.js';
import { corsHandler } from './system/corsHandler.js';
import { logHandler } from './system/logHandler.js';
import { notFoundError, errorHandler } from './system/errorHandler.js';

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_PORT,
    APP_HOST,
    APP_PORT,
} = process.env;

if (
    !DB_HOST ||
    !DB_NAME ||
    !DB_USER ||
    !DB_PASS ||
    !DB_PORT ||
    !APP_HOST ||
    !APP_PORT
) {
    throw new Error('Missing ENV variables: check your .env file');
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logHandler);

app.use('/', corsHandler(), routes);

app.use('*', (req, res, next) =>
    next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`))
);

app.use(errorHandler);

const server = app.listen(APP_PORT, APP_HOST, () => {
    const { address, port } = server.address();
    console.log(`Hello world app listening on port http://${address}:${port}!`);
});

export { app };
