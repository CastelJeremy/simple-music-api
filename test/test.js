import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app.js';

chai.use(chaiHttp);

describe('API Albums', function () {
    describe('Routes `/albums`', function () {
        describe('GET', function () {
            it('should return an array', (done) => {
                chai.request(app)
                    .get('/albums')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('array');
                        done();
                    });
            });
        });

        describe('POST', function () {
            /** Album the first `it` will insert into the database. */
            const album = {
                id: null,
                name: 'POST',
                author: 'album',
            };

            /** Delete the album after the test. */
            after(async function () {
                await chai.request(app).delete('/albums/' + album.id);
            });

            it('should return an album', (done) => {
                chai.request(app)
                    .post('/albums')
                    .send(album)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(album.name);
                        chai.expect(res.body.author).to.be.an('string');
                        chai.expect(res.body.author).to.be.equal(album.author);

                        done();

                        album.id = res.body.id;
                    });
            });

            it('should return status 400', (done) => {
                chai.request(app)
                    .post('/albums')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(400);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(400);
                        chai.expect(res.body.error).to.be.equal('Bad Request');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });
    });

    describe('Routes `/albums/:album_id`', function () {
        /** Album used in each `it`. */
        const album = {
            id: null,
            name: 'test_album',
            author: 'random_author',
        };

        /** Insert the album before running tests. */
        before(async function () {
            let res = await chai.request(app).post('/albums').send(album);

            album.id = res.body.id;
        });

        /**
         * Delete the album after the test. The final `it` should delete the
         * album but we must run the delete request in case the test fails.
         */
        after(async function () {
            await chai.request(app).delete('/albums/' + album.id);
        });

        describe('GET', function () {
            it('should return an album', (done) => {
                chai.request(app)
                    .get('/albums/' + album.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(album.name);
                        chai.expect(res.body.author).to.be.an('string');
                        chai.expect(res.body.author).to.be.equal(album.author);

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .get('/albums/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });

        describe('PUT', function () {
            it('should return an album', (done) => {
                chai.request(app)
                    .put('/albums/' + album.id)
                    .send(album)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(album.name);
                        chai.expect(res.body.author).to.be.an('string');
                        chai.expect(res.body.author).to.be.equal(album.author);

                        done();
                    });
            });

            it('should return status 400', (done) => {
                chai.request(app)
                    .put('/albums/' + album.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(400);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(400);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Bad Request');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .put('/albums/999999999')
                    .send({ name: '404', author: 'Not Found' })
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });

        describe('DELETE', function () {
            it('should return an album', (done) => {
                chai.request(app)
                    .delete('/albums/' + album.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(album.name);
                        chai.expect(res.body.author).to.be.an('string');
                        chai.expect(res.body.author).to.be.equal(album.author);

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .delete('/albums/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });
    });
});

describe('API Songs', function () {
    describe('Routes `/songs`', function () {
        describe('GET', function () {
            it('should return an array', (done) => {
                chai.request(app)
                    .get('/songs')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('array');

                        done();
                    });
            });
        });

        describe('POST', function () {
            /** Album mandatory for the song object to be valid. */
            const album = {
                id: null,
                name: 'POST',
                author: 'songs',
            };

            /** Song the first `it` will insert into the database. */
            const song = {
                id: null,
                album: null,
                name: 'POST',
                length: 200,
            };

            /** Insert the album in the database. */
            before(async function () {
                let res = await chai.request(app).post('/albums').send(album);

                album.id = res.body.id;
                song.album = album;
            });

            /**
             * Delete the song and delete the album after the test (make sure
             * to respect this order or there will be a FOREIGN_KEY error).
             */
            after(async function () {
                await chai.request(app).delete('/songs/' + song.id);
                await chai.request(app).delete('/albums/' + album.id);
            });

            it('should return a song', (done) => {
                chai.request(app)
                    .post('/songs')
                    .send(song)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status('200');
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(song.name);
                        chai.expect(res.body.album).to.be.an('object');
                        chai.expect(res.body.length).to.be.an('number');
                        chai.expect(res.body.length).to.be.equal(song.length);

                        done();

                        song.id = res.body.id;
                    });
            });

            it('should return status 400', (done) => {
                chai.request(app)
                    .post('/songs')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(400);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(400);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Bad Request');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });
    });

    describe('Routes `/songs/:song_id`', function () {
        /** Album mandatory for the song object to be valid. */
        const album = {
            id: null,
            name: 'test_ablum',
            author: 'random_author',
        };
        /** Album mandatory for the song object to be valid. */

        /** Song used in each `it`. */
        const song = {
            id: null,
            album: null,
            name: 'test_song',
            length: 200,
        };

        /** Insert the song and the album. */
        before(async function () {
            let res = await chai.request(app).post('/albums').send(album);

            album.id = res.body.id;
            song.album = album;

            res = await chai.request(app).post('/songs').send(song);

            song.id = res.body.id;
        });

        /**
         * Delete the song and the album. The final `it` should delete the
         * song, but we must run the delete request in case the test fails.
         */
        after(async function () {
            await chai.request(app).delete('/songs/' + song.id);
            await chai.request(app).delete('/albums/' + album.id);
        });

        describe('GET', function () {
            it('should return a song', (done) => {
                chai.request(app)
                    .get('/songs/' + song.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(song.name);
                        chai.expect(res.body.album).to.be.an('object');
                        chai.expect(res.body.length).to.be.an('number');
                        chai.expect(res.body.length).to.be.equal(song.length);

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .get('/songs/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });

        describe('PUT', function () {
            it('should return a song', (done) => {
                chai.request(app)
                    .put('/songs/' + song.id)
                    .send(song)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(song.name);
                        chai.expect(res.body.album).to.be.an('object');
                        chai.expect(res.body.length).to.be.an('number');
                        chai.expect(res.body.length).to.be.equal(song.length);

                        done();
                    });
            });

            it('should return status 400', (done) => {
                chai.request(app)
                    .put('/songs/' + song.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(400);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(400);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Bad Request');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .put('/songs/999999999')
                    .send(song)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });

        describe('DELETE', function () {
            it('should return a song', (done) => {
                chai.request(app)
                    .delete('/songs/' + song.id)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.id).to.be.an('number');
                        chai.expect(res.body.name).to.be.an('string');
                        chai.expect(res.body.name).to.be.equal(song.name);
                        chai.expect(res.body.album).to.be.an('object');
                        chai.expect(res.body.length).to.be.an('number');
                        chai.expect(res.body.length).to.be.equal(song.length);

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .delete('/songs/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(404);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.an('number');
                        chai.expect(res.body.statusCode).to.be.equal(404);
                        chai.expect(res.body.error).to.be.an('string');
                        chai.expect(res.body.error).to.be.equal('Not Found');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });
        });
    });
});
