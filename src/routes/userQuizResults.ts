import express, { Request, Response } from 'express';
import knex from '../db';
const router = express.Router();/**
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
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:                 
 *                 type: integer
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: User quiz results created successfully
 *       500:
 *         description: Error creating user quiz result
 *   get:
 *     summary: Get all user quiz result
 *         description: ID of the user quiz result
 *         schema:
 *           type: integer
 *     description: ""
 *     responses:
 *       200:     
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results
 * /user-quiz-results/{id}:
 *   get:
 *     summary: Get user quiz result by ID
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz result fetched successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error fetching user quiz result
 *
 * /user-quiz-results/users/{userId}/user-quiz-results:
 *   get:
 *     summary: Get user quiz results by user ID
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
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results for user
 *
 * /user-quiz-results/quizzes/{quizId}/user-quiz-results:
 *   get:
 *     summary: Get user quiz results by quiz ID
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
 *         description: User quiz results fetched successfully
 *       500:
 *         description: Error fetching user quiz results for quiz
 *
 * /user-quiz-results/{id}:
 *   put:
 *     summary: Update user quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result to update
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
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:
 *                 type: integer
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: User quiz result updated successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error updating user quiz result
 *   delete:
 *     summary: Delete user quiz result
 *     tags: [UserQuizResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user quiz result to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User quiz result deleted successfully
 *       404:
 *         description: User quiz result not found
 *       500:
 *         description: Error deleting user quiz result
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at } = req.body;
    const [newUserQuizResult] = await knex('user_quiz_results')
      .insert({ user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at })
      .returning(['id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at']);
    res.status(201).json(newUserQuizResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user quiz result' });
  }
});
router.get('/', async (req: Request, res: Response) => {
  try {
    const userQuizResults = await knex('user_quiz_results').select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at');
    res.json(userQuizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user quiz results' });
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userQuizResult = await knex('user_quiz_results')
      .select('id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!userQuizResult) {
      return res.status(404).json({ message: 'User quiz result not found' });
    }
    res.json(userQuizResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user quiz result' });
  }
});
router.get('/users/:userId/user-quiz-results', async (req: Request, res: Response) => {
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
router.get('/quizzes/:quizId/user-quiz-results', async (req: Request, res: Response) => {
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
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at } = req.body;
    const existingUserQuizResult = await knex('user_quiz_results').where({ id }).first();
    if (!existingUserQuizResult) {
      return res.status(404).json({ message: 'User quiz result not found' });
    }
    const [updatedUserQuizResult] = await knex('user_quiz_results')
      .where({ id })
      .update({ user_id, quiz_id, score, correct_answer_count, incorrect_answer_count, completed_at })
      .returning(['id', 'user_id', 'quiz_id', 'score', 'correct_answer_count', 'incorrect_answer_count', 'completed_at', 'created_at', 'updated_at']);
    res.json(updatedUserQuizResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user quiz result' });
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingUserQuizResult = await knex('user_quiz_results').where({ id }).first();
    if (!existingUserQuizResult) {
      return res.status(404).json({ message: 'User quiz result not found' });
    }
    await knex('user_quiz_results').where({ id }).del();
    res.json({ message: 'User quiz result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user quiz result' });
  }
});

export default router;