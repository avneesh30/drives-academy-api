// src/routes/lessonContents.ts
import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

// Create Lesson Content
router.post('/', async (req: Request, res: Response) => {
  try {
    const { driving_lesson_id, title, content, order } = req.body;
    const [newLessonContent] = await knex('lesson_contents')
      .insert({ driving_lesson_id, title, content, order })
      .returning(['id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at']);
    res.status(201).json(newLessonContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating lesson content' });
  }
});

// Get All Lesson Contents
router.get('/', async (req: Request, res: Response) => {
  try {
    const lessonContents = await knex('lesson_contents').select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at');
    res.json(lessonContents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lesson contents' });
  }
});

// Get Lesson Content by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lessonContent = await knex('lesson_contents')
      .select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!lessonContent) {
      return res.status(404).json({ message: 'Lesson content not found' });
    }
    res.json(lessonContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lesson content' });
  }
});

// Get Lesson Contents by Driving Lesson ID
router.get('/driving-lessons/:drivingLessonId/lesson-contents', async (req: Request, res: Response) => {
  try {
    const { drivingLessonId } = req.params;
    const lessonContents = await knex('lesson_contents')
      .select('id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at')
      .where({ driving_lesson_id: drivingLessonId });
    res.json(lessonContents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lesson contents for driving lesson' });
  }
});

// Update Lesson Content
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { driving_lesson_id, title, content, order } = req.body;
    const existingLessonContent = await knex('lesson_contents').where({ id }).first();
    if (!existingLessonContent) {
      return res.status(404).json({ message: 'Lesson content not found' });
    }
    const [updatedLessonContent] = await knex('lesson_contents')
      .where({ id })
      .update({ driving_lesson_id, title, content, order })
      .returning(['id', 'driving_lesson_id', 'title', 'content', 'order', 'created_at', 'updated_at']);
    res.json(updatedLessonContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating lesson content' });
  }
});

// Delete Lesson Content
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingLessonContent = await knex('lesson_contents').where({ id }).first();
    if (!existingLessonContent) {
      return res.status(404).json({ message: 'Lesson content not found' });
    }
    await knex('lesson_contents').where({ id }).del();
    res.json({ message: 'Lesson content deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting lesson content' });
  }
});

export default router;