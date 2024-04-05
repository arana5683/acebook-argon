import "./PostingUser.css"
import { useEffect, useState } from "react";

const PostingUser = (props) => {
  const [ following, setFollowing ] = useState(false);
  // const [ self, setSelf ] = useState(false);

  useEffect(() => {
    try {
      if (props.followedUsers.includes(props.post.userId)) {
        console.log("setting following to true")
        setFollowing(true);
      }
      else {
        console.log("setting following to false")
        setFollowing(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.post.userId, props.followedUsers]);

  const handleFollowUser = async () => {
    await props.handleFollow(props.post.userId);
  }
  
  return (
    <div className="PostingUser">
    <div className="name">{props.post.firstName} {props.post.lastName}</div>
    <img className="profilePicture"src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
    <div className="followButton"><button onClick={ handleFollowUser }>{following ? "Unfollow" : "Follow" }</button></div>
    </div>
  );
};

export default PostingUser;
