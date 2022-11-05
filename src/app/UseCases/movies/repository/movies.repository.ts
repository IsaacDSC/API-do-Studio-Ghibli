import { MoviesRepositoryAPI, MoviesRepositoryDb } from '../interface/movies.interface';
import { RequestAPI } from '../../../helpers';
import { prisma } from '../../../../infra';

class RepositoryAPI implements MoviesRepositoryAPI.Methods {
  private requestAPI = new RequestAPI(
    'https://ghibliapi.herokuapp.com/'
  );
  async getAllMovies(limit: number | string): Promise<MoviesRepositoryAPI.IReturnGetAllMovies | null> {
    try {
      const { data, status } = await this.requestAPI.execute({
        baseURL: 'https://ghibliapi.herokuapp.com/',
        url: `films?fields=id,title,original_title,description,release_date,rt_score&limit=${limit}`,
        method: 'GET'
      });
      return { data, status }
    } catch (error) {
      console.log(error);
      return null
    }
  }
}

export class MoviesRepository extends RepositoryAPI implements MoviesRepositoryDb.Methods {
  async findAllDb(): Promise<any> {
    const movies = await prisma.movies.findMany();
    return movies;
  }

  async findAllDbLimit(page: number, limit: number) {
    try {
      const movies = await prisma.movies.findMany({
        orderBy: { releaseDate: 'asc' },
        skip: page <= 1 ? 0 : page * limit - limit,
        take: limit,
      })
      return movies;
    } catch (error) {
      console.log(error);
    }
  }

  async createManyDb(data: MoviesRepositoryDb.ICreateMovies[]) {
    const movies = await prisma.movies.createMany({
      data: [...data]
    })
    return movies;
  }

  async deleteDb(id: string) {
    const deleted = await prisma.movies.delete({
      where: { id }
    })
    return deleted;
  }
}


