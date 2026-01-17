# Environment Variables Setup for Deployment

## Backend (Vercel or Your Server)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/lead-management?retryWrites=true&w=majority

# JWT Secret (Generate a secure key)
JWT_SECRET=your_super_secure_random_jwt_key_change_this_in_production

# Frontend URL (Your Vercel frontend domain)
FRONTEND_URL=https://your-frontend-vercel-domain.vercel.app

# Additional allowed origins (comma-separated, optional)
ALLOWED_ORIGINS=https://your-frontend-vercel-domain.vercel.app,https://www.your-domain.com
```

## Frontend (Vercel)

Create a `.env.local` file in the `frontend/` directory for local development:

```env
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
CI=false
```

Or set environment variables in Vercel dashboard:

1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add `REACT_APP_API_BASE_URL` with value: `https://your-backend-url.com/api`

## How to Generate JWT_SECRET

Run this in Node.js or terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Important Notes

- **Never commit `.env` files to GitHub** - they contain sensitive data
- Update `FRONTEND_URL` in backend to match your Vercel domain
- Make sure MongoDB connection string is correct
- Test login after deployment to verify API connectivity
