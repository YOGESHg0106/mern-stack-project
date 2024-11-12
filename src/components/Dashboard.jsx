import Navbar from "./Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <h2>Welcome to the Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;
