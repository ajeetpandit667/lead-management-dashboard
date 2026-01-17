# GitHub Setup & Deployment Checklist

Complete this checklist to get your application deployed!

## Phase 1: Local Testing ✅

### Backend Testing
- [ ] Backend files are created in `lead-management-dashboard/backend/`
- [ ] Run `npm install` in backend folder
- [ ] Copy `.env.example` to `.env`
- [ ] Get MongoDB Atlas connection string and add to `.env`
- [ ] Run `npm run seed` - should seed 500 leads
- [ ] Run `npm start` - should start on port 5000
- [ ] Visit `http://localhost:5000/api/health` - should return `{"status":"Server is running"}`

### Frontend Testing
- [ ] Frontend files are created in `lead-management-dashboard/frontend/`
- [ ] Run `npm install` in frontend folder
- [ ] Copy `.env.example` to `.env` (default values should work)
- [ ] Run `npm start` - should start on port 3000
- [ ] Login page should appear with demo credentials pre-filled
- [ ] Login with username: `demo`, password: `demo123`
- [ ] Should see leads table with 10 leads per page
- [ ] Test search functionality
- [ ] Test filters (stage, status, source)
- [ ] Test pagination
- [ ] Click view on a lead to see details modal
- [ ] Test delete lead button

## Phase 2: GitHub Repository 📦

### Create GitHub Repository

1. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `lead-management-dashboard`
   - Description: `A full-stack CRM-style lead management dashboard with React, Node.js, and MongoDB`
   - Make it **PUBLIC** (required)
   - Check "Initialize this repository with a README" (optional - we have one)
   - Click "Create repository"

2. **Add Files to Git**
   ```bash
   cd lead-management-dashboard
   git init
   git add .
   git commit -m "Initial commit: Complete lead management dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lead-management-dashboard.git
   git push -u origin main
   ```

3. **Verify on GitHub**
   - [ ] All backend files visible
   - [ ] All frontend files visible
   - [ ] README.md visible
   - [ ] DEPLOYMENT.md visible
   - [ ] Files in correct folders

### GitHub Settings

1. **Repository Settings**
   - Go to Settings → General
   - [ ] Make sure visibility is PUBLIC
   - [ ] Enable "Discussions" (optional)

2. **Add GitHub Topics** (optional but recommended)
   - Add: `crm`, `lead-management`, `react`, `nodejs`, `mongodb`

## Phase 3: Backend Deployment (Render) 🌐

### Prepare Backend for Deployment

1. **Ensure `.env.example` is correct**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/lead-management?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

2. **Check `package.json` has correct scripts**
   - `start` script should be `node server.js`
   - `seed` script should be `node scripts/seed.js`

### Deploy to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub (recommended)
   - [ ] Authorize Render to access your GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - [ ] Select your `lead-management-dashboard` repository
   - [ ] Choose the repository

3. **Configure Service**
   - [ ] Name: `lead-management-backend`
   - [ ] Environment: `Node`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`
   - [ ] Instance Type: Keep as default (free)

4. **Add Environment Variables**
   Click "Add Environment Variable" for each:
   
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Generate a strong random string |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | You'll update this after frontend is deployed |

5. **Deploy**
   - [ ] Click "Create Web Service"
   - [ ] Wait for deployment (may take 5-10 minutes)
   - [ ] Check logs for any errors
   - [ ] Note your backend URL (e.g., `https://lead-management-backend.onrender.com`)

6. **Test Backend**
   - [ ] Visit `https://lead-management-backend.onrender.com/api/health`
   - [ ] Should return `{"status":"Server is running"}`

### Seed Database on Render

Option 1: Via Terminal (if available)
```bash
# In Render shell
npm run seed
```

Option 2: Manually via MongoDB Atlas
- Go to MongoDB Atlas
- Open your cluster
- Browse Collections
- Add sample data manually

## Phase 4: Frontend Deployment (Vercel) 🎨

### Deploy to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub (recommended)
   - [ ] Authorize Vercel to access your GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - [ ] Select your GitHub repository
   - [ ] Choose `lead-management-dashboard`

3. **Configure Project**
   - Framework Preset: `Create React App`
   - [ ] Root Directory: Set to `./frontend`
   - Build Command: Should auto-fill as `npm run build`
   - Output Directory: Should auto-fill as `build`

