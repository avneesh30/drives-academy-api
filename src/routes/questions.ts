// src/routes/questions.ts
import express, { Request, Response, Router, RequestHandler } from "express";
import { db } from "../db";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing quiz questions
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
 *             required:
 *               - quiz_id
 *               - question_text
 *             properties:
 *               quiz_id:
 *                 type: integer
 *               question_text:
 *                 type: string
 *               explanation:
 *                 type: string
 *               image_url:
 *                 type: string
 *               points:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { quiz_id, question_text, explanation, image_url, points = 1 } = req.body;

    if (!quiz_id || !question_text) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const [question] = await db('questions')
      .insert({
        quiz_id,
        question_text,
        explanation,
        image_url,
        points,
        is_active: true,
      })
      .returning('*');

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating question' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: quiz_id
 *         schema:
 *           type: integer
 *         description: Filter by quiz ID
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of questions
 *       500:
 *         description: Server error
 */
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { quiz_id, is_active } = req.query;
    let query = db('questions').select('*');

    if (quiz_id) {
      query = query.where('quiz_id', quiz_id);
    }
    if (is_active !== undefined) {
      query = query.where('is_active', is_active === 'true');
    }

    const questions = await query;
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question details
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const question = await db('questions').where({ id }).first();

    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching question' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
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
 *               quiz_id:
 *                 type: integer
 *               question_text:
 *                 type: string
 *               explanation:
 *                 type: string
 *               image_url:
 *                 type: string
 *               points:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
router.put('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quiz_id, question_text, explanation, image_url, points, is_active } = req.body;

    const existingQuestion = await db('questions').where({ id }).first();
    if (!existingQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    const [updatedQuestion] = await db('questions')
      .where({ id })
      .update({
        quiz_id,
        question_text,
        explanation,
        image_url,
        points,
        is_active,
        updated_at: db.fn.now(),
      })
      .returning('*');

    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating question' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingQuestion = await db('questions').where({ id }).first();

    if (!existingQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    await db('questions').where({ id }).del();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting question' });
  }
}) as RequestHandler);

export default router;
