import express from 'express';
import routes from './routes/index.js';
import { logHandler } from './system/logHandler.js';
import { notFoundError, errorHandler } from './system/errorHandler.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logHandler);

app.use('/', routes);

app.use('*', (req, res, next) =>
    next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`))
);

app.use(errorHandler);

const server = app.listen('8000', '127.0.0.1', () => {
    const { address, port } = server.address();
    console.log(`Hello world app listening on port http://${address}:${port}!`);
});

export { app };
