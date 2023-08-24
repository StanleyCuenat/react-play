import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

const PostDetail = observer(() => {
  const location = useLocation();
  console.log(location.state);
  return <div></div>;
});

export default PostDetail;
