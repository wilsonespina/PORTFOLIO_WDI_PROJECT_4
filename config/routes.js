const router = require('express').Router();
const runs  = require('../controllers/runs');
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

router.route('/runs')
  .get(runs.index)
  .post(runs.create);

router.route('/runs/:id')
  .get(runs.show)
  .put(runs.update)
  .delete(runs.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// router.route('/oauth/github')
//   .post(oauth.github);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
