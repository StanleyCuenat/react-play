import { useCallback, useEffect, useState } from "react";
import { IOC_CONTROLLER_TYPE } from "../../Core/Ioc/ioc.type";
import ProductListController from "../../Modules/Product/Controller/ProductList.controller";
import { useController } from "../Hooks/useController";
import ProductListItem from "../Components/Product/ProductListItem";

export default function ProductList() {
  const controller = useController<ProductListController>(
    IOC_CONTROLLER_TYPE.ProductListController
  );
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(controller.getCanLoadMore());
  const [error, setError] = useState(controller.getError());
  const [products, setProducts] = useState<string[]>(controller.getIds());

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    await controller.getProducts();
    setProducts(controller.getIds());
    setCanLoadMore(controller.getCanLoadMore());
    setError(controller.getError());
    setLoading(false);
  }, [controller]);

  useEffect(() => {
    if (products.length <= 0) {
      fetchProduct();
    }
  }, [fetchProduct, products.length]);

  if (error !== undefined) {
    return <p>oops something wrong happen</p>;
  }

  if (loading && products.length === 0) {
    return <p>...loading...</p>;
  }

  return (
    <div>
      {products.map((productId) => (
        <ProductListItem
          key={productId}
          product={controller.getProduct(productId)}
        />
      ))}
      {!loading && canLoadMore && (
        <button onClick={fetchProduct}>load more</button>
      )}
      {loading && <p>loading...</p>}
    </div>
  );
}
