import { observer } from "mobx-react-lite";
import { PostStore } from "../Store";
import { Link } from "react-router-dom";

interface PostListProps {
  postStore: PostStore;
}

const PostList = observer(({ postStore }: PostListProps) => {
  return (
    <div>
      {postStore.posts.map((post) => (
        <Link to={`/posts/${post.id}`}>{post.id}</Link>
      ))}
    </div>
  );
});

export default PostList;
