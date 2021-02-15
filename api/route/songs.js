import express from 'express';
import { Album } from '../model/Album.js';
import { Song } from '../model/Song.js';
import { AlbumDAO } from '../dao/AlbumDAO.js';
import { SongDAO } from '../dao/SongDAO.js';

const songs = express.Router();

songs
    .route('/')
    .post(async function (req, res) {
        let dao = new AlbumDAO();
        let album = new Album(req.body.album.id, req.body.album.name, req.body.album.author);
        let song = new Song(null, album, req.body.name, req.body.length);

        dao = new SongDAO();
        song = await dao.create(song);

        res.json(song.toObject());
    })
    .get(async function (req, res) {
        let dao = new SongDAO();
        let songs = await dao.getAll();

        res.json(songs.map((song) => song.toObject()));
    });

songs
    .route('/:song_id')
    .get(async function (req, res) {
        const dao = new SongDAO();
        let song = await dao.get(req.params.song_id);

        res.json(song.toObject());
    })
    .put(async function (req, res) {
        let album = new Album(req.body.album.id, req.body.album.name, req.body.album.author);
        let song = new Song(req.params.song_id, album, req.body.name, req.body.length);

        const dao = new SongDAO();
        song = await dao.update(song);

        res.json(song.toObject());
    })
    .delete(async function (req, res) {
        let song = new Song(req.params.song_id, null, null, null);

        const dao = new SongDAO();
        song = await dao.delete(song);

        res.json(song.toObject());
    });

export { songs };
