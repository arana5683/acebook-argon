import PostingUser from "./PostingUser";
import "./Post.css"
import LikeDisplay from "./LikeButton";
const Post = (props) => {
  return (
    <div className="Post">
      <PostingUser id="item-left" post={props.post}/>
      <article id="item-wide" className="testContent" data-post-id = {props.post._id} key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay  postId={props.post._id} id="item-right"/>
      
    </div>
  );
};

export default Post;
