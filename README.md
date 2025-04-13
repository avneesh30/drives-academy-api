# Drives Academy API

A comprehensive RESTful API for a driving school management system, built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- User authentication and authorization
- Driving lessons management
- Quiz and assessment system
- Road rules and categories
- Video tutorials
- User progress tracking
- Swagger documentation
- TypeScript support
- PostgreSQL database
- ESLint and Prettier for code quality

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drives-academy-api.git
cd drives-academy-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=drives_academy
JWT_SECRET=your_jwt_secret
```

4. Run migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## 📚 API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

### Authentication

All routes (except login and register) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗂️ API Structure

### Users
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### Driving Lessons
- `GET /driving-lessons` - Get all driving lessons
- `GET /driving-lessons/:id` - Get a specific driving lesson
- `POST /driving-lessons` - Create a new driving lesson
- `PUT /driving-lessons/:id` - Update a driving lesson
- `DELETE /driving-lessons/:id` - Delete a driving lesson

### Lesson Contents
- `GET /lesson-contents` - Get all lesson contents
- `GET /lesson-contents/:id` - Get a specific lesson content
- `POST /lesson-contents` - Create new lesson content
- `PUT /lesson-contents/:id` - Update lesson content
- `DELETE /lesson-contents/:id` - Delete lesson content

### Quizzes
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get a specific quiz
- `POST /quizzes` - Create a new quiz
- `PUT /quizzes/:id` - Update a quiz
- `DELETE /quizzes/:id` - Delete a quiz

### Questions
- `GET /questions` - Get all questions
- `GET /questions/:id` - Get a specific question
- `POST /questions` - Create a new question
- `PUT /questions/:id` - Update a question
- `DELETE /questions/:id` - Delete a question

### Road Rules
- `GET /road-rules` - Get all road rules
- `GET /road-rules/:id` - Get a specific road rule
- `POST /road-rules` - Create a new road rule
- `PUT /road-rules/:id` - Update a road rule
- `DELETE /road-rules/:id` - Delete a road rule

### Video Tutorials
- `GET /video-tutorials` - Get all video tutorials
- `GET /video-tutorials/:id` - Get a specific video tutorial
- `POST /video-tutorials` - Create a new video tutorial
- `PUT /video-tutorials/:id` - Update a video tutorial
- `DELETE /video-tutorials/:id` - Delete a video tutorial

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📦 Production Deployment

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- Error handling middleware
- CORS protection
- Rate limiting (to be implemented)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@drivesacademy.com or create an issue in the repository.

## 🙏 Acknowledgments

- Express.js
- TypeScript
- PostgreSQL
- Knex.js
- Swagger UI
- ESLint
- Prettier
