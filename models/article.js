const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_LINK } = require('../configuration/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: INVALID_LINK,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: INVALID_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

articleSchema.methods.omitPrivate = function omitPrivate() {
  const data = this.toObject();
  delete data.owner;
  delete data.__v;
  return data;
};

module.exports = mongoose.model('article', articleSchema);
