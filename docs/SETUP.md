# Setup Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn

## Step 1: Backend Setup

1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file from `.env.example`
```bash
cp .env.example .env
```

4. Update `.env` with your configuration
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/indian-stock-tracker
JWT_SECRET=your_secret_key_here
```

5. Start backend server
```bash
npm run dev
```
Server will run on http://localhost:5000

## Step 2: Frontend Setup

1. Navigate to frontend directory (in new terminal)
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```
Frontend will run on http://localhost:3000

## Step 3: Database Setup

If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas:
- Create account at mongodb.com/cloud/atlas
- Create a cluster
- Update MONGODB_URI in .env

## Verification

1. Check backend health: http://localhost:5000/health
2. Check frontend: http://localhost:3000
3. Test API: `curl http://localhost:5000/api/stocks`

## Next Steps

1. Integrate real NSE/BSE APIs
2. Add WebSocket support for real-time updates
3. Implement user authentication UI
4. Build watchlist and portfolio pages
5. Add price alerts notification system

## Troubleshooting

- **Port already in use**: Change PORT in .env
- **MongoDB connection error**: Ensure MongoDB is running
- **CORS errors**: Check backend CORS configuration
