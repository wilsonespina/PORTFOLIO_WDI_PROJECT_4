const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String },
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

//--------------*****------------------

const ratingSchema = new mongoose.Schema(
  {
    value: { type: Number },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }
);

// ratingSchema.methods.belongsTo = function ratingsBelongsTo(user) {
//   if (typeof this.createdBy.id === 'string')
//     return this.createdBy.id === user.id;
//   return user.id === this.createdBy.toString();
// };

//--------------*****------------------


const runSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  ratings: [ratingSchema],
  date: { type: String, trim: true },
  shape: { type: mongoose.Schema.ObjectId, ref: 'Shape' },
  start_latlng: { type: Array },
  summary_polyline: { type: String, trim: true },
  comments: [commentSchema]
},
{
  timestamps: true
});

runSchema
  .virtual('averageRating')
  .get(calculateRating);

module.exports = mongoose.model('Run', runSchema);

function calculateRating() {
  if (this.ratings.length === 0) return 'TBC';

  let sum = 0;
  const ratings = this.ratings.map(rating => {
    sum += rating.value;
    return rating.value;
  });

  return parseFloat( (sum/ratings.length).toFixed(1) );
}
