const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function strava(req, res, next) {
  return rp({
    method: 'POST',
    url: 'https://www.strava.com/oauth/token',
    qs: {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: req.body.code
    },
    json: true
  })
    .then(response => {
      const { athlete, access_token } = response;
      return User
        .findOne({ $or: [{ stravaId: athlete.id }, { email: athlete.email }] })
        .then((user) => {
          if(!user) {
            user = new User({
              username: `${athlete.firstname} ${athlete.lastname}`,
              image: athlete.profile
            });
          }

          user.stravaId = athlete.id;
          if(athlete.email) user.email = athlete.email;
          return user.save();
        })
        .then(user => {
          const payload = { userId: user.id };
          const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

          res.json({ message: `Welcome ${user.username}!`, token, access_token });
        });
    })
    .catch(next);
}

module.exports = { strava };
