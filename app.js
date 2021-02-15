import express from 'express';
import { router } from './api/router.js';
import { albums } from './api/routes/albums.js';
import { songs } from './api/routes/songs.js';
import { notFoundError, errorHandler } from './api/errorHandler.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', router);
app.use('/albums', albums);
app.use('/songs', songs);

app.use('*', (req, res, next) =>
    next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`))
);

app.use(errorHandler);

const server = app.listen('8000', '127.0.0.1', () => {
    const { address, port } = server.address();
    console.log(`Hello world app listening on port http://${address}:${port}!`);
});

export { app };
