# Finance Dashboard Backend

A backend system for managing financial records with **Role-Based Access Control (RBAC)**.
It provides secure APIs for handling transactions, user roles, and dashboard analytics.

---

## Features

* User authentication using JWT (cookie-based)
* Role-based access control (Viewer, Analyst, Admin)
* Financial record management (CRUD operations)
* Dashboard analytics (summary, trends, breakdown)
* Pagination and filtering support
* Input validation and centralized error handling

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cookie-based session handling

---

## Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in root directory

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=Backend port 
```

4. Start the server

```bash
node server.js
```

---

## Authentication

* Users can sign up and sign in
* JWT token is stored in cookies (`uid`)
* Protected routes require authentication middleware

Example:

POST /auth/signup
POST /auth/signin

---

## Roles & Permissions

### Viewer

* Can view:

  * Total income
  * Total expense
  * Net balance

### Analyst

* All viewer permissions
* Can:

  * View records
  * Filter records
  * View category breakdown
  * View monthly trends
  * View recent activity

### Admin

* Full access
* Can:

  * Create, update, delete records
  * Manage users (role + status)

---

## API Endpoints

### Auth Routes

* `POST /auth/signup` (New User can register)
* `POST /auth/signin` (Existing user can login)

---

### Record Routes

* `POST /records/create` (Admin)  => (To create a new record)
* `GET /records/fetch` (Analyst+Admin) => (To fetch all records -> paginated request)
* `GET /records/fetch/:id` (Analyst+Admin) => (To fetch a particular record through it's id)
* `GET /records/filter` (Analyst+Admin) => (To filter records based on category , type and date)
* `PATCH /records/update/:id` (Admin) => (To update a particular record)
* `DELETE /records/delete/:id` (Admin) => (To delete a particular record)

---

### Dashboard Routes

* `GET /dashboard/summarize` (Viewer+) 
* `GET /dashboard/monthly-trends` (Analyst+) 
* `GET /dashboard/recent-activity` (Analyst+)
* `GET /dashboard/category` (Analyst+)

---

### User Routes (Admin only)

* `PATCH /users/toggle/:id` → Toggle active status
* `PATCH /users/update` → Update user role

---

## Dashboard APIs Explanation

* **Summary**

  * Returns total income, total expense, and net balance 

* **Category Breakdown**

  * Aggregates totals per category (income - expense) 

* **Recent Activity**

  * Returns last 5 transactions 

* **Monthly Trends**

  * Groups records by year and month and calculates net totals 

---


## Middleware

* **protect** → verifies JWT and attaches user to request 
* **authAdmin** → allows only admin users 
* **authAnalyst** → allows analyst and admin users 

---

## Error Handling

* Centralized error handler middleware used 
* Returns consistent JSON responses with status codes

---


## Conclusion

This project demonstrates backend development skills including:

* API design
* Role-based access control
* Data aggregation using MongoDB
* Clean code structure and validation

---
