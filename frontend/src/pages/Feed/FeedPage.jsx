import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import { NavBar } from "../../components/NavBar";
import PostForm from "../../components/Post/PostForm";
import { postNewPost } from "../../services/posts";


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
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

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
    <NavBar />
    <PostForm handleNewPost={handleNewPost}/>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
        
      
    </>
)};
