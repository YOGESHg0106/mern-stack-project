import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
