import ProductList from "../Pages/ProductList";
import ProductDetail from "../Pages/ProductDetail";
import { Route } from "wouter";
import { ROUTER_ENDPOINT } from "./Router.type";

export default function AppRouter() {
  return (
    <>
      <Route path={ROUTER_ENDPOINT.PRODUCTS()} component={ProductList} />
      <Route path={ROUTER_ENDPOINT.PRODUCT_DETAILS(":id")}>
        {(params: { id: string }) => <ProductDetail id={params.id} />}
      </Route>
      <Route component={ProductList} />
    </>
  );
}
