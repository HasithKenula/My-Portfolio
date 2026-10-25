# Hasith Kenula — MERN Portfolio

Personal portfolio built with **MongoDB, Express, React (Vite) and Node.js**.

```
portfolio/
├── server/            Express + Mongoose API
│   └── src/
│       ├── data/seedData.js   ← all portfolio content lives here
│       ├── models/            Profile, Project, Message
│       └── routes/            /api/profile, /api/projects, /api/contact
└── client/            React frontend (Vite)
    ├── public/        put profile.jpg here
    └── src/components/
```

## Getting started

Requires Node 18+ and MongoDB running locally (or a MongoDB Atlas URI in `server/.env`).

```bash
npm run install:all   # install root, server and client deps
npm run seed          # load content from seedData.js into MongoDB
npm run dev           # API on :5000, website on http://localhost:5173
```

## Editing your content

1. Edit `server/src/data/seedData.js` (profile, skills, experience, education, projects).
2. Run `npm run seed` again.
3. Add your photo as `client/public/profile.jpg`.

Messages sent through the contact form are stored in the `messages` collection.

## Production

```bash
npm run build
NODE_ENV=production npm start   # Express serves the API and the built React app on :5000
```

## Deploy to Render (Blueprint)

`render.yaml` defines one free web service that builds the React app, seeds MongoDB from
`seedData.js` and serves everything from Express.

1. Create a free MongoDB Atlas cluster, allow access from `0.0.0.0/0`, and copy its connection string.
2. Push this repo to GitHub.
3. In Render: **New → Blueprint**, pick the repo, then fill in `MONGO_URI` and `RESEND_API_KEY`.

Render's free plan blocks SMTP, so contact-form emails go through [Resend](https://resend.com)
when `RESEND_API_KEY` is set (Gmail SMTP is used locally otherwise).
