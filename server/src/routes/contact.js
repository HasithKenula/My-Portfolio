import { Router } from 'express';
import Message from '../models/Message.js';
import { notifyNewMessage } from '../config/mailer.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const { name = '', email = '', subject = '', message = '' } = req.body ?? {};

    const errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!EMAIL_RE.test(email.trim())) errors.email = 'A valid email is required';
    if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters';
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Validation failed', errors });

    await Message.create({ name, email, subject, message });

    // The message is already saved, so a mail failure shouldn't fail the request.
    notifyNewMessage({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }).catch(
      (err) => console.error('Failed to send email notification:', err.message)
    );

    res.status(201).json({ message: 'Thanks! Your message has been sent.' });
  } catch (err) {
    next(err);
  }
});

export default router;
