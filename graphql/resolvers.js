const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const JWT_SECRET = "your_secret_key"; // Hardcoded Secret Key

module.exports = {
  signup: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return user;
  },

  login: async ({ username, email, password }) => {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  },

  getEmployees: async () => await Employee.find(),

  getEmployeeById: async ({ eid }) => await Employee.findById(eid),

  searchEmployees: async ({ designation, department }) => {
    const query = {};
    if (designation) query.designation = designation;
    if (department) query.department = department;
    return await Employee.find(query);
  },

  addEmployee: async (args) => {
    const employee = new Employee(args);
    await employee.save();
    return employee;
  },

  updateEmployee: async ({ eid, ...args }) => {
    return await Employee.findByIdAndUpdate(eid, args, { new: true });
  },

  deleteEmployee: async ({ eid }) => {
    await Employee.findByIdAndDelete(eid);
    return "Employee deleted successfully";
  },
};
