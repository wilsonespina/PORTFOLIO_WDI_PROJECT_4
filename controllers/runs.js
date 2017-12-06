const Run = require('../models/run');
require('../models/shape');

function runsIndex(req, res, next) {
  Run
    .find()
    .populate('user shape comments.createdBy')
    .exec()
    .then(runs => res.json(runs))
    .catch(next);
}

function runsCreate(req, res) {
//inject neccessary info into req.body
  Run
    .create(req.body)
    .then(run => res.status(201).json(run))
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function runsShow(req, res) {
  Run
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      res.json(run);
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));

}

function runsUpdate(req, res) {

  Run
    .findById(req.params.id)
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      run = Object.assign(run, req.body);
      return run.save();
    })
    .then(run => res.json(run))
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function runsDelete(req, res) {
  Run
    .findById(req.params.id)
    .exec()
    .then((run) => {
      if(!run) return res.notFound();
      return run.remove();
    })
    .then(() => res.status(204).end())
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

module.exports = {
  index: runsIndex,
  create: runsCreate,
  show: runsShow,
  update: runsUpdate,
  delete: runsDelete
};
