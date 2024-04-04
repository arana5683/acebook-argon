import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users";
import { getPostsForUser } from "../../services/posts";
import { NavBar } from "../../components/NavBar";
import Post from "../../components/Post/Post";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            
            getUser(token)
            .then((data) => {
                setUser(data.user);
                localStorage.setItem("token", data.token);
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
            
            getPostsForUser(token)
            .then((data) => {
                setPosts(data.posts);
                localStorage.setItem("token", data.token)
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
        }}, [navigate])

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
    <h1>{user.firstName} {user.lastName}</h1>
    <h3>{user.email}</h3>
    <br></br>
    <img className="profilePicture"src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
    <h2>Your Activity</h2>
        <div className="feed" role="feed">
        {posts && posts.map((post) => (
            <Post post={post} key={post._id} />
        ))}
        </div>
    </>
    )
}