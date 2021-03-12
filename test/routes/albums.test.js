import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../app.js';

chai.use(chaiHttp);

describe('API Albums', function () {
    let token = null;

    before(async function () {
        let res = await chai
            .request(app)
            .post('/login')
            .send({ username: 'demo_username', password: 'demo_password' });

        token = 'Bearer ' + res.body['access-token'];
    });

    describe('Routes `/albums`', function () {
        describe('GET', function () {
            it('should return an array', (done) => {
                chai.request(app)
                    .get('/albums')
                    .set('authorization', token)
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(200);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('array');

                        done();
                    });
            });

            it('should return status 401', (done) => {
                chai.request(app)
                    .get('/albums')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(401);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(401);
                        chai.expect(res.body.error).to.be.equal('Unauthorized');
                        chai.expect(res.body.message).to.be.an('string');

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
                await chai
                    .request(app)
                    .delete('/albums/' + album.id)
                    .set('authorization', token);
            });

            it('should return an album', (done) => {
                chai.request(app)
                    .post('/albums')
                    .set('authorization', token)
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
                    .set('authorization', token)
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

            it('should return status 401', (done) => {
                chai.request(app)
                    .post('/albums')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(401);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(401);
                        chai.expect(res.body.error).to.be.equal('Unauthorized');
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
            let res = await chai
                .request(app)
                .post('/albums')
                .set('authorization', token)
                .send(album);

            album.id = res.body.id;
        });

        /**
         * Delete the album after the test. The final `it` should delete the
         * album but we must run the delete request in case the test fails.
         */
        after(async function () {
            await chai
                .request(app)
                .delete('/albums/' + album.id)
                .set('authorization', token);
        });

        describe('GET', function () {
            it('should return an album', (done) => {
                chai.request(app)
                    .get('/albums/' + album.id)
                    .set('authorization', token)
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

            it('should return status 401', (done) => {
                chai.request(app)
                    .get('/albums/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(401);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(401);
                        chai.expect(res.body.error).to.be.equal('Unauthorized');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .get('/albums/999999999')
                    .set('authorization', token)
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
                    .set('authorization', token)
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
                    .set('authorization', token)
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

            it('should return status 401', (done) => {
                chai.request(app)
                    .put('/albums/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(401);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(401);
                        chai.expect(res.body.error).to.be.equal('Unauthorized');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .put('/albums/999999999')
                    .set('authorization', token)
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
                    .set('authorization', token)
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

            it('should return status 401', (done) => {
                chai.request(app)
                    .delete('/albums/999999999')
                    .end((err, res) => {
                        if (err) done(err);

                        chai.expect(res).to.have.status(401);
                        chai.expect(res).to.be.an('object');
                        chai.expect(res.body).to.be.an('object');
                        chai.expect(res.body.statusCode).to.be.equal(401);
                        chai.expect(res.body.error).to.be.equal('Unauthorized');
                        chai.expect(res.body.message).to.be.an('string');

                        done();
                    });
            });

            it('should return status 404', (done) => {
                chai.request(app)
                    .delete('/albums/999999999')
                    .set('authorization', token)
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
