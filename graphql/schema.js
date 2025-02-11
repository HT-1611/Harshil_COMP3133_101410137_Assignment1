const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    username: String!
    email: String!
    password: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(username: String, email: String, password: String!): AuthPayload
    getEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
    searchEmployees(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      department: String!,
      employee_photo: String
    ): Employee
    updateEmployee(eid: ID!, first_name: String, last_name: String, email: String, designation: String, salary: Float, department: String): Employee
    deleteEmployee(eid: ID!): String
  }
`);
