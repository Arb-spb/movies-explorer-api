const router = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { createMoviesValidate, deleteMoviesValidate } = require('../middlewares/validateCelebrate');

router.get('/', getMovies);
router.post('/', createMoviesValidate, createMovies);
router.delete('/:id', deleteMoviesValidate, deleteMovies);

module.exports = router;
