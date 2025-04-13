// src/routes/questions.ts
import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

// Create Question
router.post('/', async (req: Request, res: Response) => {
  try {
    const { quiz_id, question_text } = req.body;
    const [newQuestion] = await knex('questions')
      .insert({ quiz_id, question_text })
      .returning(['id', 'quiz_id', 'question_text', 'created_at', 'updated_at']);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating question' });
  }
});

// Get All Questions
router.get('/', async (req: Request, res: Response) => {
  try {
    const questions = await knex('questions').select('id', 'quiz_id', 'question_text', 'created_at', 'updated_at');
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// Get Question by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await knex('questions')
      .select('id', 'quiz_id', 'question_text', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching question' });
  }
});

// Get Questions by Quiz ID
router.get('/quizzes/:quizId/questions', async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const questions = await knex('questions')
      .select('id', 'quiz_id', 'question_text', 'created_at', 'updated_at')
      .where({ quiz_id: quizId });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions for quiz' });
  }
});

// Update Question
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quiz_id, question_text } = req.body;
    const existingQuestion = await knex('questions').where({ id }).first();
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const [updatedQuestion] = await knex('questions')
      .where({ id })
      .update({ quiz_id, question_text })
      .returning(['id', 'quiz_id', 'question_text', 'created_at', 'updated_at']);
    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating question' });
  }
});

// Delete Question
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingQuestion = await knex('questions').where({ id }).first();
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await knex('questions').where({ id }).del();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting question' });
  }
});

export default router;