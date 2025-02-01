import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./../styles/Home.css"; 

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(credentials.username, credentials.password);
    if (result.success) {
      navigate("/quiz");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Login</h1>
      <form   className="home-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
        <input type="password" placeholder="Password" required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        <button className="start-quiz-button" type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
