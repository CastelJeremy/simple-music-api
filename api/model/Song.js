class Song {
    constructor(id, album, name, length) {
        this._id = id;
        this._album = album;
        this._name = name;
        this._length = length;
    }

    setId(id) { this._id = id; }
    getId() { return this._id; }

    setAlbum(album) { this._album = album; }
    getAlbum() { return this._album; }

    setName(name) { this._name = name; }
    getName() { return this._name; }

    setLength(length) { this._length = length; }
    getLength() { return this._length; }

    toObject() {
        return {
            id: this._id,
            album: this._album.toObject(),
            name: this._song,
            length: this._length
        }
    }
}

export { Song };
