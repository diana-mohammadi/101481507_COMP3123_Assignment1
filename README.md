# COMP3123 Assignment 1 - Employee Management API

Simple REST API for managing employees and users. Built with Node.js, Express, and MongoDB.

**Student:** Diana Mohammadi (101481507)

## What it does

- User signup and login
- Add, view, update, delete employees
- Input validation
- MongoDB database

## How to run

1. **Install stuff:**
```bash
npm install
```

2. **Setup environment:**
Create `.env` file:
```
PORT=3000
MONGODB_URI=your-mongodb-connection-string
```

3. **Start server:**
```bash
node server.js
```

Server runs at `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/test` - Test endpoint

### Employees  
- `GET /api/v1/emp/employees` - Get all employees
- `POST /api/v1/emp/employees` - Create employee
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `PUT /api/v1/emp/employees/:id` - Update employee
- `DELETE /api/v1/emp/employees?eid=:id` - Delete employee

## Example requests

**Signup:**
```json
POST /api/v1/user/signup
{
  "username": "john",
  "email": "john@test.com",
  "password": "123456"
}
```

**Create Employee:**
```json
POST /api/v1/emp/employees
{
  "first_name": "John",
  "last_name": "Doe", 
  "email": "john.doe@company.com",
  "position": "Developer",
  "salary": 50000,
  "date_of_joining": "2024-01-15",
  "department": "IT"
}
```

## Files

- `server.js` - Main server file
- `db.js` - Database connection
- `models/` - User and Employee schemas
- `controllers/` - Business logic
- `routes/` - API routes
- `middleware/` - Validation

## Notes

- Passwords get hashed automatically
- Email must be unique for users and employees
- Date format: YYYY-MM-DD
- Uses MongoDB Atlas (cloud database)

## Testing

Use Postman to test the endpoints. Start with signup, then login, then try the employee operations.