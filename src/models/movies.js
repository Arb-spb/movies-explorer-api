const mongoose = require('mongoose');
const { REG_EXP_URL } = require('../constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return REG_EXP_URL.test(v);
      },
      message: (props) => `${props.value} is not a valid image!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return REG_EXP_URL.test(v);
      },
      message: (props) => `${props.value} is not a valid trailerLink!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return REG_EXP_URL.test(v);
      },
      message: (props) => `${props.value} is not a valid thumbnail!`,
    },
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'users',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
