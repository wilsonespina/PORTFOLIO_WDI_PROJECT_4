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
      console.log('run pre save', run);
      if(!run) return res.notFound();
      for (const field in req.body) {
        run[field] = req.body[field];
      }
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

function createRating(req, res, next) {
  req.body.createdBy = req.currentUser.id;

  console.log('THIS IS REQ BODY AFTER MANAGE', req.body);

  Run
    .findById(req.params.id)
    .exec()
    .then(run => {
      if (!run) return res.notFound();

      const rating = run.ratings.find(rating => `${rating.createdBy}` === `${req.currentUser.id}`);

      if (!rating) {
        run.ratings.push(req.body);
        run.save();
        return res.status(201).json(run);
      } else {
        return res.status(500).json({message: 'You cannot rate things twice !!!!!!'});
      }
    })
    .catch(next);
}

// function saveRating(req, res, next) {
//
// }

module.exports = {
  index: runsIndex,
  create: runsCreate,
  show: runsShow,
  update: runsUpdate,
  delete: runsDelete,
  createComment,
  deleteComment,
  createRating
};
