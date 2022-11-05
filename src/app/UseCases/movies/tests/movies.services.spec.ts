import { MoviesRepository } from '../repository/movies.repository';
import { IMoviesService } from '../interface/movies.interface';
import { MoviesService } from '../service/movies.service';

describe('testing end 2 end movies', () => {
  let listMovies: IMoviesService.IReturnGetAllMovies['data'];
  let moviesTransformed: IMoviesService.IReturnTransformMovie[];
  let service: MoviesService;

  beforeAll(() => {
    service = new MoviesService(
      new MoviesRepository(),
    );
  });

  it('should be return 200 images from external api', async () => {
    const movies = await service.getAllMovies(200);
    if (!movies) throw new Error('NOT_FOUND_MOVIES')
    const { data, status } = movies;
    expect(status).toBe(200);
    expect(!!data).toBeTruthy();
    expect(data.length == 22).toBeTruthy();
    listMovies = data;
    expect(listMovies).toBe(data);
    console.log(data.length);
  });

  it('should be transform data movies from save database', async () => {
    const listMoviesTransformed = await service.transformMovie(listMovies);
    if (!listMoviesTransformed) throw new Error('NOT_TRANSFORMED_MOVIES')
    expect(!!listMoviesTransformed).toBeTruthy();
    expect(listMoviesTransformed.length == listMovies.length).toBeTruthy();
    moviesTransformed = listMoviesTransformed;
    expect(moviesTransformed).toBe(listMoviesTransformed);
    console.log(listMoviesTransformed.length);
  })

  it('should be saved images bulk', async () => {
    const CountRowAffect = await service.saveMovies(moviesTransformed)
    expect(moviesTransformed.length > 0).toBeTruthy();
    expect(CountRowAffect).toBe(moviesTransformed.length);
  });

  it('should be list off set products', async () => {
    const page = 2;
    const limitedInService = 5
    const response = await service.listMovies({ page });
    console.log(response.length);
    expect(!!response).toBeTruthy();
    expect(response.length).toBe(limitedInService);
  });

  it('should be delete all images test', async () => {
    const repository = new MoviesRepository();
    const listDeleted = await Promise.all(moviesTransformed.map(async (movie, index) => {
      const { id } = movie;
      if (!id) return null;
      const deleted = await repository.deleteDb(id);
      expect(id).toBe(listMovies[index].id);
      return deleted
    }));
    console.log({ listDeletedOFSize: listDeleted.length });
    expect(listDeleted.length).toBe(listMovies.length);
  });

});

