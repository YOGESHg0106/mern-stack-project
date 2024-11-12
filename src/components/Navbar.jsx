import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard">Home</Link>
        <Link to="/employee-list">Employee List</Link>
      </div>
      <div className="navbar-right">
        <span>Welcome, {name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
