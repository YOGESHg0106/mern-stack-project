import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/createEmployeeForm.css";

function CreateEmployeeForm({ onSubmit, employee, setShowForm }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    courses: [],
    image: null,
  });

  // Pre-fill form if editing an existing employee
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        mobile: employee.mobile || "",
        designation: employee.designation || "HR",
        gender: employee.gender || "M",
        courses:
          typeof employee.course === "string" ? employee.course.split(",") : [],
        image: null, // image won't be pre-filled
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for the form submission
    const employeeData = new FormData();
    for (let key in formData) {
      if (key === "courses") {
        employeeData.append(key, formData[key].join(",")); // Convert courses array to comma-separated string
      } else {
        employeeData.append(key, formData[key]);
      }
    }

    try {
      const response = employee
        ? await axios.put(
            `http://localhost:5000/api/employees/${employee._id}`,
            employeeData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
        : await axios.post(
            "http://localhost:5000/api/employees",
            employeeData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

      onSubmit(response.data);
      setShowForm(false); // Close form upon successful submission
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <form
      className="create-employee-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Name"
        required
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        placeholder="Mobile No"
        required
        onChange={handleChange}
      />
      <select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
      >
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="M"
          checked={formData.gender === "M"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="F"
          checked={formData.gender === "F"}
          onChange={handleChange}
        />{" "}
        Female
      </div>
      <div>
        <label>Courses:</label>
        <input
          type="checkbox"
          name="courses"
          value="MCA"
          checked={formData.courses.includes("MCA")}
          onChange={handleChange}
        />{" "}
        MCA
        <input
          type="checkbox"
          name="courses"
          value="BCA"
          checked={formData.courses.includes("BCA")}
          onChange={handleChange}
        />{" "}
        BCA
        <input
          type="checkbox"
          name="courses"
          value="BSC"
          checked={formData.courses.includes("BSC")}
          onChange={handleChange}
        />{" "}
        BSC
      </div>
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
      <button type="submit">{employee ? "Update" : "Submit"}</button>
    </form>
  );
}

export default CreateEmployeeForm;
