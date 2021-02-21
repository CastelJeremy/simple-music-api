import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../app.js';

chai.use(chaiHttp);

describe('Routes `/login`', function () {
    describe('POST', function () {
        it('should return an object', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'demo_username', password: 'demo_password' })
                .end((err, res) => {
                    if (err) done(err);

                    chai.expect(res).to.have.status(200);
                    chai.expect(res).to.be.an('object');
                    chai.expect(res.body).to.be.an('object');
                    chai.expect(res.body['access-token']).to.be.an('string');

                    done();
                });
        });

        it('should return status 400', (done) => {
            chai.request(app)
                .post('/login')
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
