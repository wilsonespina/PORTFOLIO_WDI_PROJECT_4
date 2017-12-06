const Run = require('../models/run');
// require('../models/shape');

function runsIndex(req, res, next) {
  Run
    .find()
    .populate('user shape comments.createdBy')
    .exec()
    .then(runs => res.json(runs))
    .catch(next);
}

function runsCreate(req, res, next) {
//inject neccessary info into req.body
  Run
    .create(req.body)
    .then(run => res.status(201).json(run))
    .catch(next);
}

function runsShow(req, res, next) {
  Run
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      res.json(run);
    })
    .catch(next);

}

function runsUpdate(req, res, next) {

  Run
    .findById(req.params.id)
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      run = Object.assign(run, req.body);
      return run.save();
    })
    .then(run => res.json(run))
    .catch(next);
}

function runsDelete(req, res, next) {
  Run
    .findById(req.params.id)
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      return run.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: runsIndex,
  create: runsCreate,
  show: runsShow,
  update: runsUpdate,
  delete: runsDelete
};
