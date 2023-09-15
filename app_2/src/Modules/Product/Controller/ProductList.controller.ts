import { inject, injectable } from "inversify";
import { IOC_USE_CASE_TYPE } from "../../../Core/Ioc/ioc.type";
import { ListProductUseCase } from "../Application/ListProducts";
import { Product } from "../Domain/Product.model";
import { Callback, Presenter } from "../../../Core/Presenter/Presenter";
import { Controller } from "../../../Core/Controller/Controller";

@injectable()
export default class ProductListController implements Controller {
  private readonly _listProductUseCase: ListProductUseCase;
  private _productList = new Presenter<Product[]>([]);
  private _pageNumber = 1;
  private _loading = new Presenter(false);
  private _canLoadMore = new Presenter(true);
  private _error = new Presenter<number | undefined>(undefined);
  private PAGE_SIZE = 10;
  constructor(
    @inject(IOC_USE_CASE_TYPE.ListProductUseCase)
    listProductUseCase: ListProductUseCase
  ) {
    this._listProductUseCase = listProductUseCase;
    this.getProducts();
  }

  private canFetch() {
    return this._canLoadMore.get() && !this._loading.get();
  }

  connect(
    canLoadMore: Callback<boolean>,
    loading: Callback<boolean>,
    products: Callback<Product[]>,
    error: Callback<number | undefined>
  ) {
    this._canLoadMore.setListener(canLoadMore);
    this._loading.setListener(loading);
    this._productList.setListener(products);
    this._error.setListener(error);
  }

  disconnect() {
    this._error.removeListener();
    this._productList.removeListener();
    this._loading.removeListener();
    this._canLoadMore.removeListener();
  }

  async getProducts(): Promise<void> {
    if (!this.canFetch()) {
      return;
    }
    console.log(this._pageNumber);
    this._loading.set(true);
    const data = await this._listProductUseCase.invoke(
      this._pageNumber,
      this.PAGE_SIZE
    );
    this._loading.set(false);
    if (typeof data === "number") {
      this._error.set(data);
      return;
    }
    if (data.length === 0) {
      this._canLoadMore.set(false);
      return;
    }
    this._pageNumber += 1;
    this._productList.set(this._productList.get().concat(data));
    return;
  }
}
