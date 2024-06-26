import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import { NavBar } from "../../components/NavBar";
import PostForm from "../../components/Post/PostForm";
import { postNewPost } from "../../services/posts";
import { followUser, getFollowedUsers } from "../../services/users";


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      getFollowedUsers(token)
      .then((data) => {
        setFollowedUsers(data.users);
      });
    }
  }, [navigate]);


  const handleNewPost = async (formData) => {
    // formData = { message: 'some text', image: 'image.png' }

    console.log(formData)
      await postNewPost(token, formData);
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
      
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    
  }

  const handleFollow = async (targetId) => {
    try {
      const token = localStorage.getItem("token");
      await followUser(token, targetId);
      getFollowedUsers(token)
      .then((data) => {
        setFollowedUsers(data.users);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const filterPosts = (event) => {
    if (event.target.checked) {
      setPosts(posts.filter((post) => { return followedUsers.includes(post.userId) }));
    } else {
      getPosts(token)
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
    }
  }

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
    <div>
    <NavBar />
    </div>
    <PostForm handleNewPost={handleNewPost}/>
      <h2>Posts</h2>
      <div style={{textAlign:'left'}} className="filterCheckbox">
        <label>
        <input id="filter" type="checkbox" onClick={filterPosts}/>
        Only show posts from followed users
        </label>
      </div>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} token={token} followedUsers={followedUsers} handleFollow={handleFollow}/>
        ))}
      </div>
    </>
)};
