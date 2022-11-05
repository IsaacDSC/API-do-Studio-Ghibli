import axios from 'axios';
import { MoviesRepository } from '../repository/movies.repository';
import { MoviesRepositoryAPI } from '../interface/movies.interface';

const port = 3000;
const host = `http://localhost:` + port;


describe('testing end 2 end movies', () => {
  let listMovies: MoviesRepositoryAPI.IReturnGetAllMovies['data'];
  let repository: MoviesRepository;

  beforeAll(() => {
    repository = new MoviesRepository();
    axios.defaults.baseURL = host;
  });

  it('should be return 200 images from external api', async () => {
    const movies = await repository.getAllMovies(200);
    if (!movies) return expect(!!movies).toBeTruthy();
    const { data, status } = movies;
    console.log(data.length);
    // console.log(data);
    expect(!!data).toBeTruthy();
    listMovies = data;
    expect(listMovies).toBe(data);
    expect(data.length == 22).toBeTruthy();
    expect(status).toBe(200);
  });

  it('should be saved images bulk', async () => {
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
    const created = await repository.createManyDb(transformMovies)
    expect(created.count).toBe(transformMovies.length);
    expect(!!created).toBeTruthy();
  });

  it('should be list off set products', async () => {
    const page = 2;
    const limit = 5;
    const response = await repository.findAllDbLimit(page, limit);
    console.log(response);
    expect(!!response).toBeTruthy();
    expect(response.length).toBe(limit);
  });

  it('should be delete all images bulk test', async () => {
    const listDeleted = await Promise.all(listMovies.map(async (movie, index) => {
      const { id } = movie;
      const deleted = await repository.deleteDb(id);
      expect(id).toBe(listMovies[index].id);
      return deleted
    }));
    console.log({ listDeletedOFSize: listDeleted.length });
    expect(listDeleted.length).toBe(listMovies.length);
  });

});

