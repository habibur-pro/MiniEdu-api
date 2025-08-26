# MiniEdu-API

MiniEdu-API is a lightweight school management system API designed to manage students, teachers, and classes.

- **Live Link**: [My details and works](https://mini-edu-api.vercel.app/)

## Features

### 1. Authentication Module

- **User signup & login** with hashed password.
- **JWT authentication** (access + refresh tokens).
- **Roles**: `admin`, `teacher`, `student`.
- Protect routes with **JWT + Role Based Autorization**.

### 2. Student Module

- **POST /students** → Create a new student (**admin only**).
- **GET /students** → List all students (**admin & teacher**) (pagination included).
- **GET /students/:id** → Get student details .

### 3. Class Module

- **POST /classes** → Create a new class (**admin only**).
- **GET /classes** → Get all class (**admin/teacher**).
- **POST /classes/:id/enroll** → Enroll a student in a class (**admin/teacher**).
- **GET /classes/:id/students** → Get students of a class.

### 4. Seed Script

- **POST /seed-script** → Generate mock student and class data.

## Technologies Used

nodeJs, Expressjs, Typescript, Mongoose, JWT, Bcrypt, prettier, eslint

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/habibur-pro/MiniEdu-api.git
    cd MiniEdu-api
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=5000
    DB_URI=
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRES_IN=
    REFRESH_TOKEN_EXPIRES_IN=

    ```

4. Start the development server:

    ```bash
    yarn dev
    ```

    The API will be running on `http://localhost:5000`.

## Postman Collection

For testing and exploring the API endpoints, you can use the provided Postman collection:

[MiniEdu-API Postman Collection](https://www.postman.com/venus-founded/workspace/miniedu-api/request/27289673-1ef52a6c-2a35-4247-be32-a9107ea7a06c?action=share&creator=27289673&ctx=documentation&active-environment=27289673-a85f33e2-8aae-4987-82db-5f3d58eb64bc)

## Connect with Me

- **LinkedIn**: [Habibur Rahman](https://www.linkedin.com/in/habibur01/)
- **Portfolio**: [My details and works](https://habibur.me/)
