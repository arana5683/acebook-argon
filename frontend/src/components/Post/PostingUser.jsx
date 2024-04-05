import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./PostingUser.css"
import { useEffect, useState } from "react";

const PostingUser = (props) => {
  const [ following, setFollowing ] = useState(false);

  useEffect(() => {
    try {
      if (props.followedUsers.includes(props.post.userId)) {
        setFollowing(true);
      }
      else {
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
    <div className="followButton">
      <button>
      <FontAwesomeIcon className="follow" onClick={handleFollowUser} 
      icon={following ? faUserMinus : faUserPlus} 
      color={following ? 'grey' : 'blue'}
      title={following ? 'Unfollow user' : 'Follow user'}/>
      </button>
    </div>
    </div>
  );
};

export default PostingUser;
