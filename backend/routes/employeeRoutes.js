const express = require("express");
const multer = require("multer");
const Employee = require("../models/Employee");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      const error = new Error("Only JPEG and PNG files are allowed!");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route to create a new employee
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file.filename;

    // Parse courses as an array if sent as a comma-separated string
    const coursesArray = Array.isArray(courses) ? courses : courses.split(",");

    // Create a new employee instance
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: coursesArray, // ensure this matches the model
      imgUrl: image,
    });

    // Save the new employee to the database
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    if (error.code === "LIMIT_FILE_TYPES") {
      return res
        .status(400)
        .json({ error: "Only JPEG and PNG files are allowed!" });
    }
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Route to fetch all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Route to update an employee
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file ? req.file.filename : null;

    // Prepare updated data
    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(courses) ? courses : courses.split(","),
    };
    if (image) updatedData.imgUrl = image; // Use imgUrl for image filename

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(400)
      .json({ message: "Error updating employee", details: error.message });
  }
});

// Route to delete an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

module.exports = router;
