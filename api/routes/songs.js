import express from 'express';
import { Album } from '../schemas/Album.js';
import { Song } from '../schemas/Song.js';
import { AlbumDAO } from '../models/AlbumDAO.js';
import { SongDAO } from '../models/SongDAO.js';
import { queryParamError, notFoundError } from '../errorHandler.js';

const songs = express.Router();

songs
    .route('/')
    .post(async function (req, res, next) {
        if (
            typeof req.body.album != 'object' ||
            typeof req.body.album.id != 'number' ||
            typeof req.body.name != 'string' ||
            typeof req.body.length != 'number'
        )
            return next(
                queryParamError(
                    `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting album as object, name as string and length as number.`
                )
            );

        let dao = new AlbumDAO();
        let album = await dao.get(req.body.album.id);

        if (!album)
            return next(
                notFoundError(
                    `No album found that matches the ID ${req.body.album.id}`
                )
            );

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
    .get(async function (req, res, next) {
        const dao = new SongDAO();
        let song = await dao.get(req.params.song_id);

        if (!song)
            return next(
                notFoundError(
                    `No song found that matches the ID ${req.params.song_id}`
                )
            );

        res.json(song.toObject());
    })
    .put(async function (req, res) {
        if (
            typeof req.body.album != 'object' ||
            typeof req.body.album.id != 'number' ||
            typeof req.body.name != 'string' ||
            typeof req.body.length != 'number'
        )
            return next(
                queryParamError(
                    `Missing or invalid parameters for PUT '${req.originalUrl}'. Expecting album as object, name as string and length as number.`
                )
            );

        const albumDao = new AlbumDAO();
        let album = albumDao.get(req.body.album.id);

        if (!album)
            return next(
                notFoundError(
                    `No album found that matches the ID ${req.body.album.id}`
                )
            );

        const songDao = new SongDAO();
        let tmpSong = await songDao.get(req.params.song_id);

        if (!tmpSong)
            return next(
                notFoundError(
                    `No song found that matches the ID ${req.params.song_id}`
                )
            );

        let song = new Song(
            req.params.song_id,
            album,
            req.body.name,
            req.body.length
        );

        song = await songDao.update(song);

        res.json(song.toObject());
    })
    .delete(async function (req, res) {
        const dao = new SongDAO();
        let song = await dao.get(req.params.song_id);

        if (!song)
            return next(
                notFoundError(
                    `No song found that matches the ID ${req.params.song_id}`
                )
            );

        song = await dao.delete(song);

        res.json(song.toObject());
    });

export { songs };
