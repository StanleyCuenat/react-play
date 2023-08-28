import PostCardItem from "./Components/PostCardItem";

import { useInjection } from "../../Modules/Ioc";
import { PostListStore } from "./PostList.store";
import { useAppDispatch, useAppSelector } from "../../Stores";
import { useCallback, useEffect, useState } from "react";

export default function PostList() {
  const postListStore = useInjection<PostListStore>(PostListStore);
  const postIds = useAppSelector(postListStore.getList());
  const canLoadMore = useAppSelector(postListStore.getCanLoadMore());
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchPost = useCallback(async () => {
    setLoading(true);
    await dispatch(postListStore.fetch());
    setLoading(false);
  }, [dispatch, postListStore]);

  useEffect(() => {
    if (postIds.length <= 0) {
      fetchPost();
    }
  }, [fetchPost, postIds]);

  return (
    <div>
      {postIds.map((postId) => (
        <PostCardItem postId={postId} key={postId} />
      ))}
      {loading === false && canLoadMore === true && (
        <button onClick={() => fetchPost()}>loadMore</button>
      )}
      {loading === true && <div>loading...</div>}
    </div>
  );
}
