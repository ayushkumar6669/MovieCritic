import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { Movie } from '../models/Movie';

// Fetch all reviews for a movie
export const getReviews = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();

    const movie = await Movie.findById(req.body.movieId);
    if (movie) {
      const reviews = await Review.find({ movieId: movie._id });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      movie.averageRating = avgRating;
      await movie.save();
    }

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReview) {
       res.status(404).json({ message: 'Review not found' });
       return;
    }

    const movie = await Movie.findById(updatedReview.movieId);
    if (movie) {
      const reviews = await Review.find({ movieId: updatedReview.movieId });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      movie.averageRating = avgRating;
      await movie.save();
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
       res.status(404).json({ message: 'Review not found' });
       return;
    }

    const movie = await Movie.findById(deletedReview.movieId);
    if (movie) {
      const reviews = await Review.find({ movieId: deletedReview.movieId });
      const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0; 
      movie.averageRating = avgRating;
      await movie.save();
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};
