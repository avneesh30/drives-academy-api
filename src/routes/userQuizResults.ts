import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { db } from '../db';
import { z } from 'zod';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation schemas
const createUserQuizResultSchema = z.object({
  userId: z.number(),
  quizId: z.number(),
  score: z.number(),
  totalQuestions: z.number(),
  correctAnswers: z.number(),
  timeTaken: z.number(),
  answers: z.array(
    z.object({
      questionId: z.number(),
      selectedAnswerId: z.number(),
      isCorrect: z.boolean(),
    }),
  ),
});

const updateUserQuizResultSchema = createUserQuizResultSchema.partial();

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
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const validatedData = createUserQuizResultSchema.parse(req.body);

    // Ensure the user can only create results for themselves
    if (validatedData.userId !== userId) {
      return res.status(403).json({ error: 'Cannot create quiz result for another user' });
    }

    const [result] = await db('userQuizResults')
      .insert({
        ...validatedData,
        userId,
      })
      .returning('*');

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error creating quiz result:', error);
    res.status(500).json({ error: 'Failed to create quiz result' });
  }
});

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
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const results = await db('userQuizResults').where('userId', userId).select('*');
    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ error: 'Failed to fetch quiz results' });
  }
});

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
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const result = await db('userQuizResults').where({ id: req.params.id, userId }).first();

    if (!result) {
      return res.status(404).json({ error: 'Quiz result not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching quiz result:', error);
    res.status(500).json({ error: 'Failed to fetch quiz result' });
  }
});

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
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const validatedData = updateUserQuizResultSchema.parse(req.body);

    const [result] = await db('userQuizResults')
      .where({ id: req.params.id, userId })
      .update(validatedData)
      .returning('*');

    if (!result) {
      return res.status(404).json({ error: 'Quiz result not found' });
    }

    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error updating quiz result:', error);
    res.status(500).json({ error: 'Failed to update quiz result' });
  }
});

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
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const result = await db('userQuizResults').where({ id: req.params.id, userId }).del();

    if (!result) {
      return res.status(404).json({ error: 'Quiz result not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting quiz result:', error);
    res.status(500).json({ error: 'Failed to delete quiz result' });
  }
});

export default router;
