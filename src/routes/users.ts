// src/routes/users.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../db'; // Import the knex instance

const router = express.Router();

// User registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [newUser] = await knex('users')
      .insert({ name, surname, email, password: hashedPassword })
      .returning(['id', 'name', 'surname', 'email', 'created_at', 'updated_at']);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await knex('users').where({ email }).first();

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user info without password
    const { password: userPassword, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await knex('users')
      .select('id', 'name', 'surname', 'email', 'created_at', 'updated_at')
      .where({ id })
      .first();

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;

    // Check if user exists
    const existingUser = await knex('users').where({ id }).first();
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (surname) updateData.surname = surname;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // Update the user
    const [updatedUser] = await knex('users')
      .where({ id })
      .update(updateData)
      .returning(['id', 'name', 'surname', 'email', 'created_at', 'updated_at']);

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await knex('users').where({ id }).first();
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await knex('users').where({ id }).del();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
