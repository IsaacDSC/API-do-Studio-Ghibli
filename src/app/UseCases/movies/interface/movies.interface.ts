export namespace IMoviesService {
  export interface listMovies {
    page: number;
  }
}

export namespace MoviesRepositoryDb {
  export interface Methods {
    findAll(): Promise<any>
    createMany(data: ICreateMovies): Promise<any>
  }
  export interface listMovies {
    page: number;
  }
  export interface ICreateMovies {
    title: string;
    originTitle: string;
    description: string;
    postingDate: string;
    note: string;

  }
}

export namespace MoviesRepositoryAPI {
  export interface Methods {
    findAll(): Promise<any>
  }
}