4. **Add Environment Variable**
   - [ ] Key: `REACT_APP_API_BASE_URL`
   - [ ] Value: `https://lead-management-backend.onrender.com/api`
     (Use your actual Render backend URL)

5. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait for deployment (3-5 minutes)
   - [ ] Note your frontend URL

6. **Test Frontend**
   - [ ] Visit your Vercel deployment URL
   - [ ] Login with demo/demo123
   - [ ] Verify leads load
   - [ ] Test search and filters

## Phase 5: Final Configuration 🔧

### Update Backend FRONTEND_URL

Now that frontend is deployed:

1. **Go to Render Dashboard**
   - [ ] Find your `lead-management-backend` service
   - [ ] Go to Environment variables
   - [ ] Update `FRONTEND_URL` to your Vercel URL
     (e.g., `https://lead-management-dashboard.vercel.app`)
   - [ ] Click "Update"
   - [ ] Render auto-redeployes

### Test Full Application

1. **Frontend Testing**
   - [ ] Navigate to frontend URL
   - [ ] Login works
   - [ ] Leads display
   - [ ] Search works
   - [ ] Filters work
   - [ ] Pagination works
   - [ ] Lead details modal works
   - [ ] Delete functionality works

2. **Cross-Browser Testing**
   - [ ] Test on Chrome
   - [ ] Test on Firefox
   - [ ] Test on Safari
   - [ ] Test on Mobile (iPhone/Android)

## Phase 6: Documentation ✍️

### Update Files for Deployment

1. **Update README.md**
   - [ ] Add deployed URLs to the top
   - [ ] Update MongoDB URI instructions
   - [ ] Verify all links work

2. **Create/Update Files**
   - [ ] README.md - Complete documentation ✅
   - [ ] DEPLOYMENT.md - Deployment guide ✅
   - [ ] QUICK_START.md - Quick start guide ✅
   - [ ] PROJECT_SUMMARY.md - Project overview ✅

## Phase 7: Final Checklist ✅

### Before Considering Complete

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Can login with demo credentials
- [ ] Can view all 500+ leads
- [ ] Search functionality works
- [ ] All filters work
- [ ] Pagination works
- [ ] Lead details modal works
- [ ] Delete leads works
- [ ] Analytics display correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] GitHub repo is public
- [ ] All documentation updated
- [ ] CORS working properly

## Deployment URLs Format

Once deployed, you'll have:

```
Frontend (Vercel):  https://lead-management-dashboard.vercel.app
Backend (Render):   https://lead-management-backend.onrender.com
API Base URL:       https://lead-management-backend.onrender.com/api
Database:           MongoDB Atlas (cloud hosted)
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't deploy | Check all env vars are set |
| Frontend shows error | Clear cache and localStorage |
| Can't login | Run `npm run seed` in backend |
| API returns 404 | Check `REACT_APP_API_BASE_URL` |
| CORS error | Update `FRONTEND_URL` in backend |

## Support Information

For detailed help:
1. See README.md for full documentation
2. See DEPLOYMENT.md for deployment issues
3. See QUICK_START.md for local setup
4. Check browser console for errors
5. Check Render/Vercel logs for server errors

## Final Notes

- Keep your `JWT_SECRET` secure - never share it
- Never commit `.env` files to GitHub
- Free tier services may have limitations
- Test thoroughly before sharing
- Keep documentation updated
- Monitor your deployments

## What's Next?

After deployment:
1. Share your application link
2. Get user feedback
3. Plan enhancements
4. Consider upgrading hosting if needed
5. Add more features based on requirements

## Success Criteria ✨

Your deployment is successful when:
- ✅ Frontend loads at your Vercel URL
- ✅ You can login with demo/demo123
- ✅ You can see 500+ leads
- ✅ All features work (search, filter, pagination, etc.)
- ✅ No errors in console or logs
- ✅ Responsive design works on mobile

---

**Congratulations on your deployment!** 🎉

You've successfully built and deployed a full-stack CRM application!

Share your deployment URLs and celebrate your accomplishment!

---

*Deployment Checklist - Last Updated: January 2026*
