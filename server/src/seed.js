import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import { profile, projects } from './data/seedData.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

try {
  await connectDB(MONGO_URI);
  await Promise.all([Profile.deleteMany({}), Project.deleteMany({})]);
  await Profile.create(profile);
  await Project.insertMany(projects);
  console.log(`Seeded profile and ${projects.length} projects.`);
} catch (err) {
  console.error('Seeding failed:', err);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
