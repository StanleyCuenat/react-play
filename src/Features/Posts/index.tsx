import { useCallback, useEffect, useState } from "react";
import useIocContainer from "../../Modules/Ioc";
import { PostRepository } from "../../Repositories/Post";

export default function PostRoot() {
  const postRepository = useIocContainer<PostRepository>(PostRepository);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getPosts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await postRepository.list();
    } catch (_) {
      setError(true);
    }
    setLoading(false);
  }, [postRepository]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading === true) {
    return <div>loading....</div>;
  }
  if (error === true) {
    return <div>An error happened</div>;
  }
  return <div>RESOURCES LOADED</div>;
}
