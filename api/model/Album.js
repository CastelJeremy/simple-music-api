class Album {
    constructor(albumId, albumName, albumAuthor) {
        this.album_id = albumId;
        this.album_name = albumName;
        this.album_author = albumAuthor;
    }

    setId(albumId) { this.album_id = albumId; }
    getId() { return this.album_id; }

    setName(albumName) { this.album_name = albumName; }
    getName() { return this.album_name; }

    setAuthor(albumAuthor) { this.album_author = albumAuthor; }
    getAuthor() { return this.album_author; }
}

export { Album }