import Comments from "../Comments/Comments.jsx";
import PostingUser from "./PostingUser";
import { useState } from "react";
import "./Post.css"
import LikeDisplay from "./LikeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {
  const [showComments, setShowComments] = useState(false)
  
  // need to reference the backend as this is where the uploads folder lives
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = `${BACKEND_URL}${props.post.image}`;

  return (
    <>
    <div className="Post">
      <PostingUser id="item-left" post={props.post} followedUsers={props.followedUsers} handleFollow={props.handleFollow}/>
      {props.post.image && (
        <img src={imageUrl} alt="Post Image" className="post-image" />
      )}
      <article id="item-wide" className="testContent" data-post-id = {props.post._id} key={props.post._id}>{props.post.message}</article> <br></br>
      <LikeDisplay  postId={props.post._id} id="item-right"/>
      <div>
        <button title="Comments" onClick={() => {
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
