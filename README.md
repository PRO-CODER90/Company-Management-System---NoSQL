# Company Management System (NoSQL - MongoDB)

A MongoDB-based Company Management System covering all departments and employees.

## Database
`companyManagementDB`

## Collections
- **departments** — 9 departments: HR, Finance, IT, Marketing, Sales, Operations, Legal, R&D, Customer Support
- **employees** — sample employees linked to departments via `department` field

## How to Run
```bash
mongosh < company_management_system.js
```
Or open `mongosh`/MongoDB Compass and paste sections of the script directly.

## Features
- Collection creation & schema-less document inserts
- Indexes for fast lookups (`empId`, `department`, department `name`)
- Aggregation pipeline `$lookup` to join employees with department details
- Grouping queries (employee count & average salary per department)
- Update and delete operation examples

## File Structure
```
.
├── company_management_system.js   # Main MongoDB script
└── README.md
```
