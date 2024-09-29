import { Request, Response } from 'express';
import { Movie } from '../models/Movie';
import { Review } from '../models/Review';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie' });
  }
};

export const getMovieByID = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    
    try {
        const movie = await Movie.findById(movieId);

      
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  };

  export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
        if (!updatedMovie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie' });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        await Review.deleteMany({ movieId: movieId });
        
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie' });
    }
};
  
