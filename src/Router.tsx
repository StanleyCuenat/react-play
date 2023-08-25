import { createBrowserRouter } from "react-router-dom";
import PostList from "./Features/PostList/List";
import PostDetail from "./Features/PostDetail/Detail";
import MainLayout from "./Layouts/MainLayout";
import Error from "./Features/Error/Error";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";
import Login from "./Features/Authentication/Login";
import IocContainer from "./Modules/Ioc/ioc";
import { AuthStore } from "./Modules/Auth/AuthStore";

async function rootLoader() {
  const authStore = IocContainer.getInstance().get<AuthStore>(AuthStore);
  await authStore.authenticateFromLocaleStorage();
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        path: "posts",
        element: <PostList />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/authentication/",
    element: <AuthenticationLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
