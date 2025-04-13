// src/routes/drivingLessons.ts
import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

// Create Driving Lesson
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, duration, is_locked } = req.body;
    const [newDrivingLesson] = await knex('driving_lessons')
      .insert({ title, description, duration, is_locked })
      .returning(['id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at']);
    res.status(201).json(newDrivingLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating driving lesson' });
  }
});

// Get All Driving Lessons
router.get('/', async (req: Request, res: Response) => {
  try {
    const drivingLessons = await knex('driving_lessons').select('id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at');
    res.json(drivingLessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching driving lessons' });
  }
});

// Get Driving Lesson by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const drivingLesson = await knex('driving_lessons')
      .select('id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!drivingLesson) {
      return res.status(404).json({ message: 'Driving lesson not found' });
    }
    res.json(drivingLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching driving lesson' });
  }
});

// Update Driving Lesson
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, duration, is_locked } = req.body;
    const existingDrivingLesson = await knex('driving_lessons').where({ id }).first();
    if (!existingDrivingLesson) {
      return res.status(404).json({ message: 'Driving lesson not found' });
    }
    const [updatedDrivingLesson] = await knex('driving_lessons')
      .where({ id })
      .update({ title, description, duration, is_locked })
      .returning(['id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at']);
    res.json(updatedDrivingLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating driving lesson' });
  }
});

// Delete Driving Lesson
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingDrivingLesson = await knex('driving_lessons').where({ id }).first();
    if (!existingDrivingLesson) {
      return res.status(404).json({ message: 'Driving lesson not found' });
    }
    await knex('driving_lessons').where({ id }).del();
    res.json({ message: 'Driving lesson deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting driving lesson' });
  }
});

export default router;