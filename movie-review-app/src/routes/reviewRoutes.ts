import express from 'express';
import { getReviews, addReview, updateReview, deleteReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/:movieId', getReviews);
router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
