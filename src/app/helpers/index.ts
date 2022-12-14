import axios, { AxiosRequestConfig } from 'axios';


export class RequestAPI {
  constructor(private readonly baseURL: string) {
    axios.defaults.baseURL = this.baseURL;
  }

  async execute(config: AxiosRequestConfig) {
    try {
      return await axios.request(config);
    } catch (error: any) {
      const ResponseError = error?.response ? error?.response : error;
      return ResponseError;
    }
  }

};