// src/routes/movie.routes.ts
import { Router } from 'express';
import {
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie
} from '../controllers/movie.controller';
// import MovieController from '../controllers/movie.controller_old2';
// const router = Router();

// router.get('/', MovieController.getAllMovies);
// router.post('/', MovieController.addMovie);
// router.delete('/:id', MovieController.deleteMovie);
// router.put('/:id', MovieController.updateMovie);
const router = Router();
router.get('/', getAllMovies);
router.post('/', addMovie);
router.delete('/:id',deleteMovie);
router.put('/:id', updateMovie);
export default router;
