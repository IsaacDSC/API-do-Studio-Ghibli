export namespace IMoviesService {
  export interface IReturnGetAllMovies {
    data: DataMovies[],
    status: number;
  }
  export interface DataMovies {
    id?: string
    title: string
    original_title: string
    description: string
    release_date: string
    rt_score: string
    error?: string
  }
  export interface IReturnTransformMovie {
    id?: string;
    title: string;
    originalTitle: string;
    description: string;
    releaseDate: string;
    score: number;
  }
  export interface listMovies {
    page: number;
  }
}

export namespace MoviesRepositoryDb {
  export interface Methods {
    getAllMovies(limit: number): Promise<any>
    findAllDbLimit(page: number, limit: number): Promise<any>
    findAllDb(): Promise<any>
    createManyDb(data: ICreateMovies[]): Promise<any>
    deleteDb(id: string): Promise<any>
  }
  export interface listMovies {
    page: number;
  }
  export interface ICreateMovies {
    id?: string;
    title: string;
    originalTitle: string;
    description: string;
    releaseDate: string;
    score: number;
  }
}

export namespace MoviesRepositoryAPI {
  export interface Methods {
    getAllMovies(limit: number | string): Promise<any>
  }

  interface DataMovies {
    id: string
    title: string
    original_title: string
    description: string
    release_date: string
    rt_score: string
  }
  export interface IReturnGetAllMovies {
    data: DataMovies[];
    status: number;
  }
}