// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  designation: String,
  gender: String,
  course: [String],
  imgUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: {
    type: Date,
    default: Date.now, // Automatically sets the date when an employee is created
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
