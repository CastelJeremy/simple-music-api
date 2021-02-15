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
        it('should insert and return an album', (done) => {
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
        it('should insert and return an song', (done) => {
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
                                .end();
                            
                            chai.request(app)
                                .delete('/albums/' + res.body.album.id)
                                .end();
                        });
                });
        });
    });
});
