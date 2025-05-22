import db from '../db';
import { Movie } from '../models/movie.model';

export const getAllMovies = (): Movie[] => {
  return db.prepare('SELECT * FROM movies').all() as Movie[];
};

export const addMovie = (movie: Movie): number => {
  const stmt = db.prepare('INSERT INTO movies (title, director, year) VALUES (?, ?, ?)');
  const result = stmt.run(movie.title, movie.director, movie.year);
  return result.lastInsertRowid as number;
};
export const deleteMovie = (id: number): boolean => {
  const stmt = db.prepare('DELETE FROM movies WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
};
export const updateMovie = (id: number, movie: Movie): boolean => {
  const stmt = db.prepare('UPDATE movies SET title = ?, director = ?, year = ? WHERE id = ?');
  const result = stmt.run(movie.title, movie.director, movie.year, id);
  return result.changes > 0;
};
