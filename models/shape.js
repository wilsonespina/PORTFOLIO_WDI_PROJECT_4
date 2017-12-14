const mongoose = require('mongoose');

const shapeSchema = mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  image: { type: String, required: 'Image is required' }
});

shapeSchema.virtual('runs', {
  ref: 'Run',
  localField: '_id',
  foreignField: 'shape'
});


module.exports = mongoose.model('Shape', shapeSchema);
