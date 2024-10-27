
# To-Do Application

A simple To-Do application built with Node.js, Express, and MongoDB. This application allows users to register, log in, and manage their tasks efficiently.

## Features

- User Registration and Authentication
- Create, Read, Update, and Delete (CRUD) tasks
- Secure password storage using bcrypt
- JWT for secure user authentication
- Pagination for task retrieval

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman or similar tool for API testing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list.git
   cd todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```plaintext
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Routes

- **POST** `/api/user/register` - Register a new user
- **POST** `/api/user/login` - Log in a user

### Todo Routes

- **POST** `/api/todo` - Create a new todo
- **GET** `/api/todo` - Retrieve todos (with pagination)
- **PUT** `/api/todo/:id` - Update a specific todo
- **DELETE** `/api/todo/:id` - Delete a specific todo

## Usage

- Use Postman or any API client to interact with the API.
- Include the JWT in the Authorization header for routes that require authentication.

### [TASK LINK](https://roadmap.sh/projects/todo-list-api)