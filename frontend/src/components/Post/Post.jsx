import PostingUser from "./PostingUser";
import "./Post.css"
import LikeDisplay from "./LikeButton";
const Post = (props) => {
  return (
    <div className="Post">
      <PostingUser id="item-left" post={props.post}/>
      <article id="item-wide" className="testContent" key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay id="item-right"/>
      
    </div>
  );
};

export default Post;
