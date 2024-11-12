import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CreateEmployeeForm from "./CreateEmployeeForm";
import axios from "axios";
import "../styles/employeeList.css";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleCreateEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
    setShowForm(false);
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
    setShowForm(false);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="employee-list-content">
        <h2>Employee List</h2>
        <p>Total Employees: {employees.length}</p>
        <button onClick={() => setShowForm(true)}>Create Employee</button>
        {showForm && (
          <CreateEmployeeForm
            onSubmit={
              employeeToEdit ? handleUpdateEmployee : handleCreateEmployee
            }
            employee={employeeToEdit}
            setShowForm={setShowForm}
          />
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>
                  {Array.isArray(emp.course)
                    ? emp.course.join(", ")
                    : emp.course || "N/A"}
                </td>
                <td>
                  {emp.imgUrl ? (
                    <img
                      src={`http://localhost:5000/uploads/${emp.imgUrl}`}
                      alt="employee"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEditEmployee(emp)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteEmployee(emp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeListPage;
