import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Message from './models/Message.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Prints contact-form messages, newest first. Usage: npm run messages
try {
  await connectDB(MONGO_URI);
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  if (!messages.length) console.log('\nNo messages yet.');
  for (const m of messages) {
    console.log('\n' + '─'.repeat(60));
    console.log(`From:    ${m.name} <${m.email}>`);
    console.log(`Date:    ${m.createdAt.toLocaleString()}`);
    if (m.subject) console.log(`Subject: ${m.subject}`);
    console.log(`\n${m.message}`);
  }
  console.log(`\n${messages.length} message(s) total.`);
} catch (err) {
  console.error('Could not read messages:', err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
