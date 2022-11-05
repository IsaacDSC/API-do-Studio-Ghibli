// require('events').EventEmitter.defaultMaxListeners = 11;
import express from 'express';
import cors from 'cors';
import routes from '../../routes/movies.routes';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.cors();
    this.setDefaultApp();
    this.routes();
  }

  private cors(): void {
    this.express.use(cors());
  }

  private setDefaultApp(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      res.redirect('/api/v1');
    })

    this.express.use('/api/v1', routes);
  }
}



export default new App().express;
