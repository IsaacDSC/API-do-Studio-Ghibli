import axios from 'axios';
import { MoviesRepository } from '../repository/movies.repository';

const port = 3000;
const host = `http://localhost:` + port;


describe('test end 2 end, movies application', () => {
  let sizeImport: any;
  beforeAll(() => {
    axios.defaults.baseURL = host;
  });

  it('should be return number solicited import and imported from database', async () => {
    const url = 'api/v1/auto/import/movies';
    sizeImport = 12
    const body = { "quantityMovies": sizeImport };
    const { data, status } = await axios.post(url, body);
    console.log(data);
    expect(!!data).toBeTruthy();
    expect(status).toBe(201);
  });

  it('should be return list movies', async () => {
    const url = 'api/v1/movies/3';
    const { data, status } = await axios.get(url);
    console.log(data);
    expect(!!data).toBeTruthy();
    expect(status).toBe(200);
    expect(data.data.length).toBe(2);
  });

  afterAll(async () => {
    const repository = new MoviesRepository();
    const movies = await repository.findAllDb();
    const listDeleted = await Promise.all(movies.map(async (movie:any) => {
      const { id } = movie;
      const deleted = await repository.deleteDb(id);
      return deleted
    }));
    expect(listDeleted.length).toBe(sizeImport);
  })

});