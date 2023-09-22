const http2 = require('http2');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');
const BadRequestErr = require('../errors/bad-request-err');
const Movies = require('../models/movies');
const {
  FORBIDDEN_ERROR_TEXT,
  MOVIE_ID_NOT_FOUND_ERROR_TEXT,
  BAD_REQUEST,
  VALIDATION_ERROR,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res
      .status(http2.constants.HTTP_STATUS_OK)
      .send({ data: movies }))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res
      .status(http2.constants.HTTP_STATUS_CREATED)
      .send({ data: movie }))
    .catch((err) => {
      let error = err;

      if (err.name === VALIDATION_ERROR) {
        error = new BadRequestErr(BAD_REQUEST);
      }

      next(error);
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_ID_NOT_FOUND_ERROR_TEXT);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenErr(FORBIDDEN_ERROR_TEXT);
      }

      return Movies.findByIdAndDelete(req.params.movieId)
        .then((deletedMovie) => res
          .status(http2.constants.HTTP_STATUS_OK)
          .send(deletedMovie));
    })
    .catch(next);
};
