// EditEmployeeForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Replace useHistory with useNavigate

const EditEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const location = useLocation();
  const { employeeId } = location.state; // Get employeeId passed in from EmployeeListPage

  useEffect(() => {
    // Fetch the employee details from the API to populate the form
    axios
      .get(`http://localhost:5000/api/employees/${employeeId}`)
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
      });
  }, [employeeId]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the employee data in the database
    axios
      .put(`http://localhost:5000/api/employees/${employeeId}`, employeeData)
      .then((response) => {
        alert("Employee details updated successfully!");
        navigate("/employees"); // Use navigate to redirect
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Error updating employee!");
      });
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={employeeData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={employeeData.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={employeeData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
