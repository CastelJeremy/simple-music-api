import express from 'express';
import { Album } from '../schemas/Album.js';
import { AlbumDAO } from '../models/AlbumDAO.js';

const albums = express.Router();

albums
    .route('/')
    .post(async function (req, res) {
        let album = new Album(null, req.body.name, req.body.author);

        const dao = new AlbumDAO();
        album = await dao.create(album);

        res.json(album.toObject());
    })
    .get(async function (req, res) {
        const dao = new AlbumDAO();
        let albums = await dao.getAll();

        res.json(albums.map((album) => album.toObject()));
    });

albums
    .route('/:album_id')
    .get(async function (req, res) {
        const dao = new AlbumDAO();
        let album = await dao.get(req.params.album_id);

        res.json(album.toObject());
    })
    .put(async function (req, res) {
        let album = new Album(
            req.params.album_id,
            req.body.name,
            req.body.author
        );

        const dao = new AlbumDAO();
        album = await dao.update(album);

        res.json(album.toObject());
    })
    .delete(async function (req, res) {
        let album = new Album(req.params.album_id, null, null);

        const dao = new AlbumDAO();
        album = await dao.delete(album);

        res.json(album.toObject());
    });

export { albums };
