import Employee from "../models/Employee.js";

// Helper function to add full image URL
const formatEmployee = (employee, req) => {
  return {
    ...employee.toObject(),
    profileImage: employee.profileImage
      ? `${req.protocol}://${req.get("host")}/${employee.profileImage.replace(/\\/g, "/")}`
      : "",
  };
};

export const createEmployee = async (req, res) => {
  try {
   // console.log(req.file);
    const employee = await Employee.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      department: req.body.department,
      designation: req.body.designation,
      salary: req.body.salary,
      profileImage: req.file ? req.file.path.replace(/\\/g, "/") : "",
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: formatEmployee(employee, req),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const { search, department } = req.query;

    const query = {};

    // Search by full name
    if (search) {
      query.fullName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by department
    if (department && department !== "All") {
      query.department = department;
    }

    const employees = await Employee.find(query);

    const updatedEmployees = employees.map((employee) =>
      formatEmployee(employee, req)
    );

    res.status(200).json({
      success: true,
      count: updatedEmployees.length,
      data: updatedEmployees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: formatEmployee(employee, req),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: formatEmployee(employee, req),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchEmployee = async (req, res) => {
  try {
    const { name } = req.query;

    const employees = await Employee.find({
      fullName: {
        $regex: name,
        $options: "i",
      },
    });

    const updatedEmployees = employees.map((employee) =>
      formatEmployee(employee, req)
    );

    res.status(200).json({
      success: true,
      count: updatedEmployees.length,
      data: updatedEmployees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterEmployee = async (req, res) => {
  try {
    const { department } = req.query;

    const employees = await Employee.find({
      department,
    });

    const updatedEmployees = employees.map((employee) =>
      formatEmployee(employee, req)
    );

    res.status(200).json({
      success: true,
      count: updatedEmployees.length,
      data: updatedEmployees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};