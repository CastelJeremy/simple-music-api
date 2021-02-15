import { DB } from '../DB.js';
import { Album } from '../model/Album.js';

class AlbumDAO {
    constructor() {}

    async create(album) {
        const client = await DB.open();
        const result = await client.query(
            'INSERT INTO album(album_name, album_author) VALUES ($1, $2) RETURNING *',
            [album.getName(), album.getAuthor()]
        );

        return result && result.rows && result.rows[0]
            ? new Album(
                  result.rows[0].album_id,
                  result.rows[0].album_name,
                  result.rows[0].album_author
              )
            : null;
    }

    async get(albumId) {
        const client = await DB.open();
        const result = await client.query(
            'SELECT * FROM album WHERE album_id = $1',
            [albumId]
        );

        return result && result.rows && result.rows[0]
            ? new Album(
                  result.rows[0].album_id,
                  result.rows[0].album_name,
                  result.rows[0].album_author
              )
            : null;
    }

    async getAll() {
        const client = await DB.open();
        const result = await client.query('SELECT * FROM album');

        let albums = [];
        for (let row of result.rows) {
            albums.push(
                new Album(row.album_id, row.album_name, row.album_author)
            );
        }

        return albums;
    }

    async update(album) {
        const client = await DB.open();
        const result = await client.query(
            'UPDATE album SET album_name = $2, album_author = $3 WHERE album_id = $1 RETURNING *',
            [album.getId(), album.getName(), album.getAuthor()]
        );

        return result && result.rows && result.rows[0]
            ? new Album(
                  result.rows[0].album_id,
                  result.rows[0].album_name,
                  result.rows[0].album_author
              )
            : null;
    }

    async delete(album) {
        const client = await DB.open();
        const result = await client.query(
            'DELETE FROM album WHERE album_id = $1 RETURNING *',
            [album.getId()]
        );

        return result && result.rows && result.rows[0]
            ? new Album(
                  result.rows[0].album_id,
                  result.rows[0].album_name,
                  result.rows[0].album_author
              )
            : null;
    }
}

export { AlbumDAO };
