import { useNavigate } from "react-router-dom";
import "./Navbar.css"

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
    navigate("/");
    };
// feed page is our homepage
    return (
        <>
        <div id="navbar-div-container">
            <nav>
                <button onClick={goHome}>Homepage</button> 
                <button onClick={goProfile}>My Profile</button>
                <button onClick={logout}>Log Out</button>
            </nav>
            </div>
        </>
    )};
