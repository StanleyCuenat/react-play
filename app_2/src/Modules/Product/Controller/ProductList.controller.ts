import { inject, injectable } from "inversify";
import { IOC_USE_CASE_TYPE } from "../../../Core/Ioc/ioc.type";
import { ListProductUseCase } from "../Application/ListProducts";
import { Product } from "../Domain/Product.model";

@injectable()
export default class ProductListController {
  private readonly _listProductUseCase: ListProductUseCase;
  private _productList: Record<string, Product> = {};
  private _pageNumber = 1;
  private _loading = false;
  private _canLoadMore = true;
  private PAGE_SIZE = 10;
  constructor(
    @inject(IOC_USE_CASE_TYPE.ListProductUseCase)
    listProductUseCase: ListProductUseCase
  ) {
    this._listProductUseCase = listProductUseCase;
  }

  private canFetch() {
    return this._canLoadMore && !this._loading;
  }

  async getProducts(): Promise<void> {
    if (!this.canFetch()) {
      return;
    }
    console.log(this._pageNumber);
    this._loading = true;
    const data = await this._listProductUseCase.invoke(
      this._pageNumber,
      this.PAGE_SIZE
    );
    this._loading = false;
    if (typeof data === "number") {
      console.log("an error happened on the server side");
      return;
    }
    if (data.length === 0) {
      this._canLoadMore = false;
    }
    this._pageNumber += 1;
    data.map((product) => (this._productList[product.id] = product));
    return;
  }

  getIds() {
    return Object.keys(this._productList);
  }

  getProduct(id: string) {
    return this._productList[id];
  }

  clear() {
    this._pageNumber = 1;
    this._productList = {};
  }

  getCanLoadMore() {
    return this._canLoadMore;
  }
}
