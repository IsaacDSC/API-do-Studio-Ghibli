import { Request, Response } from 'express';
import { MoviesResolver } from '../../app/UseCases/movies';
const resolver = new MoviesResolver();
export class MoviesController {

  index(req: Request, res: Response) {
    return res.status(200).sendFile(__dirname + '/index.html');
  }

  async importFromData(req: Request, res: Response) {
    try {
      const { quantityMovies } = req.body;
      const numberImport = Number(quantityMovies) > 200 ? 200 : Number(quantityMovies);
      const data = await resolver.importMovies(numberImport)
      return res.status(201).send({ data });
    } catch (error) {
      res.status(500).send({ Error: 'Bad request' })
    }
  }

  async listMovies(req: Request, res: Response) {
    try {
      const { page } = req.params;
      const PerPage = Number(page) ?? 1;
      const movies = await resolver.listMovies(PerPage);
      return res.status(200).send({ data: movies })
    } catch (error) {
      res.status(500).send({ Error: 'Bad request' })
    }
  }
}