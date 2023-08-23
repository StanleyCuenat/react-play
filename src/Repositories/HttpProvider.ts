import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { inject, injectable } from "inversify";
import Config from "../Modules/Config";

export interface HttpProviderResponseFail {
  success: false;
  status: number;
  error?: string | Record<string, unknown>;
}

export interface HttpProviderResponseSuccess<T> {
  success: true;
  status: number;
  data: T;
}

export type HttpProviderResponse<T> =
  | HttpProviderResponseSuccess<T>
  | HttpProviderResponseFail;

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
  ): Promise<AxiosResponse<HttpProviderResponse<unknown>>> {
    const success = response.status >= 200 && response.status < 300;
    return {
      ...response,
      data: {
        success,
        status: response.status,
        data: response.data,
      },
    };
  }
  private async interceptorResponseError(
    error: AxiosError<Record<string, unknown>>
  ): Promise<HttpProviderResponse<unknown>> {
    return {
      success: false,
      status: error.response?.status || 500,
      error: error.response?.data || "Server error",
    };
  }

  private async interceptorRequestSuccess(config: InternalAxiosRequestConfig) {
    return config;
  }

  private async interceptorRequestError(error: unknown) {
    console.error(error);
    return error;
  }

  async get<T>(
    endpoint: string,
    query?: Record<string, unknown>
  ): Promise<HttpProviderResponse<T>> {
    return this._httpInstance.get(endpoint, {
      params: query,
    });
  }
  async post<T, Y>(
    endpoint: string,
    body: Y
  ): Promise<HttpProviderResponse<T>> {
    return this._httpInstance.post(endpoint, body);
  }

  async put<T, Y>(endpoint: string, body: Y): Promise<HttpProviderResponse<T>> {
    return this._httpInstance.put(endpoint, body);
  }

  async patch<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<HttpProviderResponse<T>> {
    return this._httpInstance.patch(endpoint, body);
  }

  async del<T>(endpoint: string): Promise<HttpProviderResponse<T>> {
    return this._httpInstance.delete(endpoint);
  }
}
