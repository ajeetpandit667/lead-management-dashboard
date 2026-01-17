# Deployment Guide

## Deploying the Lead Management Dashboard

This guide provides step-by-step instructions to deploy both the backend and frontend using free hosting providers.

## Prerequisites

Before you begin:
- GitHub account with the project pushed
- MongoDB Atlas account (free tier)
- Render or Railway account for backend
- Vercel or Netlify account for frontend
- Internet connection

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create a free account
3. Create a new project
4. Create a free cluster (M0 tier is free)
5. Create a database user with username and password
6. Add your IP to the whitelist (or use 0.0.0.0/0 for development)
7. Get your connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `database-name` with your desired database name

Example format:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/lead-management?retryWrites=true&w=majority
```

## Step 2: Deploy Backend to Render

### Create Render Account and Connect GitHub

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Authorize Render to access your GitHub account

### Create Web Service

1. Click "New +" → "Web Service"
2. Select your repository from the list
3. Configure the service:
   - **Name**: `lead-management-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier (default)

### Add Environment Variables

In the Render dashboard:

1. Scroll down to "Environment Variables"
2. Click "Add Environment Variable" and add:

   | Key | Value |
   |-----|-------|
   | `PORT` | `5000` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Generate a random string (e.g., `your-secret-key-12345`) |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | Your frontend deployed URL (add later) |

3. Click "Create Web Service"

### Get Backend URL

After deployment completes:
- Your backend URL will be: `https://lead-management-backend.onrender.com`
- API base URL: `https://lead-management-backend.onrender.com/api`

## Step 3: Seed Database

After backend is deployed:

1. Run the seed script via terminal (if Render supports it) or:
2. Use MongoDB Compass or Atlas UI to connect directly
3. Or make an API call to trigger seeding (if you add a seed endpoint)

Alternative - Add seed to post-build script in package.json:
```json
"scripts": {
  "start": "node server.js",
  "seed": "node scripts/seed.js",
  "build": "npm run seed"
}
```

## Step 4: Deploy Frontend to Vercel

### Create Vercel Account and Connect GitHub

1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub account

### Create Project

1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Project Name**: `lead-management-dashboard`
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./frontend`

### Add Environment Variables

1. In project settings, go to "Environment Variables"
2. Add:

   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_BASE_URL` | `https://lead-management-backend.onrender.com/api` |

3. Click "Deploy"

### Get Frontend URL

After deployment:
- Your frontend URL: `https://lead-management-dashboard.vercel.app`

## Step 5: Update Backend FRONTEND_URL

After frontend is deployed:

1. Go back to Render backend project
2. Go to "Environment" → "Environment Variables"
3. Update `FRONTEND_URL` to your Vercel deployment URL
4. Render will automatically redeploy

## Alternative: Deploy Frontend to Netlify

### Create Netlify Account

1. Go to https://netlify.com
2. Sign up with GitHub (recommended)

### Deploy

1. Click "Add new site" → "Import an existing project"
2. Choose GitHub and select your repository
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### Add Environment Variables

1. Go to Site settings → "Build & deploy" → "Environment"
2. Add:

   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_BASE_URL` | `https://lead-management-backend.onrender.com/api` |

3. Trigger a new deploy

### Get Frontend URL

- Your frontend URL: `https://lead-management-dashboard.netlify.app` (custom domain available)

## Alternative Backend: Deploy to Railway

### Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway

### Create Project

1. Click "Create New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Configure:
   - Select `backend` folder if needed
   - Add environment variables:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Your JWT secret |
   | `NODE_ENV` | `production` |

### Get URL

- Check the deployment for your service URL

## Testing Deployment

### Backend Health Check

1. Visit: `https://lead-management-backend.onrender.com/api/health`
2. Should return: `{"status":"Server is running"}`

### Test API

Use Postman or curl:

```bash
# Get analytics (requires login first)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://lead-management-backend.onrender.com/api/leads/analytics
```

### Frontend Testing

1. Visit your deployed frontend URL
2. Login with demo credentials:
   - Username: `demo`
   - Password: `demo123`
3. Test features:
   - View leads table
   - Use search and filters
   - View lead details
   - Check analytics

## Troubleshooting Deployment

### Backend Won't Start

**Problem**: Render shows deployment error
- **Solution**: 
  - Check all environment variables are set
  - Verify MongoDB URI is correct
  - Check logs in Render dashboard
  - Ensure JWT_SECRET is set

### Frontend Won't Load

**Problem**: Blank page or can't connect to API
- **Solution**:
  - Check browser console for errors
  - Verify `REACT_APP_API_BASE_URL` is correct
  - Clear browser cache and localStorage
  - Check backend health endpoint

### MongoDB Connection Error

**Problem**: MongooseError or connection timeout
- **Solution**:
  - Verify MongoDB URI format
  - Add server IP to MongoDB Atlas whitelist
  - Check MongoDB cluster is running
  - Verify database credentials

### CORS Errors

**Problem**: "No 'Access-Control-Allow-Origin' header"
- **Solution**:
  - Ensure `FRONTEND_URL` is correctly set in backend
  - Redeploy backend after changing FRONTEND_URL
  - Check CORS middleware in server.js

### Data Not Persisting

**Problem**: Leads disappear after page refresh
- **Solution**:
  - Verify MongoDB connection is working
  - Check database has seeded data
  - Ensure JWT token is valid
  - Check API responses for errors

## Performance Tips

- Free tier services may have cold starts (initial delay)
- Consider upgrading if traffic increases
- Add caching headers to frontend
- Optimize database queries with indexes
- Use CDN for static assets (Vercel/Netlify provide this)

## Monitoring

### Render Dashboard
- View logs and deployment history
- Monitor resource usage
- Set up alerts for failures

### Vercel/Netlify Dashboard
- View build logs
- Monitor page analytics
- Set up notifications

### MongoDB Atlas
- Monitor database performance
- View query profiling
- Set up alerts

## Next Steps for Production

1. Add SSL/TLS certificates (automatic on Render/Vercel)
2. Implement rate limiting
3. Add comprehensive error logging (e.g., Sentry)
4. Set up automated backups for MongoDB
5. Add monitoring and alerts
6. Implement data validation on both client and server
7. Add comprehensive test suite
8. Set up CI/CD pipeline

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)

## Support

For deployment issues:
1. Check service-specific logs
2. Review error messages in browser console
3. Verify all environment variables are set
4. Ensure GitHub repository is public
5. Check internet connectivity

---

**Last Updated**: January 2026
