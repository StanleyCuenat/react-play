import { createBrowserRouter } from "react-router-dom";
import PostList from "./Features/PostList/List";
import PostDetail from "./Features/PostDetail/Detail";
import MainLayout from "./Layouts/MainLayout";
import Error from "./Features/Error/Error";
import { postListLoader } from "./Features/PostList/Store";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";
import Login from "./Features/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "posts",
        element: <PostList />,
        loader: postListLoader,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/authentication",
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
