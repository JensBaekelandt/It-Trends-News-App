# It-Trends-News-App
Group Project For It Trends

## Node.js + React migration (phase 1)

This repository now includes a new Node.js + React stack for all pages except Home.

- Home page is intentionally **not migrated** and left untouched in `Home/`.
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

`Home/` intentionally remains in the root because it was excluded from the migration.

### Run the backend

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

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

### API endpoints in Node.js

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/explore`
- `GET /api/bookmarks`
- `GET /api/articles/:id`
- `GET /api/settings`
- `PUT /api/settings`
