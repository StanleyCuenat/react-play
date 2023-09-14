import { inject, injectable } from "inversify";
import type { ProductRepository } from "../Domain/Product.repository";
import UseCase from "../../../Core/UseCase/UseCase.interface";
import { RESPONSE_STATUS } from "../../../Core/Http/Http.interface";
import IOC_TYPE from "../../../Core/Ioc/ioc.type";

@injectable()
export class ProductDetailUseCase implements UseCase {
  private readonly _productRepository: ProductRepository;
  constructor(
    @inject(IOC_TYPE.ProductRepository) productRepository: ProductRepository
  ) {
    this._productRepository = productRepository;
  }

  async invoke(id: string) {
    const response = await this._productRepository.get(id);
    if (response.status === RESPONSE_STATUS.KO) {
      return response.httpStatus;
    }
    return response.data;
  }
}
