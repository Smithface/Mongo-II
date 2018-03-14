const mongoose = require('mongoose');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.connect('mongodb://localhost/so-posts');

const PostSchema = new mongoose.Schema({
  // TODO: write your schema here
  soID: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  tags: [String],
  acceptedAnswerID: Number,
  user: {
    soUserID: Number,
    name: String,
    reputation: Number,
  },

});

module.exports = mongoose.model('Posts', PostSchema);
