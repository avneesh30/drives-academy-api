import express, { Request, Response, Router, RequestHandler } from 'express';
import knex from '../db';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: User Quiz Results
 *   description: API for managing user quiz results
 */

/**
 * @swagger
 * /user-quiz-results:
 *   post:
 *     summary: Create a new quiz result
 *     tags: [User Quiz Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - quiz_id
 *               - score
 *               - correct_answer_count
 *               - incorrect_answer_count
 *               - started_at
 *               - completed_at
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               total_points:
 *                 type: integer
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:
 *                 type: integer
 *               time_taken_seconds:
 *                 type: integer
 *               is_passed:
 *                 type: boolean
 *               question_answers:
 *                 type: array
 *                 items:
 *                   type: object
 *               started_at:
 *                 type: string
 *                 format: date-time
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Quiz result created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      user_id,
      quiz_id,
      score,
      total_points,
      correct_answer_count,
      incorrect_answer_count,
      time_taken_seconds,
      is_passed,
      question_answers,
      started_at,
      completed_at
    } = req.body;

    if (!user_id || !quiz_id || !score || !correct_answer_count || !incorrect_answer_count || !started_at || !completed_at) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const [result] = await knex('user_quiz_results')
      .insert({
        user_id,
        quiz_id,
        score,
        total_points,
        correct_answer_count,
        incorrect_answer_count,
        time_taken_seconds,
        is_passed,
        question_answers: JSON.stringify(question_answers || []),
        started_at,
        completed_at
      })
      .returning('*');

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz result' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /user-quiz-results:
 *   get:
 *     summary: Get all quiz results
 *     tags: [User Quiz Results]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: quiz_id
 *         schema:
 *           type: integer
 *         description: Filter by quiz ID
 *       - in: query
 *         name: is_passed
 *         schema:
 *           type: boolean
 *         description: Filter by pass status
 *     responses:
 *       200:
 *         description: List of quiz results
 *       500:
 *         description: Server error
 */
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, quiz_id, is_passed } = req.query;
    let query = knex('user_quiz_results').select('*');

    if (user_id) {
      query = query.where('user_id', user_id);
    }
    if (quiz_id) {
      query = query.where('quiz_id', quiz_id);
    }
    if (is_passed !== undefined) {
      query = query.where('is_passed', is_passed === 'true');
    }

    const results = await query;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz results' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /user-quiz-results/{id}:
 *   get:
 *     summary: Get quiz result by ID
 *     tags: [User Quiz Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz result details
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (async (req: Request, res: Response): Promise<void> => {
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
}) as RequestHandler);

/**
 * @swagger
 * /user-quiz-results/{id}:
 *   put:
 *     summary: Update a quiz result
 *     tags: [User Quiz Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               total_points:
 *                 type: integer
 *               correct_answer_count:
 *                 type: integer
 *               incorrect_answer_count:
 *                 type: integer
 *               time_taken_seconds:
 *                 type: integer
 *               is_passed:
 *                 type: boolean
 *               question_answers:
 *                 type: array
 *                 items:
 *                   type: object
 *               started_at:
 *                 type: string
 *                 format: date-time
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Quiz result updated successfully
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Server error
 */
router.put('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      user_id,
      quiz_id,
      score,
      total_points,
      correct_answer_count,
      incorrect_answer_count,
      time_taken_seconds,
      is_passed,
      question_answers,
      started_at,
      completed_at
    } = req.body;

    const existingResult = await knex('user_quiz_results').where({ id }).first();
    if (!existingResult) {
      res.status(404).json({ message: 'Quiz result not found' });
      return;
    }

    const [updatedResult] = await knex('user_quiz_results')
      .where({ id })
      .update({
        user_id,
        quiz_id,
        score,
        total_points,
        correct_answer_count,
        incorrect_answer_count,
        time_taken_seconds,
        is_passed,
        question_answers: JSON.stringify(question_answers || []),
        started_at,
        completed_at,
        updated_at: knex.fn.now()
      })
      .returning('*');

    res.json(updatedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating quiz result' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /user-quiz-results/{id}:
 *   delete:
 *     summary: Delete a quiz result
 *     tags: [User Quiz Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz result deleted successfully
 *       404:
 *         description: Quiz result not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', (async (req: Request, res: Response): Promise<void> => {
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
}) as RequestHandler);

export default router;