# Task Manager Application

A full-stack Task Manager application built with React.js frontend, Node.js backend, and MongoDB database.

## Features

- User authentication (Register/Login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design
- RESTful API architecture

## Tech Stack

### Frontend
- React.js
- Context API for state management
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Set up the backend:
   ```bash
   cd Backend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the Backend directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Set up the frontend:
   ```bash
   cd ../Frontend
   npm install
   ```

5. Start the development servers:
   - Backend (from Backend directory): `npm run dev`
   - Frontend (from Frontend directory): `npm start`

## Usage

1. Register a new account or login with existing credentials
2. Add new tasks using the input field
3. Edit tasks by clicking on them
4. Mark tasks as complete using the checkbox
5. Delete tasks using the delete button

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| GET | /api/tasks | Get all tasks for user |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Project Structure

```
task-manager/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Deployment

The application can be deployed on platforms like:
- Frontend: Netlify, Vercel
- Backend: Heroku, Render, AWS
- Database: MongoDB Atlas

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/task-manager](https://github.com/your-username/task-manager)
