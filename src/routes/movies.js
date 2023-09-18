const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: {
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(2000),
    image: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
    trailerLink: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
    movieId: Joi.number().required(),
  },
}), createMovies);

router.delete('/:id', celebrate({
  params: {
    id: Joi.string().length(24).hex().required(),
  },
}), deleteMovies);

module.exports = router;
