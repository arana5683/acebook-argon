import Comments from "../Comments/Comments.jsx";
import PostingUser from "./PostingUser";
import { useState } from "react";
import "./Post.css"
import LikeDisplay from "./LikeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {
  const [showComments, setShowComments] = useState(false)
  
  return (
    <>
    <div className="Post">
      <PostingUser id="item-left" post={props.post} followedUsers={props.followedUsers} handleFollow={props.handleFollow}/>
      <article id="item-wide" className="testContent" key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay  id="item-right"/>
      <div>
        <button title="comments-button" onClick={() => {
          setShowComments(!showComments)}}
        ><FontAwesomeIcon icon={faComments} />
        </button>
      </div>
    </div>
    {showComments && <Comments token={props.token} parent={props.post} showComments={showComments}/>}
    </>
  );
};

export default Post;
