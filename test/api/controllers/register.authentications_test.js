/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../helper');
const User = require('../../../models/user');

describe('User register authentication', function() {
  beforeEach(done => {
    User.collection.remove();
    done();
  });

  describe('POST /api/register', function() {
    it('should register a user with the correct credentials', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@t.com',
          password: 'password',
          stavaId: '15637798'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Registration successful');
          done();
        });
    });
    it('should not register a user without an email', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          done();
        });
    });
    it('should not register a user without a password', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          done();
        });
    });
    it('should not register a user with no password confirmation', function(
      done
    ) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com',
            password: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unprocessable Entity');
          done();
        });
    });
  });
});
