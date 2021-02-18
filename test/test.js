import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app.js';

chai.use(chaiHttp);

describe('API Albums', function () {
    describe('GET `/albums`', function () {
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

    describe('POST `/albums`', function () {
        it('should return an album', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '418', author: 'Tea Pot' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.expect(res).to.have.status(200);
                    chai.expect(res).to.be.an('object');
                    chai.expect(res.body).to.be.an('object');
                    chai.expect(res.body.id).to.be.an('number');
                    chai.expect(res.body.name).to.be.an('string');
                    chai.expect(res.body.name).to.be.equal('418');
                    chai.expect(res.body.author).to.be.an('string');
                    chai.expect(res.body.author).to.be.equal('Tea Pot');
                    done();

                    /** Delete the inserted album */
                    chai.request(app)
                        .delete('/albums/' + res.body.id)
                        .end();
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

    describe('GET `/albums/:album_id`', function () {
        it('should return an album', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '200', author: 'OK' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .get('/albums/' + res.body.id)
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status(200);
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.id).to.be.an('number');
                            chai.expect(res.body.name).to.be.an('string');
                            chai.expect(res.body.name).to.be.equal('200');
                            chai.expect(res.body.author).to.be.an('string');
                            chai.expect(res.body.author).to.be.equal('OK');
                            done();

                            chai.request(app)
                                .delete('/albums/' + res.body.id)
                                .end();
                        });
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

    describe('PUT `/albums/:album_id`', function () {
        it('should return an album', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '200', author: 'OK' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .put('/albums/' + res.body.id)
                        .send({ name: 'OK', author: '200' })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status(200);
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.id).to.be.an('number');
                            chai.expect(res.body.name).to.be.an('string');
                            chai.expect(res.body.name).to.be.equal('OK');
                            chai.expect(res.body.author).to.be.an('string');
                            chai.expect(res.body.author).to.be.equal('200');
                            done();

                            chai.request(app)
                                .delete('/albums/' + res.body.id)
                                .end();
                        });
                });
        });

        it('should return status 400', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '400', author: 'Bad Request' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .put('/albums/' + res.body.id)
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status(400);
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.statusCode).to.be.an('number');
                            chai.expect(res.body.statusCode).to.be.equal(400);
                            chai.expect(res.body.error).to.be.an('string');
                            chai.expect(res.body.error).to.be.equal(
                                'Bad Request'
                            );
                            chai.expect(res.body.message).to.be.an('string');
                            done();
                        });

                    chai.request(app)
                        .delete('/albums/' + res.body.id)
                        .end();
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

    describe('DELETE `/albums/:album_id`', function () {
        it('should return an album', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '200', author: 'OK' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .delete('/albums/' + res.body.id)
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status(200);
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.id).to.be.an('number');
                            chai.expect(res.body.name).to.be.an('string');
                            chai.expect(res.body.name).to.be.equal('200');
                            chai.expect(res.body.author).to.be.an('string');
                            chai.expect(res.body.author).to.be.equal('OK');
                            done();
                        });
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

describe('API Songs', function () {
    describe('GET `/songs`', function () {
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

    describe('POST `/songs`', function () {
        it('should return a song', (done) => {
            /** First insert a new album */
            chai.request(app)
                .post('/albums')
                .send({ name: '********* - Volume Beta', author: 'C418' })
                .end((err, res) => {
                    if (err) done(err);

                    /** Insert a new song and make assertions */
                    chai.request(app)
                        .post('/songs')
                        .send({
                            name: 'Beginning 2',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 176,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status('200');
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.id).to.be.an('number');
                            chai.expect(res.body.name).to.be.an('string');
                            chai.expect(res.body.name).to.be.equal(
                                'Beginning 2'
                            );
                            chai.expect(res.body.album).to.be.an('object');
                            chai.expect(res.body.length).to.be.an('number');
                            chai.expect(res.body.length).to.be.equal(176);

                            done();

                            chai.request(app)
                                .delete('/songs/' + res.body.id)
                                .end(() => {
                                    chai.request(app)
                                        .delete('/albums/' + res.body.album.id)
                                        .end();
                                });
                        });
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

    describe('GET `/songs/:song_id`', function () {
        it('should return a song', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '200', author: 'OK' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .post('/songs')
                        .send({
                            name: 'OK',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 200,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.request(app)
                                .get('/songs/' + res.body.id)
                                .end((err, res) => {
                                    if (err) done(err);

                                    chai.expect(res).to.have.status(200);
                                    chai.expect(res).to.be.an('object');
                                    chai.expect(res.body).to.be.an('object');
                                    chai.expect(res.body.id).to.be.an('number');
                                    chai.expect(res.body.name).to.be.an(
                                        'string'
                                    );
                                    chai.expect(res.body.name).to.be.equal(
                                        'OK'
                                    );
                                    chai.expect(res.body.album).to.be.an(
                                        'object'
                                    );
                                    chai.expect(res.body.length).to.be.an(
                                        'number'
                                    );
                                    chai.expect(res.body.length).to.be.equal(
                                        200
                                    );
                                    done();

                                    chai.request(app)
                                        .delete('/songs/' + res.body.id)
                                        .end(() => {
                                            chai.request(app)
                                                .delete(
                                                    '/albums/' +
                                                        res.body.album.id
                                                )
                                                .end();
                                        });
                                });
                        });
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

    describe('PUT `/songs/:song_id`', function () {
        it('should return a song', (done) => {
            chai.request(app)
                .post('/albums')
                .send({ name: '200', author: 'OK' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .post('/songs')
                        .send({
                            name: 'Bad Request',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 400,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.request(app)
                                .put('/songs/' + res.body.id)
                                .send({
                                    name: 'OK',
                                    album: {
                                        id: res.body.album.id,
                                        name: res.body.album.name,
                                        author: res.body.album.author,
                                    },
                                    length: 200,
                                })
                                .end((err, res) => {
                                    if (err) done(err);

                                    chai.expect(res).to.have.status(200);
                                    chai.expect(res).to.be.an('object');
                                    chai.expect(res.body).to.be.an('object');
                                    chai.expect(res.body.id).to.be.an('number');
                                    chai.expect(res.body.name).to.be.an(
                                        'string'
                                    );
                                    chai.expect(res.body.name).to.be.equal(
                                        'OK'
                                    );
                                    chai.expect(res.body.album).to.be.an(
                                        'object'
                                    );
                                    chai.expect(res.body.length).to.be.an(
                                        'number'
                                    );
                                    chai.expect(res.body.length).to.be.equal(
                                        200
                                    );
                                    done();

                                    chai.request(app)
                                        .delete('/songs/' + res.body.id)
                                        .end(() => {
                                            chai.request(app)
                                                .delete(
                                                    '/albums/' +
                                                        res.body.album.id
                                                )
                                                .end();
                                        });
                                });
                        });
                });
        });

        it('should return status 400', (done) => {
            chai.request(app)
                .post('/albums')
                .send({
                    name: '200',
                    author: 'OK',
                })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .post('/songs')
                        .send({
                            name: 'Bad Request',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 400,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.request(app)
                                .put('/songs/' + res.body.id)
                                .end((err, res) => {
                                    if (err) done(err);

                                    chai.expect(res).to.have.status(400);
                                    chai.expect(res).to.be.an('object');
                                    chai.expect(res.body).to.be.an('object');
                                    chai.expect(res.body.statusCode).to.be.an(
                                        'number'
                                    );
                                    chai.expect(
                                        res.body.statusCode
                                    ).to.be.equal(400);
                                    chai.expect(res.body.error).to.be.an(
                                        'string'
                                    );
                                    chai.expect(res.body.error).to.be.equal(
                                        'Bad Request'
                                    );
                                    chai.expect(res.body.message).to.be.an(
                                        'string'
                                    );

                                    done();
                                });

                            chai.request(app)
                                .delete('/songs/' + res.body.id)
                                .end(() => {
                                    chai.request(app)
                                        .delete('/albums/' + res.body.album.id)
                                        .end();
                                });
                        });
                });
        });

        it('should return status 404', (done) => {
            chai.request(app)
                .post('/albums')
                .send({
                    name: '404',
                    author: 'Not Found',
                })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .put('/songs/999999999')
                        .send({
                            name: 'Not Found',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 404,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.expect(res).to.have.status(404);
                            chai.expect(res).to.be.an('object');
                            chai.expect(res.body).to.be.an('object');
                            chai.expect(res.body.statusCode).to.be.an('number');
                            chai.expect(res.body.statusCode).to.be.equal(404);
                            chai.expect(res.body.error).to.be.an('string');
                            chai.expect(res.body.error).to.be.equal(
                                'Not Found'
                            );
                            chai.expect(res.body.message).to.be.an('string');

                            done();
                        });

                    chai.request(app)
                        .delete('/albums/' + res.body.id)
                        .end();
                });
        });
    });

    describe('DELETE `/songs/:song_id`', function () {
        it('should return a song', (done) => {
            chai.request(app)
                .post('/albums')
                .send({
                    name: '200',
                    author: 'OK',
                })
                .end((err, res) => {
                    if (err) done(err);

                    chai.request(app)
                        .post('/songs')
                        .send({
                            name: 'OK',
                            album: {
                                id: res.body.id,
                                name: res.body.name,
                                author: res.body.author,
                            },
                            length: 200,
                        })
                        .end((err, res) => {
                            if (err) done(err);

                            chai.request(app)
                                .delete('/songs/' + res.body.id)
                                .end((err, res) => {
                                    if (err) done(err);

                                    chai.expect(res).to.have.status(200);
                                    chai.expect(res).to.be.an('object');
                                    chai.expect(res.body).to.be.an('object');

                                    done();

                                    chai.request(app)
                                        .delete('/albums/' + res.body.album.id)
                                        .end();
                                });
                        });
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
