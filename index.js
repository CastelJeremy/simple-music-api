import express from 'express';
import bodyParser from 'body-parser';
import { Album } from './api/model/Album.js';
import { AlbumDAO } from './api/dao/AlbumDAO.js';
import { Song } from './api/model/Song.js';
import { SongDAO } from './api/dao/SongDAO.js';

const router = express.Router();

router.use((req, res, next) => {
    const today = new Date();
    const date = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
        hours: today.getHours(),
        minutes: today.getMinutes(),
    };

    console.log(
        `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes} - Something is happening at: ${req.originalUrl}`
    );
    next();
});

router
    .route('/albums')
    .post(async function (req, res) {
        let album = new Album(null, req.body.name, req.body.author);

        const dao = new AlbumDAO();
        album = await dao.create(album);

        res.json(album);
    })
    .get(async function (req, res) {
        const dao = new AlbumDAO();
        let albums = await dao.getAll();

        res.json(albums);
    });

router
    .route('/albums/:album_id')
    .get(async function (req, res) {
        const dao = new AlbumDAO();
        let album = await dao.get(req.params.album_id);

        res.json(album);
    })
    .put(async function (req, res) {
        let album = new Album(
            req.params.album_id,
            req.body.name,
            req.body.author
        );

        const dao = new AlbumDAO();
        album = await dao.update(album);

        res.json(album);
    })
    .delete(async function (req, res) {
        let album = new Album(req.params.album_id, null, null);

        const dao = new AlbumDAO();
        album = await dao.delete(album);

        res.json(album);
    });

router
    .route('/songs')
    .post(async function (req, res) {
        let dao = new AlbumDAO();
        let album = await dao.get(req.params.album_id);
        let song = new Song(null, album, req.params.name, req.params.length);

        dao = new SongDAO();
        song = await dao.create(song);

        res.json(song);
    })
    .get(async function (req, res) {
        let dao = new SongDAO();
        let songs = await dao.getAll();

        res.json(songs);
    });

router
    .route('/songs/:song_id')
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

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

const server = app.listen('8000', '127.0.0.1', () => {
    const { address, port } = server.address();
    console.log(`Hello world app listening on port http://${address}:${port}!`);
});
