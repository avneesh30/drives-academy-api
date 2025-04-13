import express, { Request, Response, Router } from 'express';
import knex from '../db';
const router: Router = express.Router();/**
 * @swagger
 * tags:
 *   name: UserQuizResults
 *   description: API for managing user quiz results
 */

/**
 * @swagger
 * /user-quiz-results:
 *   post:
 *     summary: Create a new user quiz result
 *     tags: [UserQuizResults]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               total_questions:
 *                 type: integer
 *               correct_answers:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Quiz result created successfully
 *       500:
 *         description: Error creating quiz result
 *   get:
 *     summary: Get all quiz results
 *     tags: [UserQuizResults]
 *     responses:
 *       200:
 *         description: Quiz results fetched successfully
 *       500:
 *         description: Error fetching quiz results
 */

/**
 * @swagger
 * /user-quiz-results/{id}:
 *   get:
 *     summary: Get quiz result by ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz result
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz result fetched successfully
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Error fetching quiz result
 *   put:
 *     summary: Update quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz result to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               total_questions:
 *                 type: integer
 *               correct_answers:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quiz result updated successfully
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Error updating quiz result
 *   delete:
 *     summary: Delete quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz result to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz result deleted successfully
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Error deleting quiz result
 */

/**
 * @swagger
 * /user-quiz-results/users/{userId}:
 *   get:
 *     summary: Get quiz results by user ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz results fetched successfully
 *       500:
 *         description: Error fetching quiz results for user
 */

/**
 * @swagger
 * /user-quiz-results/quizzes/{quizId}:
 *   get:
 *     summary: Get quiz results by quiz ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz results fetched successfully
 *       500:
 *         description: Error fetching quiz results for quiz
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, quiz_id, score, total_questions, correct_answers } = req.body;
    const [newResult] = await knex('user_quiz_results')
      .insert({ user_id, quiz_id, score, total_questions, correct_answers })
      .returning(['id', 'user_id', 'quiz_id', 'score', 'total_questions', 'correct_answers', 'created_at', 'updated_at']);
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz result' });
  }
});
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await knex('user_quiz_results').select('*');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz results' });
  }
});
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await knex('user_quiz_results').where({ id }).first();
    if (!result) {
      res.status(404).json({ message: 'Quiz result not found' });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz result' });
  }
});
router.get('/users/:userId/user-quiz-results', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const userQuizResults = await knex('user_quiz_results')
      .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
      .where({ user_id: userId });
    res.json(userQuizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user quiz results for user' });
  }
});
router.get('/quizzes/:quizId/user-quiz-results', async (req: Request, res: Response): Promise<void> => {
  try {
    const { quizId } = req.params;
    const userQuizResults = await knex('user_quiz_results')
      .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
      .where({ quiz_id: quizId });
    res.json(userQuizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user quiz results for quiz' });
  }
});
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { user_id, quiz_id, score, total_questions, correct_answers } = req.body;
    const existingResult = await knex('user_quiz_results').where({ id }).first();
    if (!existingResult) {
      res.status(404).json({ message: 'Quiz result not found' });
      return;
    }
    const [updatedResult] = await knex('user_quiz_results')
      .where({ id })
      .update({ user_id, quiz_id, score, total_questions, correct_answers })
      .returning(['id', 'user_id', 'quiz_id', 'score', 'total_questions', 'correct_answers', 'created_at', 'updated_at']);
    res.json(updatedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating quiz result' });
  }
});
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingResult = await knex('user_quiz_results').where({ id }).first();
    if (!existingResult) {
      res.status(404).json({ message: 'Quiz result not found' });
      return;
    }
    await knex('user_quiz_results').where({ id }).del();
    res.json({ message: 'Quiz result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting quiz result' });
  }
});

export default router;