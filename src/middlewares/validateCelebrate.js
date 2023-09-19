const { Joi, celebrate } = require('celebrate');
const { REG_EXP_URL } = require('../constants');

const signupValidate = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  },
});

const signinValidate = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
});

const createMoviesValidate = celebrate({
  body: {
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(2000),
    image: Joi.string().required().regex(REG_EXP_URL),
    trailerLink: Joi.string().required().regex(REG_EXP_URL),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    thumbnail: Joi.string().required().regex(REG_EXP_URL),
    movieId: Joi.number().required(),
  },
});

const deleteMoviesValidate = celebrate({
  params: {
    id: Joi.string().length(24).hex().required(),
  },
});

const updateUserValidate = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  },
});

module.exports = {
  signupValidate,
  signinValidate,
  createMoviesValidate,
  deleteMoviesValidate,
  updateUserValidate,
};
