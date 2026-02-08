# User Management Application

A simple React-based CRUD (Create, Read, Update, Delete) web application to manage user data.

The application is designed with future extensibility in mind, allowing new fields to be added with minimal code changes.

---

## Tech Stack

- React + TypeScript
- Vite
- Ant Design
- React Hook Form
- Zod
- JSON-server (mock API)

---

## Features

- Create a new user
- List all users
- Edit existing user information
- Delete a user
- Form validation with clear error messages
- Loading and success/error notifications

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>

```

### 2. Install dependencies

```bash
npm install
```

### 3. Mock API Setup (JSON-server)

Since no backend API was provided, JSON-server is used for mock testing.
```bash
Run the server
npm run server
```

### 4. API Endpoint
```bash
http://localhost:3000/users

```

### 5. Running the Application

Start the frontend application:
```bash

npm run dev
```

Application runs at:

http://localhost:5173

### 6. Extensibility

The application follows a configuration-driven architecture.

Add a new field definition in:
```js
src/config/user/formSchema.ts

Example:
{ name: 'address', label: 'Address', type: 'textarea', required: false }
```
- No other changes are required.
- The form UI is rendered dynamically from the configuration.
- Validation rules are generated automatically based on field type.
- API payload handling remains unchanged.
- This approach ensures minimal code changes when requirements evolve.