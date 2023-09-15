import { useEffect, useState } from "react";
import { IOC_CONTROLLER_TYPE } from "../../Core/Ioc/ioc.type";
import ProductListController from "../../Modules/Product/Controller/ProductList.controller";
import { useController } from "../Hooks/useController";
import ProductListItem from "../Components/Product/ProductListItem";
import { Product } from "../../Modules/Product/Domain/Product.model";

export default function ProductList() {
  const controller = useController<ProductListController>(
    IOC_CONTROLLER_TYPE.ProductListController
  );
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [error, setError] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    controller.connect(setCanLoadMore, setLoading, setProducts, setError);

    return () => controller.disconnect();
  }, [controller]);

  if (error !== undefined) {
    return <p>oops something wrong happen</p>;
  }

  if (loading && products.length === 0) {
    return <p>...loading...</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
      {!loading && canLoadMore && (
        <button onClick={() => controller.getProducts()}>load more</button>
      )}
      {loading && <p>loading...</p>}
    </div>
  );
}
