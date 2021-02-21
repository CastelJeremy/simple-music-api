class Album {
    constructor(id, name, author) {
        this._id = id;
        this._name = name;
        this._author = author;
    }

    setId(id) { this._id = id; }
    getId() { return this._id; }

    setName(name) { this._name = name; }
    getName() { return this._name; }

    setAuthor(author) { this._author = author; }
    getAuthor() { return this._author; }

    toObject() {
        return {
            id: this._id,
            name: this._name,
            author: this._author,
        }
    }
}

export { Album }