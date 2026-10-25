import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: String,
    company: String,
    companyUrl: String,
    period: String,
    location: String,
    description: [String],
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    institutionUrl: String,
    degree: String,
    period: String,
    details: String,
  },
  { _id: false }
);

const skillGroupSchema = new mongoose.Schema(
  {
    category: String,
    items: [String],
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headline: String,
    roles: [String],
    company: { name: String, url: String },
    university: { name: String, url: String },
    location: String,
    address: String,
    about: [String],
    avatar: String,
    email: String,
    socials: {
      linkedin: String,
      github: String,
    },
    stats: [{ label: String, value: String, _id: false }],
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillGroupSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
