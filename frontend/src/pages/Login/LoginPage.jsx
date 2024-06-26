import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css"
import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const [token, userId] = await login(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId)
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password. Please try again.")
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <p style={{color: "red"}}>{errorMessage}</p>
    </>
  );
};
