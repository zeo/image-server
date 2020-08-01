import Axios, { AxiosInstance } from "axios";

export default abstract class API {
  protected client: AxiosInstance;

  protected constructor() {
    this.client = Axios.create({
      withCredentials: true,
      baseURL: "https://image.test/api/",
    });
  }

  async get<T>(path: string) {
    return this.client.get<T>(path);
  }

  async post<T, D>(path: string, data?: D) {
    return this.client.post<T>(path, data);
  }

  async delete(path: string) {
    return this.client.delete(path);
  }
}
