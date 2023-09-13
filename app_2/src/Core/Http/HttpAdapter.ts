import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { inject, injectable } from "inversify";
import { Config } from "../Config/Config";
import IOC_TYPE from "../Ioc/ioc.type";

@injectable()
export default class HttpAdapter {
  private _httpInstance: AxiosInstance;
  constructor(@inject(IOC_TYPE.Config) config: Config) {
    this._httpInstance = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 5000,
    });
    this._httpInstance.interceptors.request.use(
      this.interceptorRequestSuccess,
      this.interceptorRequestError
    );
    this._httpInstance.interceptors.response.use(
      this.interceptorResponseSuccess,
      this.interceptorResponseError
    );
  }

  private async interceptorResponseSuccess(
    response: AxiosResponse<Record<string, unknown>, InternalAxiosRequestConfig>
  ) {
    return response;
  }
  private async interceptorResponseError(
    error: AxiosError<Record<string, unknown>>
  ) {
    // add your main logic for handling UNAUTHENTICATED / NOT AUTHORIZED / MAINTENANCE ERROR code here
    return {
      data: error.response?.data || "Server error",
    };
  }

  private async interceptorRequestSuccess(config: InternalAxiosRequestConfig) {
    return config;
  }

  private async interceptorRequestError(error: unknown) {
    console.error(error);
    return error;
  }

  async get<T, Y>(endpoint: string, query?: Y) {
    return this._httpInstance.get<T>(endpoint, {
      params: query,
    });
  }
  async post<T, Y>(endpoint: string, body: Y) {
    return this._httpInstance.post<T>(endpoint, body);
  }

  async put<T, Y>(endpoint: string, body: Y) {
    return this._httpInstance.put<T>(endpoint, body);
  }

  async patch<T, Y>(endpoint: string, body: Y) {
    return this._httpInstance.patch<T>(endpoint, body);
  }

  async del<T>(endpoint: string) {
    return this._httpInstance.delete<T>(endpoint);
  }
}
