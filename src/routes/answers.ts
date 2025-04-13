// src/routes/answers.ts
import express, { Request, Response, Router } from 'express';
import knex from '../db';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: API for managing quiz answers
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
 *             required:
 *               - question_id
 *               - answer_text
 *               - is_correct
 *             properties:
 *               question_id:
 *                 type: integer
 *                 description: ID of the question this answer belongs to
 *               answer_text:
 *                 type: string
 *                 description: The text content of the answer
 *               is_correct:
 *                 type: boolean
 *                 description: Whether this answer is correct
 *     responses:
 *       201:
 *         description: Answer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question_id:
 *                   type: integer
 *                 answer_text:
 *                   type: string
 *                 is_correct:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error creating answer
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { question_id, answer_text, is_correct } = req.body;
    const [newAnswer] = await knex('answers')
      .insert({ question_id, answer_text, is_correct })
      .returning(['id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at']);
    res.status(201).json(newAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating answer' });
  }
});

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Get all answers
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: List of all answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question_id:
 *                     type: integer
 *                   answer_text:
 *                     type: string
 *                   is_correct:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching answers
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const answers = await knex('answers').select('*');
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching answers' });
  }
});

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: Get answer by ID
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Answer ID
 *     responses:
 *       200:
 *         description: Answer found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question_id:
 *                   type: integer
 *                 answer_text:
 *                   type: string
 *                 is_correct:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Error fetching answer
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const answer = await knex('answers').where({ id }).first();
    if (!answer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching answer' });
  }
});

/**
 * @swagger
 * /answers/questions/{questionId}/answers:
 *   get:
 *     summary: Get all answers for a specific question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question ID
 *     responses:
 *       200:
 *         description: List of answers for the question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question_id:
 *                     type: integer
 *                   answer_text:
 *                     type: string
 *                   is_correct:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching answers for question
 */
router.get('/questions/:questionId/answers', async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const answers = await knex('answers')
      .select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at')
      .where({ question_id: questionId });
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching answers for question' });
  }
});

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     summary: Update an answer
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Answer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_id:
 *                 type: integer
 *                 description: ID of the question this answer belongs to
 *               answer_text:
 *                 type: string
 *                 description: The text content of the answer
 *               is_correct:
 *                 type: boolean
 *                 description: Whether this answer is correct
 *     responses:
 *       200:
 *         description: Answer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question_id:
 *                   type: integer
 *                 answer_text:
 *                   type: string
 *                 is_correct:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Error updating answer
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { question_id, answer_text, is_correct } = req.body;
    const existingAnswer = await knex('answers').where({ id }).first();
    if (!existingAnswer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }
    const [updatedAnswer] = await knex('answers')
      .where({ id })
      .update({ question_id, answer_text, is_correct })
      .returning(['id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at']);
    res.json(updatedAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating answer' });
  }
});

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Delete an answer
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Answer ID
 *     responses:
 *       200:
 *         description: Answer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Answer deleted successfully
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Error deleting answer
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingAnswer = await knex('answers').where({ id }).first();
    if (!existingAnswer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }
    await knex('answers').where({ id }).del();
    res.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting answer' });
  }
});

export default router;