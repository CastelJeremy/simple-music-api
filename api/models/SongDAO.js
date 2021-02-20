import { DB } from '../DB.js';
import { AlbumDAO } from './AlbumDAO.js';
import { Song } from '../schemas/Song.js';

class SongDAO {
    constructor() {}

    async create(song) {
        const client = await DB.open();
        const result = await client.query(
            'INSERT INTO song(album_id, song_name, song_length) VALUES ($1, $2, $3) RETURNING *',
            [song.getAlbum().getId(), song.getName(), song.getLength()]
        );

        const albumDAO = new AlbumDAO();

        return result && result.rows && result.rows[0]
            ? new Song(
                  result.rows[0].song_id,
                  await albumDAO.get(result.rows[0].album_id),
                  result.rows[0].song_name,
                  result.rows[0].song_length
              )
            : null;
    }

    async get(songId) {
        const client = await DB.open();
        const result = await client.query(
            'SELECT * FROM song WHERE song_id = $1',
            [songId]
        );

        const albumDAO = new AlbumDAO();

        return result && result.rows && result.rows[0]
            ? new Song(
                  result.rows[0].song_id,
                  await albumDAO.get(result.rows[0].album_id),
                  result.rows[0].song_name,
                  result.rows[0].song_length
              )
            : null;
    }

    async getAllByAlbum(albumId) {
        const client = await DB.open();
        const result = await client.query(
            'SELECT * FROM song WHERE album_id = $1 ORDER BY song_id',
            [albumId]
        );

        const albumDAO = new AlbumDAO();

        let songs = [];
        for (let row of result.rows) {
            songs.push(
                new Song(
                    row.song_id,
                    await albumDAO.get(row.album_id),
                    row.song_name,
                    row.song_length
                )
            );
        }

        return songs;
    }

    async getAll() {
        const client = await DB.open();
        const result = await client.query('SELECT * FROM song ORDER BY song_id');

        const albumDAO = new AlbumDAO();

        let songs = [];
        for (let row of result.rows) {
            songs.push(
                new Song(
                    row.song_id,
                    await albumDAO.get(row.album_id),
                    row.song_name,
                    row.song_length
                )
            );
        }

        return songs;
    }

    async update(song) {
        const client = await DB.open();
        const result = await client.query(
            'UPDATE song SET album_id = $2, song_name = $3, song_length = $4 WHERE song_id = $1 RETURNING *',
            [
                song.getId(),
                song.getAlbum().getId(),
                song.getName(),
                song.getLength(),
            ]
        );

        const albumDAO = new AlbumDAO();

        return result && result.rows && result.rows[0]
            ? new Song(
                  result.rows[0].song_id,
                  await albumDAO.get(result.rows[0].album_id),
                  result.rows[0].song_name,
                  result.rows[0].song_length
              )
            : null;
    }

    async delete(song) {
        const client = await DB.open();
        const result = await client.query(
            'DELETE FROM song WHERE song_id = $1 RETURNING *',
            [song.getId()]
        );

        const albumDAO = new AlbumDAO();

        return result && result.rows && result.rows[0]
            ? new Song(
                  result.rows[0].song_id,
                  await albumDAO.get(result.rows[0].album_id),
                  result.rows[0].song_name,
                  result.rows[0].song_length
              )
            : null;
    }
}

export { SongDAO };
