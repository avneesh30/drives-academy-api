import express, { Request, Response } from 'express';
import knex from '../db';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: VideoTutorials
 *   description: API for managing video tutorials
 */

/**
 * @swagger
 * /video-tutorials:
 *   post:
 *     summary: Create a new video tutorial
 *     tags: [VideoTutorials]
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
 *               duration:
 *                 type: string
 *               video_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video tutorial created successfully
 *       500:
 *         description: Error creating video tutorial
 *   get:
 *     summary: Get all video tutorials
 *     tags: [VideoTutorials]
 *     responses:
 *       200:
 *         description: Video tutorials fetched successfully
 *       500:
 *         description: Error fetching video tutorials
 * /video-tutorials/{id}:
 *   get:
 *     summary: Get video tutorial by ID
 *     tags: [VideoTutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video tutorial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video tutorial fetched successfully
 *       404:
 *         description: Video tutorial not found
 *       500:
 *         description: Error fetching video tutorial
 *   put:
 *     summary: Update video tutorial
 *     tags: [VideoTutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video tutorial to update
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
 *               duration:
 *                 type: string
 *               video_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video tutorial updated successfully
 *       404:
 *         description: Video tutorial not found
 *       500:
 *         description: Error updating video tutorial
 *   delete:
 *     summary: Delete video tutorial
 *     tags: [VideoTutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video tutorial to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video tutorial deleted successfully
 *       404:
 *         description: Video tutorial not found
 *       500:
 *         description: Error deleting video tutorial
 */

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, duration, video_url, thumbnail_url } = req.body;
    const [newVideoTutorial] = await knex('video_tutorials')
      .insert({ title, description, duration, video_url, thumbnail_url })
      .returning(['id', 'title', 'description', 'duration', 'video_url', 'thumbnail_url', 'created_at', 'updated_at']);
    res.status(201).json(newVideoTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating video tutorial' });
  }
});

router.get('/', async (req: Request, res: Response) => { 
  try {
    const videoTutorials = await knex('video_tutorials').select('id', 'title', 'description', 'duration', 'video_url', 'thumbnail_url', 'created_at', 'updated_at');
    res.json(videoTutorials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching video tutorials' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const videoTutorial = await knex('video_tutorials')
      .select('id', 'title', 'description', 'duration', 'video_url', 'thumbnail_url', 'created_at', 'updated_at')
      .where({ id })
      .first();
    if (!videoTutorial) {
      return res.status(404).json({ message: 'Video tutorial not found' });
    }
    res.json(videoTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching video tutorial' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, duration, video_url, thumbnail_url } = req.body;
    const existingVideoTutorial = await knex('video_tutorials').where({ id }).first();
    if (!existingVideoTutorial) {
      return res.status(404).json({ message: 'Video tutorial not found' });
    }
    const [updatedVideoTutorial] = await knex('video_tutorials')
      .where({ id })
      .update({ title, description, duration, video_url, thumbnail_url })
      .returning(['id', 'title', 'description', 'duration', 'video_url', 'thumbnail_url', 'created_at', 'updated_at']);
    res.json(updatedVideoTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating video tutorial' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingVideoTutorial = await knex('video_tutorials').where({ id }).first();
    if (!existingVideoTutorial) {
      return res.status(404).json({ message: 'Video tutorial not found' });
    }
    await knex('video_tutorials').where({ id }).del();
    res.json({ message: 'Video tutorial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting video tutorial' });
  }
});

export default router;