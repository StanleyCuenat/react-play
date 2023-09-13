import { useEffect, useState } from "react";
import { useCase } from "./Hooks/useCase";
import { ListProductUseCase } from "../Modules/Product/Application/ListProducts";
import { IOC_USE_CASE_TYPE } from "../Core/Ioc/ioc.type";

function App() {
  const [count, setCount] = useState(0);
  const listProducts = useCase<ListProductUseCase>(
    IOC_USE_CASE_TYPE.ListProductUseCase
  );

  useEffect(() => {
    listProducts.invoke(1, 10);
  }, [listProducts]);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
