import crypto from 'node:crypto';

class User {
    constructor(id, username, password) {
        this._id = id;
        this._username = username;
        this._password = password;
    }

    setId(id) { this._id = id; }
    getId() { return this._id; }

    setUsername(username) { this._username = username; }
    getUsername() { return this._username; }

    setPassword(password) { this._password = password; }
    getPassword() { return this._password; }

    checkPassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);

        return this._password == hash.digest('hex');
    }

    toObject() {
        return {
            id: this._id,
            username: this._username,
            password: this._password,
        };
    }
}

export { User };
