import { observer } from "mobx-react-lite";
import { PostListStore } from "./Store";
import PostCardItem from "./Components/PostCardItem";
import { action } from "mobx";
import { useInjection } from "../../Modules/Ioc";

const PostList = observer(() => {
  const postStore = useInjection<PostListStore>(PostListStore);

  return (
    <div>
      {postStore.posts.map((post) => (
        <PostCardItem post={post} key={post.id} />
      ))}
      {postStore.loading === false && postStore.canLoadMore === true && (
        <button onClick={action(() => postStore.loadPost())}>loadMore</button>
      )}
      {postStore.loading === true && <div>loading...</div>}
    </div>
  );
});
export default PostList;
