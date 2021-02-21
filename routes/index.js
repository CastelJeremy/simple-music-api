import express from 'express';
import { tokenHandler } from '../system/tokenHandler.js';
import login from './api/login.js';
import albums from './api/albums.js';
import songs from './api/songs.js';

const routes = express.Router();

routes.route('/login').post(login.postLogin);

routes
    .route('/albums')
    .post(tokenHandler, albums.postAlbum)
    .get(tokenHandler, albums.getAlbums);
routes
    .route('/albums/:album_id')
    .get(tokenHandler, albums.getAlbum)
    .put(tokenHandler, albums.putAlbum)
    .delete(tokenHandler, albums.deleteAlbum);

routes
    .route('/songs')
    .post(tokenHandler, songs.postSong)
    .get(tokenHandler, songs.getSongs);
routes
    .route('/songs/:song_id')
    .get(tokenHandler, songs.getSong)
    .put(tokenHandler, songs.putSong)
    .delete(tokenHandler, songs.deleteSong);

export default routes;
