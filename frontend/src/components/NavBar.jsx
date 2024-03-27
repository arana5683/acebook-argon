import { useNavigate } from "react-router-dom";
import { FeedPage } from "../pages/Feed/FeedPage";

export const NavBar = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/posts");
    };
    const goProfile = () => {
        navigate("/profile");
    };
    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    };
// feed page is our homepage
    return (
        <>
            <nav>
                <button onClick={goHome}>Homepage</button> 
                <button onClick={goProfile}>My Profile</button>
                <button onClick={logout}>Log Out</button>
            </nav>
        </>
    )};
