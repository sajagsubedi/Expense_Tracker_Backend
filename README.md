# Expense Tracker Backend

The Expense Tracker Backend is a Node.js application built to manage expenses and transactions for users.

## Features

- User Authentication: Users can securely create accounts and log in to the Expense Tracker app.
- Expense Recording: Users can record their expenses with details such as description, amount, category, location, and date.
- Transaction Management: The app supports various types of transactions, including savings, expenses, and investments.

## Technology Stack

- Node.js: Provides a scalable and efficient server environment for the backend application.
- MongoDB: A flexible and scalable NoSQL database used to store user data, expenses, and transactions.
- Mongoose: An elegant MongoDB object modeling tool used to define schemas and interact with the MongoDB database.
- GraphQL: A query language for APIs that allows clients to specify the exact data they need, reducing over-fetching and under-fetching of data.
- Express.js: A minimalist web framework for Node.js used to handle routing and middleware.

## Models

### User

The `User` model represents a user of the Expense Tracker app and includes the following fields:

- `name`: The user's name.
- `email`: The user's email address (unique).
- `password`: The user's password (encrypted).
- `gender`: The user's gender (male or female).
- `profilePicture`: The URL of the user's profile picture (optional).

### Transaction

The `Transaction` model represents a financial transaction recorded by a user and includes the following fields:

- `userId`: The ID of the user who recorded the transaction.
- `description`: A description of the transaction.
- `paymentType`: The payment type (cash or card).
- `amount`: The amount of the transaction.
- `category`: The category of the transaction (savings, expense, or investment).
- `location`: The location of the transaction (default: unknown).
- `date`: The date and time of the transaction.

## Installation

To run the Expense Tracker backend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/sajagsubedi/Expense_Tracker_Backend.git`
2. Navigate to the project directory: `cd Expense_Tracker_Backend`
3. Install dependencies: `npm install`
4. Set up environment variables (e.g., MongoDB connection string, PORT,JWT Secret).
5. Start the server: `npm start`

## API Documentation

The Expense Tracker backend exposes a GraphQL API for interacting with user data, expenses, and transactions. You can explore the API using tools like GraphQL Playground or Postman.

## Contributors

- [Sajag Subedi](https://sajagsubedi.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
