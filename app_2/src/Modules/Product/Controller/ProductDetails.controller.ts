import { inject, injectable } from "inversify";
import { IOC_USE_CASE_TYPE } from "../../../Core/Ioc/ioc.type";
import { ProductDetailUseCase } from "../Application/ProductDetails";
import { Product } from "../Domain/Product.model";

@injectable()
export default class ProductDetailController {
  private _loading = false;
  private _error: number | undefined = undefined;
  private _product: Product | undefined = undefined;
  private readonly _productDetailUseCase: ProductDetailUseCase;
  constructor(
    @inject(IOC_USE_CASE_TYPE.ProductDetailUseCase)
    productDetailUseCase: ProductDetailUseCase
  ) {
    this._productDetailUseCase = productDetailUseCase;
  }

  async fetchProductDetail(id: string) {
    this._loading = true;
    const data = await this._productDetailUseCase.invoke(id);
    this._loading = false;
    if (typeof data === "number") {
      this._error = data;
      return;
    }
    this._product = data;
  }

  getProduct() {
    return this._product;
  }

  getError() {
    return this._error;
  }

  getLoading() {
    return this._loading;
  }
}
