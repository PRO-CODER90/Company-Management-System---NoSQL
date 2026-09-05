/**
 * Company Management System - NoSQL (MongoDB) Project
 * -----------------------------------------------------
 * Run with: mongosh < company_management_system.js
 * or paste sections into the MongoDB Shell / Compass.
 *
 * Database: companyManagementDB
 * Collections: departments, employees
 */

// ============================================================
// 1. SWITCH / CREATE DATABASE
// ============================================================
use companyManagementDB;

// ============================================================
// 2. DROP EXISTING COLLECTIONS (clean slate for re-runs)
// ============================================================
db.departments.drop();
db.employees.drop();

// ============================================================
// 3. CREATE "departments" COLLECTION
// ============================================================
db.createCollection("departments");

db.departments.insertMany([
  {
    _id: "DEPT01",
    name: "Human Resources",
    location: "Building A, Floor 1",
    head: "Anita Sharma",
    budget: 500000,
    establishedYear: 2010
  },
  {
    _id: "DEPT02",
    name: "Finance",
    location: "Building A, Floor 2",
    head: "Rohan Mehta",
    budget: 1200000,
    establishedYear: 2010
  },
  {
    _id: "DEPT03",
    name: "Information Technology",
    location: "Building B, Floor 1",
    head: "Priya Nair",
    budget: 2000000,
    establishedYear: 2012
  },
  {
    _id: "DEPT04",
    name: "Marketing",
    location: "Building B, Floor 2",
    head: "Karan Malhotra",
    budget: 900000,
    establishedYear: 2013
  },
  {
    _id: "DEPT05",
    name: "Sales",
    location: "Building C, Floor 1",
    head: "Sneha Reddy",
    budget: 1100000,
    establishedYear: 2011
  },
  {
    _id: "DEPT06",
    name: "Operations",
    location: "Building C, Floor 2",
    head: "Vikram Singh",
    budget: 800000,
    establishedYear: 2014
  },
  {
    _id: "DEPT07",
    name: "Legal",
    location: "Building A, Floor 3",
    head: "Meera Iyer",
    budget: 400000,
    establishedYear: 2015
  },
  {
    _id: "DEPT08",
    name: "Research & Development",
    location: "Building D, Floor 1",
    head: "Arjun Kapoor",
    budget: 2500000,
    establishedYear: 2016
  },
  {
    _id: "DEPT09",
    name: "Customer Support",
    location: "Building D, Floor 2",
    head: "Divya Pillai",
    budget: 600000,
    establishedYear: 2017
  }
]);

// ============================================================
// 4. CREATE "employees" COLLECTION
// ============================================================
db.createCollection("employees");

db.employees.insertMany([
  { empId: "E001", name: "Aarav Gupta",   department: "DEPT01", designation: "HR Manager",         salary: 85000,  email: "aarav.gupta@company.com" },
  { empId: "E002", name: "Ishita Verma",  department: "DEPT02", designation: "Financial Analyst",   salary: 78000,  email: "ishita.verma@company.com" },
  { empId: "E003", name: "Rahul Chawla",  department: "DEPT03", designation: "Software Engineer",   salary: 95000,  email: "rahul.chawla@company.com" },
  { empId: "E004", name: "Neha Joshi",    department: "DEPT04", designation: "Marketing Executive",  salary: 70000,  email: "neha.joshi@company.com" },
  { empId: "E005", name: "Aditya Rao",    department: "DEPT05", designation: "Sales Executive",     salary: 72000,  email: "aditya.rao@company.com" },
  { empId: "E006", name: "Pooja Nanda",   department: "DEPT06", designation: "Operations Manager",  salary: 88000,  email: "pooja.nanda@company.com" },
  { empId: "E007", name: "Siddharth Rao", department: "DEPT07", designation: "Legal Advisor",       salary: 90000,  email: "siddharth.rao@company.com" },
  { empId: "E008", name: "Kavya Menon",   department: "DEPT08", designation: "R&D Scientist",       salary: 105000, email: "kavya.menon@company.com" },
  { empId: "E009", name: "Rohit Bansal",  department: "DEPT09", designation: "Support Lead",        salary: 65000,  email: "rohit.bansal@company.com" },
  { empId: "E010", name: "Simran Kaur",   department: "DEPT03", designation: "System Administrator", salary: 82000,  email: "simran.kaur@company.com" }
]);

// ============================================================
// 5. INDEXES
// ============================================================
db.employees.createIndex({ empId: 1 }, { unique: true });
db.employees.createIndex({ department: 1 });
db.departments.createIndex({ name: 1 }, { unique: true });

// ============================================================
// 6. SAMPLE QUERIES
// ============================================================

// 6.1 List all departments
db.departments.find().pretty();

// 6.2 List all employees
db.employees.find().pretty();

// 6.3 Find employees in the IT department
db.employees.find({ department: "DEPT03" }).pretty();

// 6.4 Find employees earning more than 80,000
db.employees.find({ salary: { $gt: 80000 } }).pretty();

// 6.5 Join employees with their department details (aggregation $lookup)
db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      localField: "department",
      foreignField: "_id",
      as: "departmentInfo"
    }
  },
  { $unwind: "$departmentInfo" },
  {
    $project: {
      _id: 0,
      empId: 1,
      name: 1,
      designation: 1,
      salary: 1,
      "departmentInfo.name": 1,
      "departmentInfo.head": 1
    }
  }
]);

// 6.6 Count employees per department
db.employees.aggregate([
  { $group: { _id: "$department", totalEmployees: { $sum: 1 } } },
  { $sort: { totalEmployees: -1 } }
]);

// 6.7 Average salary per department
db.employees.aggregate([
  { $group: { _id: "$department", avgSalary: { $avg: "$salary" } } },
  { $sort: { avgSalary: -1 } }
]);

// ============================================================
// 7. UPDATE OPERATIONS
// ============================================================

// 7.1 Give a raise to an employee
db.employees.updateOne(
  { empId: "E003" },
  { $set: { salary: 100000 } }
);

// 7.2 Update department head
db.departments.updateOne(
  { _id: "DEPT05" },
  { $set: { head: "Ananya Bhatt" } }
);

// ============================================================
// 8. DELETE OPERATIONS (example - commented out by default)
// ============================================================
// db.employees.deleteOne({ empId: "E010" });
// db.departments.deleteOne({ _id: "DEPT09" });

// ============================================================
// 9. VERIFY COLLECTIONS
// ============================================================
db.getCollectionNames();
print("Company Management System database setup complete.");
