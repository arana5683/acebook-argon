import "./PostingUser.css"
import { followUser, isUserFollowed } from "../../services/users";
import { useEffect, useState } from "react";

const PostingUser = ({post}) => {
  const [ following, setFollowing ] = useState(false);
  const [ self, setSelf ] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const targetId = post.userId;
      isUserFollowed(token, targetId)
      .then((res) => {
        if (res.self)
          setSelf(true);
        else {
          setFollowing(res.followed);
          setSelf(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [post.userId]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      const targetId = post.userId;
      await followUser(token, targetId);
      setFollowing(!following);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="PostingUser">
    <div className="name">{post.firstName} {post.lastName}</div>
    <img className="profilePicture"src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
    <div className="followButton">{!self && <button onClick={ handleFollow }>{following ? "Unfollow" : "Follow" }</button>}</div>
    </div>
  );
};

export default PostingUser;
