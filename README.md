# E-commerce With Nest.js

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

db/                                        # Database files
migrations/                                # Database migration files
dist/                                      # Compiled output
node_modules/                              # Node.js dependencies
src/
├── auth/                                  # Authentication module
│ ├── dto/                                 # Auth data transfer objects
│ ├── entities/                            # Auth entities
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ └── auth.service.ts
│
├── categories/                            # Product categories management
│ ├── dto/                                 # Category DTOs
│ ├── entities/                            # Category entities
│ ├── categories.controller.ts
│ ├── categories.module.ts
│ └── categories.service.ts
│
├── orders/                                # Order processing
│ ├── dto/                                 # Order DTOs
│ ├── entities/                            # Order entities
│ ├── enums/                               # Order enums
│ ├── orders.controller.ts
│ ├── orders.module.ts
│ └── orders.service.ts
│
├── products/                              # Product management
│ ├── dto/                                 # Product DTOs
│ ├── entities/                            # Product entities
│ ├── products.controller.ts
│ ├── products.module.ts
│ └── products.service.ts
│
├── reviews/                               # Product reviews
│ ├── dto/                                 # Review DTOs
│ ├── entities/                            # Review entities
│ ├── reviews.controller.ts
│ ├── reviews.module.ts
│ └── reviews.service.ts
│
├── user/                                  # User management
│ ├── dto/                                 # User DTOs
│ ├── entities/                            # User entities
│ ├── user.controller.ts
│ ├── user.module.ts
│ └── user.service.ts
│
├── utility/                               # Shared utilities and core functionality
│ ├── common/                              # Common utilities and shared types
│ │ └── user-roles.enum.ts                 # User role definitions (Admin, Customer, etc.)
│ │
│ ├── decorators/                          # Custom parameter and method decorators
│ │ ├── authorize-roles.decorator.ts       # Role-based access control decorator
│ │ └── current-user.decorator.ts          # Injects current user in controllers
│ │
│ ├── guards/                              # Authentication and authorization guards
│ │ ├── authentication.guard.ts            # Verifies JWT and authentication
│ │ └── authorization.guard.ts             # Checks user roles and permissions
│ │
│ └── middlewares/                         # Request processing middlewares
│   └── current-user.middleware.ts         # Attaches user to request object
├── app.module.ts                          # Root application module
└── main.ts                                # Application entry point

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
