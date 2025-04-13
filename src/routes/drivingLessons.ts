// src/routes/drivingLessons.ts
import express, { Request, Response, Router } from 'express';
import knex from '../db';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /driving-lessons:
 *   post:
 *     summary: Create a new driving lesson
 *     tags: [DrivingLessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the driving lesson
 *               description:
 *                 type: string
 *                 description: Description of the driving lesson
 *               duration:
 *                 type: integer
 *                 description: Duration of the lesson in minutes
 *               is_locked:
 *                 type: boolean
 *                 description: Whether the lesson is locked
 *     responses:
 *       201:
 *         description: Driving lesson created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 is_locked:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error creating driving lesson
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
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

/**
 * @swagger
 * /driving-lessons:
 *   get:
 *     summary: Get all driving lessons
 *     tags: [DrivingLessons]
 *     responses:
 *       200:
 *         description: List of driving lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   is_locked:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching driving lessons
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const drivingLessons = await knex('driving_lessons').select('id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at');
    res.json(drivingLessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching driving lessons' });
  }
});

/**
 * @swagger
 * /driving-lessons/{id}:
 *   get:
 *     summary: Get driving lesson by ID
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Driving lesson ID
 *     responses:
 *       200:
 *         description: Driving lesson found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 is_locked:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error fetching driving lesson
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const drivingLesson = await knex('driving_lessons')
      .select('id', 'title', 'description', 'duration', 'is_locked', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!drivingLesson) {
      res.status(404).json({ message: 'Driving lesson not found' });
      return;
    }
    res.json(drivingLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching driving lesson' });
  }
});

/**
 * @swagger
 * /driving-lessons/{id}:
 *   put:
 *     summary: Update driving lesson
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Driving lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the driving lesson
 *               description:
 *                 type: string
 *                 description: Description of the driving lesson
 *               duration:
 *                 type: integer
 *                 description: Duration of the lesson in minutes
 *               is_locked:
 *                 type: boolean
 *                 description: Whether the lesson is locked
 *     responses:
 *       200:
 *         description: Driving lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 is_locked:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error updating driving lesson
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, duration, is_locked } = req.body;
    const existingDrivingLesson = await knex('driving_lessons').where({ id }).first();
    if (!existingDrivingLesson) {
      res.status(404).json({ message: 'Driving lesson not found' });
      return;
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

/**
 * @swagger
 * /driving-lessons/{id}:
 *   delete:
 *     summary: Delete driving lesson
 *     tags: [DrivingLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Driving lesson ID
 *     responses:
 *       200:
 *         description: Driving lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Driving lesson deleted successfully
 *       404:
 *         description: Driving lesson not found
 *       500:
 *         description: Error deleting driving lesson
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingDrivingLesson = await knex('driving_lessons').where({ id }).first();
    if (!existingDrivingLesson) {
      res.status(404).json({ message: 'Driving lesson not found' });
      return;
    }
    await knex('driving_lessons').where({ id }).del();
    res.json({ message: 'Driving lesson deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting driving lesson' });
  }
});

export default router;