// Portfolio content — edit this file, then run `npm run seed` to update MongoDB.

export const profile = {
  name: 'Hasith Kenula',
  headline: 'Trainee - Full Stack Developer at Omobio',
  roles: ['Full Stack Developer', 'UI/UX Designer', 'Mobile App Developer'],
  // linked wherever the name appears on the site
  company: { name: 'Omobio', url: 'https://www.omobio.net' },
  university: { name: 'SLIIT', url: 'https://www.sliit.lk' },
  location: 'Dehiowita, Sabaragamuwa Province, Sri Lanka',
  about: [
    'As a second-year undergraduate at SLIIT specializing in Information Technology, I have gained hands-on experience in full-stack development, UI/UX design, mobile app development, and backend technologies through various academic and personal projects.',
    'I am currently a Trainee Full Stack Developer at Omobio, where I build and ship features across the stack. I enjoy turning ideas into clean, user-friendly products and I am always learning new tools and technologies.',
  ],
  // Put your photo at client/public/profile.jpg (falls back to initials if missing)
  avatar: '/profile.jpg',
  address: '287/5B, Kendagaspitiya, Dehiowita',
  email: 'keyhasith800@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/hasithk/',
    github: 'https://github.com/HasithKenula',
  },
  stats: [
    { label: 'Connections', value: '155+' },
    { label: 'Year at SLIIT', value: '2nd' },
    { label: 'Current role', value: 'Omobio' },
  ],
  experience: [
    {
      role: 'Trainee - Full Stack Developer',
      company: 'Omobio',
      companyUrl: 'https://www.omobio.net',
      period: 'Present',
      location: 'Sri Lanka',
      current: true,
      description: [
        'Developing and maintaining full-stack web application features.',
        'Collaborating with the team on frontend, backend and API work.',
      ],
    },
  ],
  education: [
    {
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      institutionUrl: 'https://www.sliit.lk',
      degree: 'BSc (Hons) in Information Technology',
      period: 'Undergraduate - 2nd year',
      details: 'Specializing in Information Technology.',
    },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Java', 'Spring Boot'] },
    { category: 'Databases', items: ['MongoDB', 'MySQL', 'Firebase'] },
    { category: 'Mobile', items: ['React Native', 'Kotlin', 'Android'] },
    { category: 'UI/UX & Tools', items: ['Figma', 'Git & GitHub', 'Jira', 'Postman', 'VS Code'] },
  ],
};

// Projects pulled from https://github.com/HasithKenula — add live demo links in `live` if you have them.
// Thumbnails: drop images into client/public/projects/ using the file names below (a placeholder shows until then).
const GH = 'https://github.com/HasithKenula';

export const projects = [
  {
    title: 'Smart Campus Operations Hub',
    image: '/projects/smart-campus.jpg',
    description:
      'Group project (IT3030 PAF) for managing campus resources: resource catalogue, booking requests including repeat bookings, maintenance tickets with comments and file uploads, technician dashboards and Google sign-in, with separate user and admin portals.',
    tech: ['Spring Boot', 'Java', 'MongoDB', 'React', 'Vite'],
    category: 'Web',
    github: 'https://github.com/mandiniariyarathna/it3030-paf-2026-smart-campus-group-3.2',
    live: '',
    featured: true,
    order: 1,
  },
  {
    title: 'RentXpress',
    image: '/projects/rentxpress.jpg',
    description:
      'Group-built MERN vehicle rental and booking system covering vehicles and inspections, bookings and trips, driver applications, schedules and earnings, payments, finance, invoices, announcements and feedback.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'jsPDF'],
    category: 'Web',
    github: 'https://github.com/Namiweb/RentXpress/tree/development',
    live: '',
    featured: true,
    order: 2,
  },
  {
    title: 'FitTracker',
    image: '/projects/fittracker.jpg',
    description:
      'Android wellness app for tracking daily habits and mood, with background hydration reminders and a user profile and settings.',
    tech: ['Kotlin', 'Android', 'WorkManager', 'Navigation'],
    category: 'Mobile',
    github: `${GH}/FitTracker`,
    live: '',
    featured: true,
    order: 3,
  },
  {
    title: 'TripNest',
    image: '/projects/tripnest.jpg',
    description:
      'Android hotel booking app for finding amazing stays at the best price, with onboarding, sign-up and login, listing details, booking and checkout, payments and notifications.',
    tech: ['Kotlin', 'Android', 'XML Layouts'],
    category: 'Mobile',
    github: `${GH}/TripNest`,
    live: '',
    order: 4,
  },
  {
    title: 'UNI-HOME',
    image: '/projects/unihome.jpg',
    description:
      'Student accommodation platform for SLIIT students to find and book safe, verified housing near campus, with listings for property owners and service providers, reviews and map-based search.',
    tech: ['React', 'Redux', 'Leaflet', 'Render'],
    category: 'Web',
    github: '', // private repo: add the link only if you make it public
    live: 'https://unihome-client.onrender.com',
    featured: true,
    order: 0,
  },
  {
    title: 'MERN Portfolio',
    image: '/projects/portfolio.jpg',
    description:
      'This personal portfolio: a React frontend backed by an Express and MongoDB API, with content served from the database and a working contact form.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    category: 'Web',
    github: GH,
    live: '',
    order: 6,
  },
];
