import express, { Request, Response, Router } from 'express';
import knex from '../db';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rules
 *   description: API for managing rules categories and content
 */

/**
 * @swagger
 * /rules/categories:
 *   post:
 *     summary: Create a new rules category
 *     tags: [Rules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rules category created successfully
 *       500:
 *         description: Error creating rules category
 *   get:
 *     summary: Get all rules categories
 *     tags: [Rules]
 *     responses:
 *       200:
 *         description: Rules categories fetched successfully
 *       500:
 *         description: Error fetching rules categories
 */

/**
 * @swagger
 * /rules/categories/{id}:
 *   get:
 *     summary: Get rules category by ID
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules category fetched successfully
 *       404:
 *         description: Rules category not found
 *       500:
 *         description: Error fetching rules category
 *   put:
 *     summary: Update rules category
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules category to update
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
 *     responses:
 *       200:
 *         description: Rules category updated successfully
 *       404:
 *         description: Rules category not found
 *       500:
 *         description: Error updating rules category
 *   delete:
 *     summary: Delete rules category
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules category deleted successfully
 *       404:
 *         description: Rules category not found
 *       500:
 *         description: Error deleting rules category
 */

/**
 * @swagger
 * /rules/content:
 *   post:
 *     summary: Create new rules content
 *     tags: [Rules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rules content created successfully
 *       500:
 *         description: Error creating rules content
 *   get:
 *     summary: Get all rules content
 *     tags: [Rules]
 *     responses:
 *       200:
 *         description: Rules content fetched successfully
 *       500:
 *         description: Error fetching rules content
 */

/**
 * @swagger
 * /rules/content/{id}:
 *   get:
 *     summary: Get rules content by ID
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules content
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules content fetched successfully
 *       404:
 *         description: Rules content not found
 *       500:
 *         description: Error fetching rules content
 *   put:
 *     summary: Update rules content
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules content to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rules content updated successfully
 *       404:
 *         description: Rules content not found
 *       500:
 *         description: Error updating rules content
 *   delete:
 *     summary: Delete rules content
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rules content to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules content deleted successfully
 *       404:
 *         description: Rules content not found
 *       500:
 *         description: Error deleting rules content
 */

/**
 * @swagger
 * /rules/categories/{categoryId}/content:
 *   get:
 *     summary: Get all rules content for a category
 *     tags: [Rules]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the rules category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rules content fetched successfully
 *       500:
 *         description: Error fetching rules content
 */

// Rules Categories Routes
router.post('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const [newCategory] = await knex('rules_categories')
      .insert({ title })
      .returning(['id', 'title', 'created_at', 'updated_at']);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating rules category' });
  }
});

router.get('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await knex('rules_categories').select('*');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rules categories' });
  }
});

router.get('/categories/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await knex('rules_categories').where({ id }).first();
    if (!category) {
      res.status(404).json({ message: 'Rules category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rules category' });
  }
});

router.put('/categories/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const existingCategory = await knex('rules_categories').where({ id }).first();
    if (!existingCategory) {
      res.status(404).json({ message: 'Rules category not found' });
      return;
    }
    const [updatedCategory] = await knex('rules_categories')
      .where({ id })
      .update({ title })
      .returning(['id', 'title', 'created_at', 'updated_at']);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating rules category' });
  }
});

router.delete('/categories/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingCategory = await knex('rules_categories').where({ id }).first();
    if (!existingCategory) {
      res.status(404).json({ message: 'Rules category not found' });
      return;
    }
    await knex('rules_categories').where({ id }).del();
    res.json({ message: 'Rules category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting rules category' });
  }
});

// Rules Content Routes
router.post('/content', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category_id, title, content } = req.body;
    const [newContent] = await knex('rules_content')
      .insert({ category_id, title, content })
      .returning(['id', 'category_id', 'title', 'content', 'created_at', 'updated_at']);
    res.status(201).json(newContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating rules content' });
  }
});

router.get('/content', async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await knex('rules_content').select('*');
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rules content' });
  }
});

router.get('/content/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const content = await knex('rules_content').where({ id }).first();
    if (!content) {
      res.status(404).json({ message: 'Rules content not found' });
      return;
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rules content' });
  }
});

router.put('/content/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category_id, title, content } = req.body;
    const existingContent = await knex('rules_content').where({ id }).first();
    if (!existingContent) {
      res.status(404).json({ message: 'Rules content not found' });
      return;
    }
    const [updatedContent] = await knex('rules_content')
      .where({ id })
      .update({ category_id, title, content })
      .returning(['id', 'category_id', 'title', 'content', 'created_at', 'updated_at']);
    res.json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating rules content' });
  }
});

router.delete('/content/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingContent = await knex('rules_content').where({ id }).first();
    if (!existingContent) {
      res.status(404).json({ message: 'Rules content not found' });
      return;
    }
    await knex('rules_content').where({ id }).del();
    res.json({ message: 'Rules content deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting rules content' });
  }
});

router.get('/categories/:categoryId/content', async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const content = await knex('rules_content')
      .where({ category_id: categoryId })
      .select('*');
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rules content for category' });
  }
});

export default router; 