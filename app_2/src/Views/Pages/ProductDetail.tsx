import { useController } from "../Hooks/useController";
import ProductDetailController from "../../Modules/Product/Controller/ProductDetails.controller";
import { IOC_CONTROLLER_TYPE } from "../../Core/Ioc/ioc.type";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../Modules/Product/Domain/Product.model";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const controller = useController<ProductDetailController>(
    IOC_CONTROLLER_TYPE.ProductDetailController
  );
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    await controller.fetchProductDetail(id);
  }, [controller, id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    controller.connect(setLoading, setError, setProduct);
    return () => controller.disconnect();
  }, [controller]);

  if (error !== undefined) {
    return <p>error {error}</p>;
  }

  if (product === undefined || loading === true) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>{product.price} $</p>
    </div>
  );
}
