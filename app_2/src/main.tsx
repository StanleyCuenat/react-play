import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Views/App.tsx";
import "./Shared/index.css";
import "./Shared/App.css";
import IocProvider from "./Views/Providers/IocProvider.tsx";
import IocContainer from "./Core/Ioc/ioc.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IocProvider container={IocContainer.getInstance()}>
      <App />
    </IocProvider>
  </React.StrictMode>
);
