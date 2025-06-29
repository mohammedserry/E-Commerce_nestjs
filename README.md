# 🛒 E-commerce With Nest.js

A powerful RESTful API for an eCommerce platform, built with Node.js and Nest.
It supports essential eCommerce functionalities such as product management, user authentication and order processing.

## 🔑 Key Features

- **Full CRUD operations** for products, users, orders, categories and reviews
- **User authentication** with JWT-based authorization
- **Role-based access control (RBAC)** for admin and customers
- **Order tracking and status updates**
- **Class-Calidator Package** for input validation
- **RESTful endpoints** following best practices
- **Error handling middleware** for better API stability
- **Modular and scalable architecture**

## 🛠 Tech Stack

- Node.js
- Nest.js
- PostgreSQL with TypeORM 
- JWT for authentication
- Class-validator
- REST API principles

## Project Structure

db/            # Database files
migrations/    # Database migration files
dist/          # Compiled output
node_modules/
src/
├── auth/ 
│ ├── dto/
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ └── auth.service.ts
│
├── categories/
│
├── orders/
│
├── products/
│
├── reviews/
│
├── user/
│
├── utility/                           # Shared utilities and core functionality
│ ├── common/                          # Common utilities and shared types
│ │
│ ├── decorators/                      # Custom parameter and method decorators
│ │
│ ├── guards/                          # Authentication and authorization guards
│ │
│ └── middlewares/                     # Request processing middlewares
├── app.module.ts                      # Root application module
└── main.ts                            # Application entry point

## 🌐 API Endpoints

### Authentication

| Method | Endpoint                     | Description                              |
| ------ | -----------------------------| ---------------------------------------- |
| POST   | /api/v1/auth/signup          | User registration                        |
| POST   | /api/v1/auth/sigin           | User login and token generation          |

### Products

| Method | Endpoint              | Description                     |
| ------ | --------------------- | --------------------------------|
| GET    | /api/v1/products      | Retrieve all products           |
| GET    | /api/v1/products/:id  | Get single product              |
| POST   | /api/v1/products      | Add a new product (Admin only)  |
| PUT    | /api/v1/products/:id  | Update product (Admin only)     |
| DELETE | /api/v1/products/:id  | Delete product (Admin only)     |

### Categories

| Method | Endpoint               | Description                          |
| ------ | -----------------------| ------------------------------------ |
| GET    | /api/v1/categories     | Retrieve all categories              |
| POST   | /api/v1/categories     | Create a new category (Admin only)   |
| GET    | /api/v1/categories/:id | Get a single category by ID          |
| PATCH  | /api/v1/categories/:id | Update category details (Admin only) |
| DELETE | /api/v1/categories/:id | Delete a category (Admin only)       |

### Reviews

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | --------------------------|
| GET    | /api/v1/reviews          | Retrieve all reviews      |
| POST   | /api/v1/reviews          | Create a new review       |
| GET    | /api/v1/reviews/:id      | Get a single review by ID |
| DELETE | /api/v1/reviews/:id      | Delete a review           |

### Users

| Method | Endpoint          | Description                  |
| ------ | ------------------| -----------------------------|
| GET    | /api/v1/users/me  | Retrieve logged-in user data |
| GET    | /api/v1/users     | Retrieve all users (Admin)   |
| POST   | /api/v1/users     | Create a new user (Admin)    |
| GET    | /api/v1/users/:id | Retrieve a single user by ID |
| PATCH  | /api/v1/users/:id | Update user data             |
| DELETE | /api/v1/users/:id | Delete user (Admin)          |

## ✅ Best Practices

- Secure authentication with JWT and password hashing
- Strict input validation using class-validator
- Role-based access control for admin and users
- Modular architecture for scalability
- Well-documented RESTful endpoints

---

**Developed as a robust foundation for eCommerce API development with Node.js and Nest.**
