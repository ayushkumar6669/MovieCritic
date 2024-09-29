import express from 'express';
import { getMovies, addMovie, getMovieByID, updateMovie, deleteMovie } from '../controllers/movieController';

const router = express.Router();

router.get('/', getMovies);
router.post('/', addMovie);
router.get('/:movieId', getMovieByID);
router.put('/:movieId', updateMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
