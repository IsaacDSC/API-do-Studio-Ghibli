import {
  MoviesRepositoryAPI,
  MoviesRepositoryDb,
  IMoviesService
} from '../interface/movies.interface';

export class MoviesService {
  constructor(
    private readonly DbRepository: MoviesRepositoryDb.Methods,
    private readonly ApiRepository: MoviesRepositoryAPI.Methods,
  ) {
    this.DbRepository = DbRepository;
    this.ApiRepository = ApiRepository;
  }

  async getAllMovies() {
    const ListMovies = await this.ApiRepository.findAll();
    return ListMovies;
  }

  async saveMovies() {
    // const saved = await this.DbRepository.createMany()
    // if (!saved) return { error: '' }
    // return saved;
  }

  async listMovies(data: IMoviesService.listMovies) {
    const movies = await this.DbRepository.findAll();
    return movies;
  }
}