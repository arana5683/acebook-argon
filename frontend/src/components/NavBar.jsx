import { useNavigate } from "react-router-dom";
import { FeedPage } from "../pages/Feed/FeedPage";

export const NavBar = () => {
    const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
}
// feed page is our homepage
    return (
        <>
            <nav>
                <button onClick={FeedPage}>Homepage</button> 
                <button onClick={"profile"}>My Profile</button>
                <button onClick={logout}>Log Out</button>
            </nav>
        </>
    )};
