# xborg_auth — development README

Minimal instructions to run the frontend (Next.js) and backend (NestJS) locally.

Prerequisites
- Node.js 20+ installed
- Postgres running locally (or remote) and accessible

Backend (NestJS)
- Folder: `xborg-backend`

1. Edit `xborg-backend/.env` to match your Postgres and Google OAuth credentials.
   - Important values:
     - `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
     - `JWT_SECRET` (change from the default)
     - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
     - `FRONTEND_URL` (e.g. `http://localhost:3000`)

2. Create the Postgres database used by the app (example uses `xborg_dev`):
```bash
createdb xborg_dev
# or using psql:
# psql -c "CREATE DATABASE xborg_dev;"
```

3. Install and run (development):
```bash
cd xborg-backend
npm install
npm run start:dev
```

Backend notes:
- The backend uses TypeORM with Postgres; `synchronize: true` is enabled for development so tables will be created automatically.
- OAuth endpoints:
  - `GET /auth/login/google` — start Google OAuth
  - `GET /auth/validate/google` — callback (sets an httpOnly cookie and redirects to frontend)
  - `GET /auth/logout` — clears cookie and redirects to frontend
- User endpoints (protected by JWT):
  - `GET /user/profile` — get current user profile
  - `PUT /user/profile` — update current user profile

Frontend (Next.js)
- Folder: `xborg-frontend`

1. Configure frontend to talk to backend (create `xborg-frontend/.env.local`):
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

2. Install and run dev server:
```bash
cd xborg-frontend
npm install
npm run dev
```

3. Open the app in a browser:
- Signin page: `http://localhost:3000/signin`
- Profile page: `http://localhost:3000/profile`

Auth behaviour
- Backend sets a secure httpOnly cookie named `token` on successful Google OAuth callback. The frontend uses `fetch(..., { credentials: 'include' })` to call protected endpoints.
- Ensure `xborg-backend/.env` has `FRONTEND_URL` set to your frontend origin so the callback redirects correctly and CORS is configured.

Security & production notes
- Change `JWT_SECRET` to a strong secret in production.
- Set `NODE_ENV=production` in production so cookies are set with `secure: true`.
- Consider disabling `synchronize` and using migrations for production databases.
