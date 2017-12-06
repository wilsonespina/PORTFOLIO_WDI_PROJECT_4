/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */

require('../helper');

const Run = require('../../../models/run');
// const User = require('../../../models/user');

describe('Restful routes tests', () => {

  beforeEach(done => {
    Run.collection.remove();
    done();
  });

  afterEach(done => {
    Run.collection.remove();
    done();
  });

  describe('GET /api/runs', () => {

    beforeEach(done => {
      Run.create({
        location: 'Brixton Acdemy',
        image: 'http://fillmuray.com/300/301',
        comments: {
          content: 'That was great'
        }
      })
        .then(() => done())
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/runs')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should respond with a JSON object', done => {
      api
        .get('/api/runs')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array of runs', done => {
      api
        .get('/api/runs')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of objects', done => {
      api.get('/api/runs')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'comments',
              'id'
            ]);
          done();
        });
    });

    it('run objects should have properties: comments, id etc', done => {
      api.get('/api/runs')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const firstUser = res.body[0];

          // expect(firstUser)
          //   .to.have.property('user')
          //   .and.to.be.a('object');
          //
          // expect(firstUser)
          //   .to.have.property('rating')
          //   .and.to.be.a('number');
          //
          // expect(firstUser)
          //   .to.have.property('date')
          //   .and.to.be.a('date');
          //
          // expect(firstUser)
          //   .to.have.property('shape')
          //   .and.to.be.a('string');

          expect(firstUser)
            .to.have.property('id')
            .and.to.be.a('string');

          expect(firstUser)
            .to.have.property('comments')
            .and.to.be.a('array');

          done();
        });
    });

  });
  xdescribe('POST /api/runs', () => {

    xit('should return a 201 response', done => {
      api
        .post('/api/runs')
        .set('Accept', 'application/json')
        .send({
          user: 'Wilson Espina',
          rating: 3,
          date: '2017-12-13T18:00:00Z',
          shape: 'Horse',
          comments: [{
            content: 'Brill',
            createdBy: 'Billy'
          }]
        })
        .expect(201, done);
    });

    xit('should return a 200 response', done => {
      api
        .get('/api/runs')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    xit('should return an array of runs', done => {
      api
        .get('/api/runs')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
