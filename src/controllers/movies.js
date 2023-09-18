const http2 = require('http2');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');
const BadRequestErr = require('../errors/bad-request-err');
const Movies = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
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

      if (err.name === 'ValidationError') {
        error = new BadRequestErr('Переданы некорректные данные');
      }

      next(error);
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Переданы не корректные данные');
      }
      return movie;
    })
    .then(async (movie) => {
      Movies.deleteOne({ _id: movie._id })
        .then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      let error = err;

      if (err.name === 'CastError') {
        error = new BadRequestErr('Переданы некорректные данные');
      }

      next(error);
    });
};
