// src/routes/answers.ts
import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

// Create Answer
router.post('/', async (req: Request, res: Response) => {
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

// Get All Answers
router.get('/', async (req: Request, res: Response) => {
  try {
    const answers = await knex('answers').select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at');
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching answers' });
  }
});

// Get Answer by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const answer = await knex('answers')
      .select('id', 'question_id', 'answer_text', 'is_correct', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching answer' });
  }
});

// Get Answers by Question ID
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

// Update Answer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question_id, answer_text, is_correct } = req.body;
    const existingAnswer = await knex('answers').where({ id }).first();
    if (!existingAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
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

// Delete Answer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingAnswer = await knex('answers').where({ id }).first();
    if (!existingAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await knex('answers').where({ id }).del();
    res.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting answer' });
  }
});

export default router;