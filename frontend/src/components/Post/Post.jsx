import Comments from "../Comments/Comments.jsx";
import PostingUser from "./PostingUser";
import { useState } from "react";
import "./Post.css"

const Post = (props) => {
  const [showComments, setShowComments] = useState(false)
  


  return (
    <>
    <div className="Post">
      <PostingUser post={props.post}/>
      <article className="testContent" key={props.post._id}>{props.post.message}</article>
      <div>
        <button onClick={() => {
          setShowComments(!showComments)}}
            >Comments
        </button>
      </div>
    </div>
    {showComments && <Comments token={props.token} post={props.post} showComments={showComments}/>}
    </>
  );
};

export default Post;
