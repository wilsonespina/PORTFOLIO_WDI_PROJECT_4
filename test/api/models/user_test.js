/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */

require('../helper');
const User = require('../../../models/user');

describe('User model tests', function() {

  it('should be invalid if username is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should have a function validatePassword', function(done) {
    const n = new User({
      username: 'wilson',
      email: 'wilson@g.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    expect(n.validatePassword).to.be.a('function');
    done();
  });
});
