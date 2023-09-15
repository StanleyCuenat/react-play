import { inject, injectable } from "inversify";
import { IOC_USE_CASE_TYPE } from "../../../Core/Ioc/ioc.type";
import { ProductDetailUseCase } from "../Application/ProductDetails";
import { Product } from "../Domain/Product.model";
import { Controller } from "../../../Core/Controller/Controller";
import { Callback, Presenter } from "../../../Core/Presenter/Presenter";

@injectable()
export default class ProductDetailController implements Controller {
  private _loading = new Presenter(false);
  private _error = new Presenter<number | undefined>(undefined);
  private _product = new Presenter<Product | undefined>(undefined);
  private readonly _productDetailUseCase: ProductDetailUseCase;
  constructor(
    @inject(IOC_USE_CASE_TYPE.ProductDetailUseCase)
    productDetailUseCase: ProductDetailUseCase
  ) {
    this._productDetailUseCase = productDetailUseCase;
  }

  connect(
    loading: Callback<boolean>,
    error: Callback<number | undefined>,
    product: Callback<Product | undefined>
  ): void {
    this._loading.setListener(loading);
    this._error.setListener(error);
    this._product.setListener(product);
  }

  disconnect(): void {
    this._loading.removeListener();
    this._error.removeListener();
    this._product.removeListener();
  }

  async fetchProductDetail(id: string) {
    this._loading.set(true);
    const data = await this._productDetailUseCase.invoke(id);
    this._loading.set(false);
    if (typeof data === "number") {
      this._error.set(data);
      return;
    }
    this._product.set(data);
  }
}
