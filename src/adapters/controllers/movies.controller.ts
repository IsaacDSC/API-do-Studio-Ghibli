import {Request, Response} from 'express';

export class MoviesController {
  index(req:Request, res:Response){
    return res.status(200).send('ok');
  }
}