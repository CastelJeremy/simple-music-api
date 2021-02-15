import express from 'express';
import { Album } from '../schemas/Album.js';
import { AlbumDAO } from '../models/AlbumDAO.js';
import { queryParamError, notFoundError } from '../errorHandler.js';

const albums = express.Router();

albums
    .route('/')
    .post(async function (req, res, next) {
        if (
            typeof req.body.name != 'string' ||
            typeof req.body.author != 'string'
        )
            return next(
                queryParamError(
                    `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting name and author as string.`
                )
            );

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

/** To handle URL params error we must subscibre to express events. */
albums
    .route('/:album_id')
    .get(async function (req, res, next) {
        const dao = new AlbumDAO();
        let album = await dao.get(req.params.album_id);

        if (!album)
            return next(
                notFoundError(
                    `No album found that matches the ID ${req.params.album_id}`
                )
            );

        res.json(album.toObject());
    })
    .put(async function (req, res, next) {
        if (
            typeof req.body.name != 'string' ||
            typeof req.body.author != 'string'
        )
            return next(
                queryParamError(
                    `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting name and author as string.`
                )
            );

        const dao = new AlbumDAO();
        let tmpAlbum = await dao.get(req.params.album_id);

        if (!tmpAlbum)
            return next(
                notFoundError(
                    `No album found that matches the ID ${req.params.album_id}`
                )
            );

        let album = new Album(
            req.params.album_id,
            req.body.name,
            req.body.author
        );

        album = await dao.update(album);

        res.json(album.toObject());
    })
    .delete(async function (req, res, next) {
        const dao = new AlbumDAO();
        let album = await dao.get(req.params.album_id);

        if (!album)
            return next(
                notFoundError(
                    `No album found that matches the ID ${req.params.album_id}`
                )
            );

        album = await dao.delete(album);

        res.json(album.toObject());
    });

export { albums };
