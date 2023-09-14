import { Link } from "wouter";
import { Product } from "../../../Modules/Product/Domain/Product.model";
import { ROUTER_ENDPOINT } from "../../Router/Router.type";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div>
      <Link href={ROUTER_ENDPOINT.PRODUCT_DETAILS(product.id.toString())}>
        <h1>{product.title}</h1>
      </Link>
      <p>{product.description}</p>
    </div>
  );
}
