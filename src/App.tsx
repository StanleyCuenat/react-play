import "./App.css";
import IocProvider from "./Modules/Ioc/IocProvider";
import IocContainer from "./Modules/Ioc/ioc";
import PostRouter from "./Features/Posts/Router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./Features/Users/Router";

function App() {
  return (
    <IocProvider container={IocContainer.getInstance()}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/posts/*" Component={PostRouter} />
          <Route path="/users/*" Component={UserRouter} />
        </Routes>
      </BrowserRouter>
    </IocProvider>
  );
}

export default App;
