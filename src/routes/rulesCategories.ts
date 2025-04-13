import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { db } from '../db';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/rules-categories:
 *   get:
 *     summary: Get all rules categories
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rules categories
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await db('rulesCategories').select('*');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching rules categories:', error);
    res.status(500).json({ error: 'Failed to fetch rules categories' });
  }
});

/**
 * @swagger
 * /api/rules-categories/{id}:
 *   get:
 *     summary: Get a specific rules category
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
 *         description: Rules category details
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const category = await db('rulesCategories').where('id', req.params.id).first();

    if (!category) {
      return res.status(404).json({ error: 'Rules category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching rules category:', error);
    res.status(500).json({ error: 'Failed to fetch rules category' });
  }
});

export default router;
