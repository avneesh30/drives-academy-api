import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import usersRoute from './routes/users';
import quizzesRoute from './routes/quizzes';
import questionsRoute from './routes/questions';
import answersRoute from './routes/answers';
import userQuizResultsRoute from './routes/userQuizResults';
import drivingLessonsRoute from './routes/drivingLessons';
import lessonContentsRoute from './routes/lessonContents';
import videoTutorialsRoute from './routes/videoTutorials'; // Correct import


const app = express();


/**
 * @swagger
 * tags:
 *   name: DrivingLessons
 *   description: API for managing driving lessons
 */

/**
 * @swagger
 * tags:
 *   name: LessonContents
 *   description: API for managing lesson contents
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API for managing quizzes
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing questions
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: API for managing answers
 */

/**
 * @swagger
 * tags:
 *   name: UserQuizResults
 *   description: API for managing user quiz results
 */

/**
 * @swagger
 * tags:
 *   name: VideoTutorials
 *   description: API for managing video tutorials
 */

/**
 * @swagger
 * tags:
 *   name: VideoTutorials
 *   description: API for managing video tutorials
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Error registering user
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: invalid credential
 *       500:
 *         description: Error logging in
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */

/**
 * @swagger
 * /driving-lessons:
 *   post:
 *     summary: Create a new driving lesson
 *     tags: [DrivingLessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               is_locked:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Driving lesson created successfully
 *       500:
 *         description: Error creating driving lesson
 *   get:
 *     summary: Get all driving lessons
 *     tags: [DrivingLessons]
 *     responses:
 *       200:
 *         description: Driving lessons fetched successfully
 *       500:
 *         description: Error fetching driving lessons
 *
 * /driving-lessons/{id}:
 *   get:
 *     summary: Get driving lesson by ID
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the driving lesson
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Driving lesson fetched successfully
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error fetching driving lesson
 *   put:
 *     summary: Update driving lesson
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the driving lesson to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               is_locked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Driving lesson updated successfully
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error updating driving lesson
 *   delete:
 *     summary: Delete driving lesson
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the driving lesson to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Driving lesson deleted successfully
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error deleting driving lesson
 */

/**
 * @swagger
 * /lesson-contents:
 *   post:
 *     summary: Create lesson content
 *     tags: [LessonContents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driving_lesson_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Lesson content created successfully
 *       500:
 *         description: Error creating lesson content
 *   get:
 *     summary: Get all lesson contents
 *     tags: [LessonContents]
 *     responses:
 *       200:
 *         description: Lesson contents fetched successfully
 *       500:
 *         description: Error fetching lesson contents
 *
 * /lesson-contents/{id}:
 *   get:
 *     summary: Get lesson content by ID
 *     tags: [LessonContents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson content
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson content fetched successfully
 *       404:
 *         description: Lesson content not found
 *       500:
 *         description: Error fetching lesson content
 *   put:
 *     summary: Update lesson content
 *     tags: [LessonContents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson content to update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson content updated successfully
 *       404:
 *         description: Lesson content not found
 *       500:
 *         description: Error updating lesson content
 *   delete:
 *     summary: Delete lesson content
 *     tags: [LessonContents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lesson content to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson content deleted successfully
 *       404:
 *         description: Lesson content not found
 *       500:
 *         description: Error deleting lesson content
 */

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               number_of_questions:
 *                 type: integer
 *               best_score:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       500:
 *         description: Error creating quiz
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: Quizzes fetched successfully
 *       500:
 *         description: Error fetching quizzes
 *
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz fetched successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error fetching quiz
 *   put:
 *     summary: Update quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               number_of_questions:
 *                 type: integer
 *               best_score:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error updating quiz
 *   delete:
 *     summary: Delete quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Error deleting quiz
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quiz_id:
 *                 type: integer
 *               question_text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Error creating question
 * /questions/{id}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the question
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Question fetched successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Error fetching question
 */

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_id:
 *                 type: integer
 *               answer_text:
 *                 type: string
 *               is_correct:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       500:
 *         description: Error creating answer
 */

const swaggerDefinition = {
  info: {
    title: 'Drives Academy API',
    version: '1.0.0',
  },
  servers: [
     {
       url: 'http://localhost:3001',
     },
  ],
};

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition,
  apis: ['./src/index.ts', './src/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use('/users', usersRoute); 
app.use('/quizzes', quizzesRoute);
app.use('/questions', questionsRoute);
app.use('/answers', answersRoute);
app.use('/user-quiz-results', userQuizResultsRoute);
app.use('/driving-lessons', drivingLessonsRoute);
app.use('/lesson-contents', lessonContentsRoute);
app.use('/video-tutorials', videoTutorialsRoute);
// Use correct route path
app.use('/video-tutorials', videoTutorialsRoute);
const port = parseInt(process.env.PORT || '3001');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

