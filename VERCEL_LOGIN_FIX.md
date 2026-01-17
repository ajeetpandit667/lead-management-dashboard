# Quick Fix for Login Issues on Vercel

## The Problem
- Frontend on Vercel can't communicate with backend API
- CORS is blocking requests from Vercel domain
- Environment variables not configured for production

## The Solution

### Step 1: Update Backend Environment Variables

If your backend is on Vercel or any hosting:

1. Set these environment variables:
   ```
   FRONTEND_URL=https://your-vercel-frontend-domain.vercel.app
   ALLOWED_ORIGINS=https://your-vercel-frontend-domain.vercel.app
   ```

2. Example:
   ```
   FRONTEND_URL=https://lead-dashboard.vercel.app
   ALLOWED_ORIGINS=https://lead-dashboard.vercel.app
   ```

### Step 2: Update Frontend Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add or update:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.com/api
   ```

3. Example (if backend is on Render or another service):
   ```
   REACT_APP_API_BASE_URL=https://lead-backend-api.onrender.com/api
   ```

### Step 3: Redeploy

1. **Frontend**: Vercel automatically redeploys when env vars change, or manually trigger deploy
2. **Backend**: Redeploy on your hosting service

### Step 4: Test Login

1. Go to your Vercel frontend URL
2. Try logging in with demo credentials:
   - Username: `demo`
   - Password: `demo123`

## If Still Having Issues

1. **Check Backend Health**: 
   - Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"Server is running"}`

2. **Check Browser Console**:
   - Press F12, go to Console
   - Look for CORS errors or 404 errors
   - Check Network tab to see API requests

3. **Verify MongoDB Connection**:
   - Make sure `MONGODB_URI` is correct in backend
   - Test with demo account created locally first

## Environment Variables Checklist

- [ ] Backend: `FRONTEND_URL` set to Vercel domain
- [ ] Backend: `ALLOWED_ORIGINS` set to Vercel domain
- [ ] Backend: `MONGODB_URI` points to MongoDB Atlas
- [ ] Backend: `JWT_SECRET` is set to a secure value
- [ ] Frontend: `REACT_APP_API_BASE_URL` points to backend API
- [ ] Backend is deployed and running
- [ ] Frontend is deployed on Vercel
