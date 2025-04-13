// src/routes/quizzes.ts
import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

// Create Quiz
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, number_of_questions, best_score } = req.body;
    const [newQuiz] = await knex('quizzes')
      .insert({ title, description, difficulty, number_of_questions, best_score })
      .returning(['id', 'title', 'description', 'difficulty', 'number_of_questions', 'best_score', 'created_at', 'updated_at']);
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// Get All Quizzes
router.get('/', async (req: Request, res: Response) => {
  try {
    const quizzes = await knex('quizzes').select('id', 'title', 'description', 'difficulty', 'number_of_questions', 'best_score', 'created_at', 'updated_at');
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Get Quiz by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await knex('quizzes')
      .select('id', 'title', 'description', 'difficulty', 'number_of_questions', 'best_score', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// Update Quiz
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, number_of_questions, best_score } = req.body;
    const existingQuiz = await knex('quizzes').where({ id }).first();
    if (!existingQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const [updatedQuiz] = await knex('quizzes')
      .where({ id })
      .update({ title, description, difficulty, number_of_questions, best_score })
      .returning(['id', 'title', 'description', 'difficulty', 'number_of_questions', 'best_score', 'created_at', 'updated_at']);
    res.json(updatedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
});

// Delete Quiz
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingQuiz = await knex('quizzes').where({ id }).first();
    if (!existingQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    await knex('quizzes').where({ id }).del();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

export default router;