import { Link } from "react-router-dom";
import { useInjection } from "../../../Modules/Ioc";
import { useAppSelector } from "../../../Stores";
import { PostStore } from "../../../Stores/Post.store";

interface PostCardProps {
  postId: number;
}

export default function PostCardItem({ postId }: PostCardProps) {
  const postStore = useInjection<PostStore>(PostStore);
  const post = useAppSelector(postStore.getPost(postId));
  return (
    <div>
      <Link to={`/posts/${post.id}`}>
        <h1 className="text-3xl font-bold underline">{post.title}</h1>
      </Link>
      <p>{post.body}</p>
    </div>
  );
}
