import express from 'express';
import login from './api/login.js';
import album from './api/album.js';
import song from './api/song.js';

const routes = express.Router();

routes.route('/login').post(login.postLogin);

routes.route('/albums').post(album.postAlbum).get(album.getAlbums);
routes
    .route('/albums/:album_id')
    .get(album.getAlbum)
    .put(album.putAlbum)
    .delete(album.deleteAlbum);

routes.route('/songs').post(song.postSong).get(song.getSongs);
routes
    .route('/songs/:song_id')
    .get(song.getSong)
    .put(song.putSong)
    .delete(song.deleteSong);

export default routes;
