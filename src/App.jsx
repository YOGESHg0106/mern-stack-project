import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import EmployeeListPage from "./components/EmployeeListPage";
import EditEmployeeForm from "./components/EditEmployeeForm";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LoginPage />} />y
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-list" element={<EmployeeListPage />} />
          <Route path="/edit-employee" component={EditEmployeeForm} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
