import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1 }).lean();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

export default router;
