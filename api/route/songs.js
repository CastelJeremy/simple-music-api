import express from 'express';
import { Song } from '../model/Song.js';
import { AlbumDAO } from '../dao/AlbumDAO.js';
import { SongDAO } from '../dao/SongDAO.js';

const songs = express.Router();

songs
    .route('/')
    .post(async function (req, res) {
        let dao = new AlbumDAO();
        let album = await dao.get(req.body.album_id);
        console.log(album);
        let song = new Song(null, album, req.body.name, req.body.length);

        dao = new SongDAO();
        song = await dao.create(song);

        res.json(song);
    })
    .get(async function (req, res) {
        let dao = new SongDAO();
        let songs = await dao.getAll();

        res.json(songs);
    });

songs
    .route('/:song_id')
    .get(async function (req, res) {
        const dao = new SongDAO();
        let song = await dao.get(req.params.song_id);

        res.json(song);
    })
    .put(async function (req, res) {
        let song = new Song(
            req.params.song_id,
            req.body.album_id,
            req.body.name,
            req.body.length
        );

        const dao = new SongDAO();
        song = await dao.update(song);

        res.json(song);
    })
    .delete(async function (req, res) {
        let song = new Song(req.params.song_id, null, null, null);

        const dao = new SongDAO();
        song = await dao.delete(song);

        res.json(song);
    });

export { songs };
