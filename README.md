# Node.js Library Management System

A Library Management System built with Node.js, Express, Sequelize, PostgreSQL, JWT for user authentication, and Docker for easy deployment.

## Features

- User registration and authentication
- Admin and user roles with different access levels
- Book management (CRUD operations)
- Borrow and return books with user-specific transactions
- Access control for different user roles

## Setup Manually

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:csuonereal/library-management-system.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in `.env`:
   ```makefile
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=librarydb
   JWT_SECRET=yourjwtsecret
   PORT=8080
   ADMIN_EMAIL=admin@example.com
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
4. Run the server:
   ```bash
   npm start
   ```

## Setup with Docker

1. Ensure Docker and Docker Compose are installed on your system.

2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

## Functionality Based on Routes

- `/api/auth/signup`: Register a new user.
- `/api/auth/signin`: Authenticate a user and get a token.
- `/api/books`: Perform CRUD operations on books.
- `/api/userbooks/borrow`: Borrow a book.
- `/api/userbooks/return`: Return a borrowed book.
- `/api/test/all`: Public access route.
- `/api/test/user`: User access route.
- `/api/test/admin`: Admin access route.
- `/api/users/:pk`: Get a user by primary key (admin only).
- `/api/users`: Get all users (admin only).

## Using ESLint and Prettier

To lint and format your code using ESLint and Prettier, you can use the following commands:

- To check for linting issues: `npm run lint`
- To automatically fix linting issues: `npm run lint:fix`
- To format your code using Prettier: `npm run format`