import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { inject, injectable } from "inversify";
import Config from "../Modules/Config";

@injectable()
export default class HttpProvider {
  private _httpInstance: AxiosInstance;
  constructor(@inject(Config) config: Config) {
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

  async get<T>(endpoint: string, query?: Record<string, unknown>) {
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

  async patch<T>(endpoint: string, body: Record<string, unknown>) {
    return this._httpInstance.patch<T>(endpoint, body);
  }

  async del<T>(endpoint: string) {
    return this._httpInstance.delete<T>(endpoint);
  }
}
