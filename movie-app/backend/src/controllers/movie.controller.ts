import { Request, Response } from 'express';
import { getAllMovies as getAllMoviesFromDB, 
         addMovie as addMovieToDB, 
         deleteMovie as deleteMovieFromDB,
         updateMovie as updateMovieInDB
} from '../services/movie.service'; // or wherever your db functions are


export const getAllMovies = (req: Request, res: Response) => {
  try {
    const movies = getAllMoviesFromDB();
    return res.json(movies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const addMovie = (req: Request, res: Response) => {
  try {
    const movie = req.body; // Make sure express.json() middleware is used

    // Validate input (optional)
    if (!movie.title || !movie.director || !movie.year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = addMovieToDB(movie);
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Error adding movie:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const deleteMovie = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const success = deleteMovieFromDB(id);
    if (success) {
      return res.json({ message: 'Movie deleted' });
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateMovie = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    const movie = req.body;
    if (!movie.title || !movie.director || !movie.year) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const success = updateMovieInDB(id, movie);
    if (success) {
      return res.json({ message: 'Movie updated' });
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
