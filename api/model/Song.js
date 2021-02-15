class Song {
    constructor(songId, album, songName, songLength) {
        this.song_id = songId;
        this.album = album;
        this.song_name = songName;
        this.song_length = songLength;
    }

    setId(songId) { this.song_id = songId; }
    getId() { return this.song_id; }

    setAlbum(album) { this.album = album; }
    getAlbum() { return this.album; }

    setName(songName) { this.song_name = songName; }
    getName() { return this.song_name; }

    setLength(songLength) { this.song_length = songLength; }
    getLength() { return this.song_length; }
}

export { Song };
