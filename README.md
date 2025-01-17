# Expense Tracker

An Expense Tracker web application built using **React** for the frontend and **Node.js** with **GraphQL** for the backend.

## Features

- **User Authentication**: Sign up, login, and manage accounts using passport js.
- **Expense Tracking**: Add, edit, and delete expense records.
- **Transaction Details**: View and analyze past transactions.
- **Responsive UI**: Built with modern React components and Tailwind CSS.

## Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (for database)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SarfarazAhmed1012/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```bash
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     ```

4. Start the application:
   - Start the backend:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```

## Project Structure

```
expense-tracker/
│
├── backend/       # Contains server-side code (Node.js, GraphQL)
├── frontend/      # Contains client-side code (React)
├── .gitignore     # Ignored files for Git
├── package.json   # Project dependencies and scripts
└── .env           # Environment variables (e.g., DB connection)
```

## Scripts

### Backend

- **Start the Backend**:
  ```bash
  npm start
  ```
- **Development Mode**:
  ```bash
  npm run dev
  ```

### Frontend

- **Start the Frontend**:
  ```bash
  cd frontend
  npm start
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

## Technologies Used

### Frontend
- **React**: User interface development.
- **Tailwind CSS**: Responsive styling.
- **Apollo Client**: GraphQL integration.

### Backend
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **GraphQL**: Query language for API.
- **MongoDB**: Database for storing user and expense data.

## Contribution

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For queries or suggestions, contact [sarfarazahmed1012@gmail.com].
