# Quick Start Guide

Get the Lead Management Dashboard running in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- MongoDB Atlas free account (or local MongoDB)
- Git

## Quick Setup

### 1. Get the Code

```bash
git clone https://github.com/yourusername/lead-management-dashboard.git
cd lead-management-dashboard
```

### 2. Backend Setup (Terminal 1)

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string. Find it at MongoDB Atlas:
- Go to mongodb.com/cloud/atlas
- Click "Connect" on your cluster
- Copy the connection string
- Replace `<password>` with your password

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/lead-management?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_change_this
```

Seed the database (creates demo user and 500 leads):
```bash
npm run seed
```

Start the server:
```bash
npm start
```

Expected output:
```
Server running on port 5000
MongoDB Connected: cluster0.xxx.mongodb.net
```

### 3. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view lead-management-frontend in the browser.
  Local:            http://localhost:3000
```

### 4. Login

Open http://localhost:3000 in your browser

Login with demo credentials:
- Username: `demo`
- Password: `demo123`

## What You Can Do

✅ View 500 pre-loaded leads
✅ Search leads by name, email, phone, company
✅ Filter by stage, status, source
✅ Paginate through results
✅ View lead details
✅ Delete leads
✅ View analytics dashboard

## Common Issues

### MongoDB Connection Failed
- ✅ Check your MongoDB URI in .env
- ✅ Whitelist your IP in MongoDB Atlas (use 0.0.0.0/0 for development)
- ✅ Ensure password doesn't have special characters (or URL encode them)

### "Cannot GET /api/leads"
- ✅ Check backend is running on port 5000
- ✅ Check MongoDB connection
- ✅ Check JWT token is in Authorization header

### React app shows blank screen
- ✅ Check browser console for errors
- ✅ Clear localStorage: Right-click → Inspect → Application → Clear Storage
- ✅ Check REACT_APP_API_BASE_URL in frontend/.env

## Next Steps

1. **Deploy**: Follow DEPLOYMENT.md for hosting on free services
2. **Customize**: Add your own lead fields or stages
3. **Enhance**: Add email notifications, reports, etc.

## Project Structure

```
lead-management-dashboard/
├── backend/          # Node/Express API
│   ├── server.js     # Main entry point
│   ├── routes/       # API routes
│   ├── models/       # MongoDB schemas
│   └── scripts/seed.js # Database seeding
├── frontend/         # React app
│   ├── src/
│   │   ├── App.js    # Main component
│   │   ├── components/ # Reusable components
│   │   └── pages/    # Page components
├── README.md         # Full documentation
└── DEPLOYMENT.md     # Deployment guide
```

## API Endpoints (if needed)

```bash
# Login
POST http://localhost:5000/api/auth/login
{"username": "demo", "password": "demo123"}

# Get Leads
GET http://localhost:5000/api/leads
Headers: Authorization: Bearer YOUR_TOKEN

# Get Analytics
GET http://localhost:5000/api/leads/analytics
Headers: Authorization: Bearer YOUR_TOKEN
```

## Production Deployment

When ready to deploy:

1. Backend → Render.com
2. Frontend → Vercel.com
3. Database → MongoDB Atlas (already set up)
4. See DEPLOYMENT.md for detailed instructions

## Support

Check README.md for detailed documentation and troubleshooting.

---

**Ready to go!** 🚀

For questions or issues, see README.md or create an issue on GitHub.
