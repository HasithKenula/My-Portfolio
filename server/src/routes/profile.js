import { Router } from 'express';
import Profile from '../models/Profile.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).json({ message: 'Profile not found. Run `npm run seed`.' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
