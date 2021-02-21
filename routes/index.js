import express from 'express';
import { tokenHandler } from '../system/tokenHandler.js';
import login from './api/login.js';
import album from './api/album.js';
import song from './api/song.js';

const routes = express.Router();

routes.route('/login').post(login.postLogin);

routes
    .route('/albums')
    .post(tokenHandler, album.postAlbum)
    .get(tokenHandler, album.getAlbums);
routes
    .route('/albums/:album_id')
    .get(tokenHandler, album.getAlbum)
    .put(tokenHandler, album.putAlbum)
    .delete(tokenHandler, album.deleteAlbum);

routes
    .route('/songs')
    .post(tokenHandler, song.postSong)
    .get(tokenHandler, song.getSongs);
routes
    .route('/songs/:song_id')
    .get(tokenHandler, song.getSong)
    .put(tokenHandler, song.putSong)
    .delete(tokenHandler, song.deleteSong);

export default routes;
