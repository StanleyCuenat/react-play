const IOC_CORE_TYPE = {
  HttpAdapter: Symbol("HttpAdapter"),
  LocalStorage: Symbol("LocalStorage"),
  ProductRepository: Symbol("ProductRepository"),
  ListProductUseCase: Symbol("ListProductUseCase"),
  Config: Symbol("Config"),
};

const IOC_USE_CASE_TYPE = {
  ListProductUseCase: Symbol("ListProductUseCase"),
};

const IOC_TYPE = {
  ...IOC_CORE_TYPE,
  ...IOC_USE_CASE_TYPE,
};

export { IOC_CORE_TYPE, IOC_USE_CASE_TYPE };
export default IOC_TYPE;
