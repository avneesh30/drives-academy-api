// src/routes/lessonContents.ts
import express, { Request, Response, Router } from "express";
import { db } from "../db";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Create Lesson Content
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { lesson_id, content_type, content, order } = req.body;
    const [newContent] = await db("lesson_contents")
      .insert({ lesson_id, content_type, content, order })
      .returning([
        "id",
        "lesson_id",
        "content_type",
        "content",
        "order",
        "created_at",
        "updated_at",
      ]);
    res.status(201).json(newContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating lesson content" });
  }
});

// Get All Lesson Contents
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const contents = await db("lesson_contents").select("*");
    res.json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching lesson contents" });
  }
});

// Get Lesson Content by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const content = await db("lesson_contents").where({ id }).first();
    if (!content) {
      res.status(404).json({ message: "Lesson content not found" });
      return;
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching lesson content" });
  }
});

// Get Lesson Contents by Driving Lesson ID
router.get(
  "/driving-lessons/:drivingLessonId/lesson-contents",
  async (req: Request, res: Response) => {
    try {
      const { drivingLessonId } = req.params;
      const lessonContents = await db("lesson_contents")
        .select(
          "id",
          "driving_lesson_id",
          "title",
          "content",
          "order",
          "created_at",
          "updated_at",
        )
        .where({ driving_lesson_id: drivingLessonId });
      res.json(lessonContents);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching lesson contents for driving lesson" });
    }
  },
);

// Update Lesson Content
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { lesson_id, content_type, content, order } = req.body;
    const existingContent = await db("lesson_contents").where({ id }).first();
    if (!existingContent) {
      res.status(404).json({ message: "Lesson content not found" });
      return;
    }
    const [updatedContent] = await db("lesson_contents")
      .where({ id })
      .update({ lesson_id, content_type, content, order })
      .returning([
        "id",
        "lesson_id",
        "content_type",
        "content",
        "order",
        "created_at",
        "updated_at",
      ]);
    res.json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating lesson content" });
  }
});

// Delete Lesson Content
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingContent = await db("lesson_contents").where({ id }).first();
    if (!existingContent) {
      res.status(404).json({ message: "Lesson content not found" });
      return;
    }
    await db("lesson_contents").where({ id }).del();
    res.json({ message: "Lesson content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting lesson content" });
  }
});

export default router;
