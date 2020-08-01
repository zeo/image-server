import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class Http {
  protected client: AxiosInstance;

  /**
   * @method constructor
   */
  constructor() {
    this.client = Axios.create({
      baseURL: 'https://image.test/api/',
      withCredentials: true,
      validateStatus: (status: number) => {
        return status >= 200 && status < 300;
      },
    });

    let token = localStorage.getItem("token");
    if (token) {
      this.client.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  /**
   * @method setToken
   * @param {string} token
   */
  public setToken(token: string): void {
    this.client.defaults.headers["Authorization"] = "Bearer " + token;
    localStorage.setItem("token", token);
  }

  /**
   * @method get
   * @param {string} url
   * @param {object} [params]
   * @return {Promise<AxiosResponse>}
   */
  public async get<T>(
    url: string,
    params?: object
  ): Promise<AxiosResponse | void> {
    return this.client
      .get<T>(url, { params })
      .catch(this.handleHttpError);
  }

  /**
   * @method post
   * @param {string} url
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   */
  public async post<T>(url: string, data?: object): Promise<AxiosResponse | void> {
    return this.client.post<T>(url, data).catch(this.handleHttpError);
  }

  /**
   * @method get
   * @param {string} url
   * @return {Promise<AxiosResponse>}
   */
  public async delete(url: string): Promise<AxiosResponse | void> {
    return this.client.delete(url).catch(this.handleHttpError);
  }

  /**
   * @method get
   * @param {string} url
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   */
  public async put(url: string, data: object): Promise<AxiosResponse | void> {
    return this.client.put(url, data).catch(this.handleHttpError);
  }

  /**
   * @method get
   * @param {string} url
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   */
  public async patch(url: string, data: object): Promise<AxiosResponse | void> {
    return this.client.patch(url, data).catch(this.handleHttpError);
  }

  /**
   * @method handleHttpError
   * @param {AxiosError} e
   * @throws {AxiosError}
   */
  private handleHttpError(e: AxiosError): void {
    /*Sentry.withScope((scope) => {
      if (e.response !== undefined) {
        scope.setExtras(e.response);
      }

      Sentry.captureException(e);
    });
     */
    throw e;
  }
}

export default new Http();
