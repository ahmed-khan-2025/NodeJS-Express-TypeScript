import express from 'express';
import movieRoutes from './routes/movie.routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '../../frontend', 'public')));
//console.log('[INFO] Serving frontend from:', path.join(__dirname, '../../frontend'));
app.use('/api/movies', movieRoutes);
//app.use('/', movieRoutes);

export default app;
