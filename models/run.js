const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

commentSchema.methods.belongsTo = function commentsBelongsTo(user) {
  if (typeof this.createdBy.id === 'string')
    return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const runSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  rating: { type: Number, trim: true },
  date: { type: String, trim: true },
  shape: { type: mongoose.Schema.ObjectId, ref: 'Shape' },
  comments: [commentSchema]
});

module.exports = mongoose.model('Run', runSchema);
