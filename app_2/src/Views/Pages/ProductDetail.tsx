import { useController } from "../Hooks/useController";
import ProductDetailController from "../../Modules/Product/Controller/ProductDetails.controller";
import { IOC_CONTROLLER_TYPE } from "../../Core/Ioc/ioc.type";
import { useCallback, useEffect, useState } from "react";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const controller = useController<ProductDetailController>(
    IOC_CONTROLLER_TYPE.ProductDetailController
  );
  const [product, setProduct] = useState(controller.getProduct());
  const [error, setError] = useState(controller.getError());

  const fetchProduct = useCallback(async () => {
    await controller.fetchProductDetail(id);
    setProduct(controller.getProduct());
    setError(controller.getError());
  }, [controller, id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (error !== undefined) {
    return <p>error {error}</p>;
  }

  if (product === undefined) {
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
