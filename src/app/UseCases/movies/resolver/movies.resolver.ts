import { MoviesRepository } from '../repository/movies.repository';
import { MoviesService } from '../service/movies.service';

namespace MoviesResolver {
  export interface listMovies {
    page: number;
  }
}

export class MoviesResolver {

  private service = new MoviesService(
    new MoviesRepository(),
  );

  async importMovies(quantityImport: number) {
    const movies = await this.service.getAllMovies(quantityImport);
    if (!movies) return { error: 'NOT_FOUND_MOVIES' }
    const { data, status } = movies;
    if (status != 200) return { error: 'API_NOT_RESPONSE' }
    const listMoviesTransformed = this.service.transformMovie(data);
    if (!listMoviesTransformed) return { error: 'NOT_FOUND_MOVIES' }
    const CountRowAffect = await this.service.saveMovies(listMoviesTransformed)
    return {
      quantitySolicited: quantityImport,
      quantityReturnAPI: data.length,
      quantitySaveMovies: CountRowAffect,
    }
  }

  async listMovies(page: number) {
    const movies = await this.service.listMovies({ page });
    if (!movies) return { error: 'NOT_FOUND_MOVIES' }
    return movies;
  }
}