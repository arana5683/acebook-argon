import PostingUser from "./PostingUser";
import "./Post.css"
import LikeDisplay from "./LikeButton";

const Post = (props) => {
  // need to reference the backend as this is where the uploads folder lives
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = `${BACKEND_URL}${props.post.image}`;

  return (
    <div className="Post">
      <PostingUser id="item-left" post={props.post}/>
      {props.post.image && (
        <img src={imageUrl} alt="Post Image" className="post-image" />
      )}
      <article id="item-wide" className="testContent" key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay  id="item-right"/>
      
    </div>
  );
};

export default Post;
