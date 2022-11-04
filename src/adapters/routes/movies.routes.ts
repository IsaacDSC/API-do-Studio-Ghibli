import { Router } from 'express';
const routes = Router();


import { MoviesController } from '../controllers/movies.controller';

const movies = new MoviesController();
routes.get('/', movies.index)


export default routes;