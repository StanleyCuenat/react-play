import IocProvider from "./Modules/Ioc/IocProvider";
import IocContainer from "./Modules/Ioc/ioc";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

function App() {
  return (
    <IocProvider container={IocContainer.getInstance()}>
      <RouterProvider router={router} />
    </IocProvider>
  );
}

export default App;
