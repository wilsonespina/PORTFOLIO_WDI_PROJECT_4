const Shape = require('../models/shape');

function shapesIndex(req, res, next) {
  Shape
    .find()
    // .populate('user shape comments.createdBy')
    .exec()
    .then(shapes => res.json(shapes))
    .catch(next);
}

function shapesCreate(req, res, next) {
//inject neccessary info into req.body
  Shape
    .create(req.body)
    .then(shape => res.status(201).json(shape))
    .catch(next);
}

function shapesShow(req, res, next) {
  Shape
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then((shape) => {
      if(!shape) return res.notFound();
      res.json(shape);
    })
    .catch(next);

}

function shapesUpdate(req, res, next) {

  Shape
    .findById(req.params.id)
    .exec()
    .then((shape) => {
      if(!shape) return res.notFound();
      shape = Object.assign(shape, req.body);
      return shape.save();
    })
    .then(shape => res.json(shape))
    .catch(next);
}

function shapesDelete(req, res, next) {
  Shape
    .findById(req.params.id)
    .exec()
    .then((shape) => {
      if(!shape) return res.notFound();
      return shape.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: shapesIndex,
  create: shapesCreate,
  show: shapesShow,
  update: shapesUpdate,
  delete: shapesDelete
};
