import express, { Request, Response } from "express";
import { authenticateToken } from "../middleware/auth";
import { db } from "../db";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/road-rules-categories:
 *   get:
 *     summary: Get all road rules categories
 *     tags: [Road Rules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of road rules categories
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await db("roadRulesCategories").select("*");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching road rules categories:", error);
    res.status(500).json({ error: "Failed to fetch road rules categories" });
  }
});

/**
 * @swagger
 * /api/road-rules-categories/{id}:
 *   get:
 *     summary: Get a specific road rules category
 *     tags: [Road Rules]
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
 *         description: Road rules category details
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const category = await db("roadRulesCategories")
      .where("id", req.params.id)
      .first();

    if (!category) {
      return res.status(404).json({ error: "Road rules category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error fetching road rules category:", error);
    res.status(500).json({ error: "Failed to fetch road rules category" });
  }
});

export default router;
