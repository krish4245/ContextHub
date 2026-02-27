# ContextHub — Backend

Quick start (local development):

1. Copy `.env.example` to `.env` and update values.

2. Install dependencies and run server:

```powershell
cd backend
npm install
npm run dev
```

3. Endpoints:
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/auth/profile` — profile (Bearer token)
- `GET /api/projects` — list projects (protected)
- `POST /api/projects` — create project (protected)
- `POST /api/upload/:projectId` — upload ZIP file with form-field `file` (protected)

Notes:
- Local file uploads are stored in `backend/uploads` and temporary extraction in `backend/temp`.
- This is a development setup; production will use Supabase storage and proper SSL.
