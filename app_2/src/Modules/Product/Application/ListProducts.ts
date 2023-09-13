import { inject, injectable } from "inversify";
import { IOC_TYPE } from "../../../Core/Ioc/ioc";
import type { ProductRepository } from "../Domain/Product.repository";
import UseCase from "../../../Core/UseCase/UseCase.interface";
import { RESPONSE_STATUS } from "../../../Core/Http/Http.interface";

@injectable()
export class ListProductUseCase implements UseCase {
  private readonly _productRepository: ProductRepository;
  constructor(
    @inject(IOC_TYPE.ProductRepository) productRepository: ProductRepository
  ) {
    this._productRepository = productRepository;
  }

  async invoke(pageNumber: number, pageSize: number) {
    const response = await this._productRepository.list(pageNumber, pageSize);
    if (response.status === RESPONSE_STATUS.KO) {
      return response.httpStatus;
    }
    return response.data;
  }
}
