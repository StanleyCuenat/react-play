import { inject, injectable } from "inversify";
import { Product } from "../Domain/Product.model";
import { ProductRepository } from "../Domain/Product.repository";
import HttpAdapter from "../../../Core/Http/HttpAdapter";
import {
  RESPONSE_STATUS,
  RepositoryResponse,
} from "../../../Core/Http/Http.interface";
import { IOC_CORE_TYPE } from "../../../Core/Ioc/ioc.type";

@injectable()
export class HttpProductRepository implements ProductRepository {
  private readonly _httpAdapter: HttpAdapter;
  constructor(@inject(IOC_CORE_TYPE.HttpAdapter) httpAdapter: HttpAdapter) {
    this._httpAdapter = httpAdapter;
  }

  async get(id: string) {
    const result = await this._httpAdapter.get<Product, unknown>(
      `/products/${id}`
    );
    if (result.status >= 200 && result.status < 300) {
      const response: RepositoryResponse<Product> = {
        status: RESPONSE_STATUS.OK,
        httpStatus: result.status,
        data: result.data,
      };
      return response;
    }
    const response: RepositoryResponse<Product> = {
      status: RESPONSE_STATUS.KO,
      httpStatus: result.status,
    };
    return response;
  }

  async list(pageNumber: number, pageSize: number) {
    const _pageNumber = pageNumber >= 1 ? pageNumber : 0;
    const skip = (_pageNumber - 1) * pageSize;
    const result = await this._httpAdapter.get<
      { products: Product[] },
      { limit: number; skip: number }
    >("/products", { limit: pageSize, skip });
    if (result.status >= 200 && result.status < 300) {
      const response: RepositoryResponse<Product[]> = {
        status: RESPONSE_STATUS.OK,
        httpStatus: result.status,
        data: result.data.products,
      };
      return response;
    }
    const response: RepositoryResponse<Product[]> = {
      status: RESPONSE_STATUS.KO,
      httpStatus: result.status,
    };
    return response;
  }
}
