import {
  MoviesRepositoryDb,
  IMoviesService
} from '../interface/movies.interface';

export class MoviesService {
  constructor(
    private readonly repository: MoviesRepositoryDb.Methods,
  ) {
    this.repository = repository;
  }

  async getAllMovies(limit: number): Promise<IMoviesService.IReturnGetAllMovies | null> {
    const limited = limit > 250 ? 250 : limit;
    const movies = await this.repository.getAllMovies(limited);
    if (!movies) return null;
    return movies;
  }

  async saveMovies(listMovies: IMoviesService.IReturnTransformMovie[]): Promise<number> {
    const created = await this.repository.createManyDb(listMovies)
    return created.count;
  }

  async listMovies(data: IMoviesService.listMovies): Promise<IMoviesService.IReturnTransformMovie[]> {
    const config = { page: data.page, limit: 5 }
    const movies = await this.repository.findAllDbLimit(config.page, config.limit);
    return movies;
  }

  transformMovie(listMovies: IMoviesService.DataMovies[]): IMoviesService.IReturnTransformMovie[] | null {
    try {
      const transformMovies = listMovies.map(movie => {
        return {
          id: movie.id,
          originalTitle: movie.original_title,
          title: movie.title,
          description: movie.description,
          releaseDate: movie.release_date,
          score: Number(movie.rt_score),
        }
      })
      return transformMovies;
    } catch (error) {
      return null;
    }
  }
}