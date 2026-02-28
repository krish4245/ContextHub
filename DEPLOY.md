# Deploying ContextHub to Render (quick guide)

This project is prepared for deployment on Render. Follow the steps below to create a GitHub repo, push the code, and connect Render for automatic deploys.

1) Create a GitHub repository

```bash
# from the project root
git init
git add .
git commit -m "Initial ContextHub"
# create a repo on GitHub and add it as remote, or use GitHub CLI:
# gh repo create your-username/contexthub --public --source=. --remote=origin
git push -u origin main
```

2) Connect to Render

- Go to https://render.com and sign in.
- Choose "New +" → "Blueprint" or "New Web Service" and import your GitHub repo.
- Render will detect services from `render.yaml`. If it doesn't, create two services:
  - Web Service for the backend
    - Build Command: `cd backend && npm install`
    - Start Command: `cd backend && npm run start`
    - Set Environment Variables: `MONGODB_URI`, `JWT_SECRET`
  - Static Site for the frontend
    - Build Command: `cd frontend && npm install && npm run build`
    - Publish Directory: `frontend/dist`

3) Environment variables

On the backend service, add the following environment variables in the Render dashboard:
- `MONGODB_URI` = your MongoDB Atlas connection string
- `JWT_SECRET` = a long random secret

4) Deploy

- Trigger a manual deploy on Render or push to `main` to start an automatic deploy.

Notes
- You can also use the provided `backend/Dockerfile` to run the backend as a Docker service on any provider.
- For quick previews of frontend changes, Vercel is an alternative (fast preview URLs). If you want, I can also add a Vercel config.
