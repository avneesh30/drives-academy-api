// src/routes/quizzes.ts
import express, { Request, Response, Router, RequestHandler } from "express";
import { db } from "../db";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API for managing driving academy quizzes
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
 *             required:
 *               - title
 *               - difficulty
 *               - category
 *               - number_of_questions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *               category:
 *                 type: string
 *                 enum: [Road Signs, Traffic Rules, Vehicle Control, Safety, Emergency Procedures]
 *               time_limit_minutes:
 *                 type: integer
 *               passing_score:
 *                 type: integer
 *               number_of_questions:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      difficulty,
      category,
      time_limit_minutes = 30,
      passing_score = 70,
      number_of_questions,
    } = req.body;

    if (!title || !difficulty || !category || !number_of_questions) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const [quiz] = await db('quizzes')
      .insert({
        title,
        description,
        difficulty,
        category,
        time_limit_minutes,
        passing_score,
        number_of_questions,
        is_active: true,
      })
      .returning('*');

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of quizzes
 *       500:
 *         description: Server error
 */
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty, is_active } = req.query;
    let query = db('quizzes').select('*');

    if (category) {
      query = query.where('category', category);
    }
    if (difficulty) {
      query = query.where('difficulty', difficulty);
    }
    if (is_active !== undefined) {
      query = query.where('is_active', is_active === 'true');
    }

    const quizzes = await query;
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz details
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const quiz = await db('quizzes').where({ id }).first();

    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /quizzes/{id}:
 *   put:
 *     summary: Update a quiz
 *     tags: [Quizzes]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               category:
 *                 type: string
 *               time_limit_minutes:
 *                 type: integer
 *               passing_score:
 *                 type: integer
 *               number_of_questions:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.put('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      difficulty,
      category,
      time_limit_minutes,
      passing_score,
      number_of_questions,
      is_active,
    } = req.body;

    const existingQuiz = await db('quizzes').where({ id }).first();
    if (!existingQuiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    const [updatedQuiz] = await db('quizzes')
      .where({ id })
      .update({
        title,
        description,
        difficulty,
        category,
        time_limit_minutes,
        passing_score,
        number_of_questions,
        is_active,
        updated_at: db.fn.now(),
      })
      .returning('*');

    res.json(updatedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingQuiz = await db('quizzes').where({ id }).first();

    if (!existingQuiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    await db('quizzes').where({ id }).del();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
}) as RequestHandler);

export default router;
