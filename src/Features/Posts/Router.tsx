import { Route, Routes } from "react-router-dom";
import PostList from "./List/List";
import PostDetail from "./Detail/Detail";
import useIocContainer from "../../Modules/Ioc";
import { PostStore } from "./Store";
import { useEffect } from "react";

export default function PostRouter() {
  const postStore = useIocContainer<PostStore>(PostStore);

  useEffect(() => {
    return () => console.log("clean up post router");
  }, []);

  useEffect(() => {
    postStore.loadPost();
  }, [postStore]);

  return (
    <Routes>
      <Route
        path="/"
        Component={() => <PostList postStore={postStore} />}
      ></Route>
      <Route path="/:id" Component={PostDetail}></Route>
    </Routes>
  );
}
