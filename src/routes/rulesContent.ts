import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { db } from '../db';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/rules-content:
 *   get:
 *     summary: Get all rules content
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rules content
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const content = await db('rulesContent').select('*');
    res.json(content);
  } catch (error) {
    console.error('Error fetching rules content:', error);
    res.status(500).json({ error: 'Failed to fetch rules content' });
  }
});

/**
 * @swagger
 * /api/rules-content/{id}:
 *   get:
 *     summary: Get a specific rules content
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules content details
 *       404:
 *         description: Content not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const content = await db('rulesContent').where('id', req.params.id).first();

    if (!content) {
      return res.status(404).json({ error: 'Rules content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Error fetching rules content:', error);
    res.status(500).json({ error: 'Failed to fetch rules content' });
  }
});

export default router;
