import { RepositoryResponse } from "../../../Core/Http/Http.interface";
import { Product } from "./Product.model";

export interface ProductRepository {
  get: (id: number) => Promise<RepositoryResponse<Product>>;
  list: (
    pageNumber: number,
    pageSize: number
  ) => Promise<RepositoryResponse<Product[]>>;
}
