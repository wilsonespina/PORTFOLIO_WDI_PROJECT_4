const Run = require('../models/run');

function runsIndex(req, res, next) {
  Run
    .find()
    .populate('user shape comments.createdBy')
    .exec()
    .then(runs => res.json(runs))
    .catch(next);
}

function runsCreate(req, res, next) {
  req.body.user = req.currentUser._id;

  Run
    .create(req.body)
    .then(run => res.status(201).json(run))
    .catch(next);
}

function runsShow(req, res, next) {
  Run
    .findById(req.params.id)
    .populate('user shape comments.createdBy')
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

function createComment(req, res, next) {
  req.body.createdBy = req.currentUser;

  Run.findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(run => {
      if (!run) return res.notFound();
      console.log('this is the current run', req.run);
      run.comments.push(req.body);
      return run.save();
    })
    .then(run => res.status(201).json(run))
    .catch(next);
}

function deleteComment(req, res, next) {
  Run.findById(req.params.id)
    .exec()
    .then(run => {
      if (!run) return res.notFound();
      const comment = run.comments.id(req.params.commentId);
      comment.remove();
      return run.save();
    })
    .then(run => res.status(200).json(run))
    .catch(next);
}

module.exports = {
  index: runsIndex,
  create: runsCreate,
  show: runsShow,
  update: runsUpdate,
  delete: runsDelete,
  createComment: createComment,
  deleteComment: deleteComment
};
