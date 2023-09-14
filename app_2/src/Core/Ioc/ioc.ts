import { Container } from "inversify";
import HttpAdapter from "../Http/HttpAdapter";
import LocalStorage from "../LocalStorage/LocalStorage";
import { ProductRepository } from "../../Modules/Product/Domain/Product.repository";
import { HttpProductRepository } from "../../Modules/Product/Infra/HttpProduct.repository";
import { ListProductUseCase } from "../../Modules/Product/Application/ListProducts";
import { Config } from "../Config/Config";
import IOC_TYPE from "./ioc.type";
import ProductListController from "../../Modules/Product/Controller/ProductList.controller";
import { ProductDetailUseCase } from "../../Modules/Product/Application/ProductDetails";
import ProductDetailController from "../../Modules/Product/Controller/ProductDetails.controller";

const IocContainer = (function () {
  let instance: Container | undefined;

  const initContainer = () => {
    const container = new Container();
    container.bind<Config>(IOC_TYPE.Config).to(Config).inSingletonScope();
    container
      .bind<HttpAdapter>(IOC_TYPE.HttpAdapter)
      .to(HttpAdapter)
      .inSingletonScope();
    container
      .bind<LocalStorage>(IOC_TYPE.LocalStorage)
      .to(LocalStorage)
      .inSingletonScope();
    container
      .bind<ProductRepository>(IOC_TYPE.ProductRepository)
      .to(HttpProductRepository)
      .inSingletonScope();
    container
      .bind<ListProductUseCase>(IOC_TYPE.ListProductUseCase)
      .to(ListProductUseCase);
    container
      .bind<ProductDetailUseCase>(IOC_TYPE.ProductDetailUseCase)
      .to(ProductDetailUseCase);
    container
      .bind<ProductListController>(IOC_TYPE.ProductListController)
      .to(ProductListController)
      .inSingletonScope();
    container
      .bind<ProductDetailController>(IOC_TYPE.ProductDetailController)
      .to(ProductDetailController);
    return container;
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = initContainer();
      }
      return instance;
    },
  };
})();

export default IocContainer;
