import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Provider } from "react-redux";
import { store } from "./Stores";
import { IocProvider, IocContainer } from "./Modules/Ioc";

function App() {
  return (
    <IocProvider container={IocContainer.getInstance()}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </IocProvider>
  );
}

export default App;
