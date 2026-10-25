import 'dotenv/config';
import { notifyNewMessage } from './config/mailer.js';

// Sends one sample notification to check the Gmail settings. Usage: npm run test-email
try {
  const sent = await notifyNewMessage({
    name: 'Portfolio Test',
    email: process.env.EMAIL_USER || 'test@example.com',
    subject: 'Test email',
    message: 'If you can read this, contact form emails are working.',
  });
  if (sent) console.log(`Test email sent to ${process.env.EMAIL_TO || process.env.EMAIL_USER}. Check your inbox.`);
  else process.exitCode = 1;
} catch (err) {
  console.error('Sending failed:', err.message);
  if (err.code === 'EAUTH') {
    console.error('Gmail rejected the login. Make sure EMAIL_PASS is a 16-letter App Password, not your normal password.');
  }
  process.exitCode = 1;
}
