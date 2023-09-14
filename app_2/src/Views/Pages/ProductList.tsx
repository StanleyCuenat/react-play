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
  const [products, setProducts] = useState<string[]>([]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    await controller.getProducts();
    setProducts(controller.getIds());
    setCanLoadMore(controller.getCanLoadMore());
    setLoading(false);
  }, [controller]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading && products.length === 0) {
    return <p>...loading...</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductListItem
          key={controller.getProduct(product).id}
          product={controller.getProduct(product)}
        />
      ))}
      {!loading && canLoadMore && (
        <button onClick={fetchProduct}>load more</button>
      )}
      {loading && <p>loading...</p>}
    </div>
  );
}
