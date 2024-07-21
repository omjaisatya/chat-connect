# Chat Connect

Chat Connect is a real-time chat application built using React, Node.js, Express, Socket.IO, and MongoDB. This project allows users to communicate with each other instantly, with features such as user authentication, real-time messaging, and chat room management.

## Table of Contents

- [Features](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#features)
- [Demo](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#demo)
- [Installation](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#installation)
- [Usage](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#usage)
- [Techonologies Used](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#technologies-used)
- [Project Structure](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#project-structure)
- [Contributing](https://github.com/omjaisatya/chat-connect?tab=readme-ov-file#contributing)

## Features

- Real-time messaging with Socket.IO
- Chat rooms
- Online status indicators
- Message timestamps
- Persistent chat history with MongoDB

## Demo

You can find a live demo of the application [here](link).

## Installation

#### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Clone the Repository

```bash
  git clone https://github.com/omjaisatya/chat-connect.git
  cd chat-connect
```

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the server directory and add the following:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the client directory:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the client directory and add the following:

```bash
BACKEND_API_URL=http://localhost:5000
```

4. Start the frontend development server:

```bash
npm start
```

## Usage

- Open your browser and navigate to http://localhost:3000.
- Register a new account or login with an existing account.
- Create or join a chat room and start messaging in real-time.

## Technologies Used

- **Frontend:** React, Axios, Bootstrap
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure

```plaintext
chat-connect/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
├── server/          # Node.js backend
│   ├── models/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
├── README.md
└── ...

```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.
