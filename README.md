# It-Trends-News-App
Group Project For It Trends

## Node.js + React migration (phase 1)

This repository now includes a new Node.js + React stack for all pages

- New React frontend: `client/`
- New Node.js backend: `server/`
- Archived legacy static folders: `archive/legacy-static/`

### Archived legacy folders

The previous static HTML/CSS/JS implementation has been archived to keep the root cleaner for the new Node.js + React setup.

- `archive/legacy-static/Article View/`
- `archive/legacy-static/Bookmark List/`
- `archive/legacy-static/Components/`
- `archive/legacy-static/Explore/`
- `archive/legacy-static/LoginPage/`
- `archive/legacy-static/onboarding page/`
- `archive/legacy-static/Settings Page/`
-  archive/lecacy-static/Settings Page/

### Run the backend

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

### Anthropic setup for AI summaries

Create `server/.env` based on `server/.env.example` and add:

```bash
ANTHROPIC_API_KEY=your_real_key_here
```

The Article View page can then generate AI summaries through the backend.

### Run the frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### Migrated routes in React

- `/onboarding`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/explore`
- `/bookmarks`
- `/article/:id`
- `/settings`
- `/home`

### API endpoints in Node.js

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/explore`
- `GET /api/bookmarks`
- `GET /api/articles/:id`
- `POST /api/articles/:id/summary`
- `GET /api/settings`
- `PUT /api/settings`
