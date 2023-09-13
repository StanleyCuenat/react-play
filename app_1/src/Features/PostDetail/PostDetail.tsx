import { useParams } from "react-router-dom";
import { useInjection } from "../../Modules/Ioc";
import { useAppSelector } from "../../Stores";
import { PostStore } from "../../Stores/Post.store";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postStore = useInjection<PostStore>(PostStore);
  const post = useAppSelector(postStore.getPost(parseInt(id!)));

  return (
    <div>
      <h3>{post.id}</h3>
      <p>{post.title}</p>
    </div>
  );
}
