import Comments from "../Comments/Comments.jsx";
import PostingUser from "./PostingUser";
import { useState } from "react";
import "./Post.css"
import LikeDisplay from "./LikeButton";
const Post = (props) => {
  const [showComments, setShowComments] = useState(false)
  
  return (
    <>
    <div className="Post">
      <PostingUser id="item-left" post={props.post}/>
      <article id="item-wide" className="testContent" key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay  id="item-right"/>
      
      <div>
        <button onClick={() => {
          setShowComments(!showComments)}}
            >Comments
        </button>
      </div>
    </div>
    {showComments && <Comments token={props.token} parent={props.post} showComments={showComments}/>}
    </>
  );
};

export default Post;
