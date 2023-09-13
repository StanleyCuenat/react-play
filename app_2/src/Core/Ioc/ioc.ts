import "reflect-metadata";
import { Container } from "inversify";
import HttpAdapter from "../Http/HttpAdapter";
import LocalStorage from "../LocalStorage/LocalStorage";
import { ProductRepository } from "../../Modules/Product/Domain/Product.repository";
import { HttpProductRepository } from "../../Modules/Product/Infra/HttpProduct.repository";
import { ListProductUseCase } from "../../Modules/Product/Application/ListProducts";
import { Config } from "../Config/Config";

const IOC_TYPE = {
  HttpAdapter: Symbol("HttpAdapter"),
  LocalStorage: Symbol("LocalStorage"),
  ProductRepository: Symbol("ProductRepository"),
  ListProductUseCase: Symbol("ListProductUseCase"),
  Config: Symbol("Config"),
};

const IocContainer = (function () {
  let instance: Container | undefined;

  const initContainer = () => {
    const container = new Container();
    container.bind<Config>(IOC_TYPE.Config).toSelf().inSingletonScope();
    container
      .bind<HttpAdapter>(IOC_TYPE.HttpAdapter)
      .toSelf()
      .inSingletonScope();
    container
      .bind<LocalStorage>(IOC_TYPE.LocalStorage)
      .toSelf()
      .inSingletonScope();
    container
      .bind<ProductRepository>(IOC_TYPE.ProductRepository)
      .to(HttpProductRepository);
    container.bind<ListProductUseCase>(IOC_TYPE.ListProductUseCase).toSelf();
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
export { IOC_TYPE };
