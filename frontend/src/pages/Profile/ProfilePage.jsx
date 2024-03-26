import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users";


export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})

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
        }
    }, [navigate])

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }
    
    return <h1>{user.firstname} {user.lastname}</h1>

}