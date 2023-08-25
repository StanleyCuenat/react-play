import { observer } from "mobx-react-lite";
import { Post } from "../../../Repositories/Post";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCardItem = observer(({ post }: PostCardProps) => {
  return (
    <div>
      <Link to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
      </Link>
      <p>{post.body}</p>
    </div>
  );
});

export default PostCardItem;
