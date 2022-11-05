import { Router } from 'express';
const routes = Router();


import { MoviesController } from '../controllers/movies.controller';

const movies = new MoviesController();
routes.get('/', movies.index)
routes.post('/auto/import/movies', movies.importFromData)
routes.get('/movies/:page', movies.listMovies)


export default routes;