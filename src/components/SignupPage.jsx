import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name, // Send the name as part of the request
        username,
        password,
      });
      if (response.data.success) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error during signup");
    }
  };

  return (
    <div className="auth-container signup-page">
      <h2>Signup Page</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <Link to="/" className="back-to-login">
        Back to Login
      </Link>
    </div>
  );
}

export default SignupPage;
