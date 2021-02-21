import { Album } from '../../models/Album.js';
import { AlbumDAO } from '../../datas/AlbumDAO.js';
import { queryParamError, notFoundError } from '../../system/errorHandler.js';

async function postAlbum(req, res, next) {
    if (typeof req.body.name != 'string' || typeof req.body.author != 'string')
        return next(
            queryParamError(
                `Missing or invalid parameters for POST '${req.originalUrl}'. Expecting name and author as string.`
            )
        );

    let album = new Album(null, req.body.name, req.body.author);

    const dao = new AlbumDAO();
    album = await dao.create(album);

    res.json(album.toObject());
}

async function getAlbums(req, res) {
    const dao = new AlbumDAO();
    let albums = await dao.getAll();

    res.json(albums.map((album) => album.toObject()));
}

async function getAlbum(req, res, next) {
    const dao = new AlbumDAO();
    let album = await dao.get(req.params.album_id);

    if (!album)
        return next(
            notFoundError(
                `No album found that matches the ID ${req.params.album_id}`
            )
        );

    res.json(album.toObject());
}

async function putAlbum(req, res, next) {
    if (typeof req.body.name != 'string' || typeof req.body.author != 'string')
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

    let album = new Album(req.params.album_id, req.body.name, req.body.author);

    album = await dao.update(album);

    res.json(album.toObject());
}

async function deleteAlbum(req, res, next) {
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
}

export default { postAlbum, getAlbums, getAlbum, putAlbum, deleteAlbum };
