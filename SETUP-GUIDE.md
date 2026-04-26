# Sarkari Express - Auto Job Fetch Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Server Installation](#server-installation)
4. [Environment Configuration](#environment-configuration)
5. [Running the Server](#running-the-server)
6. [Deployment Options](#deployment-options)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Latest | `git --version` |
| Supabase Account | Free | [supabase.com](https://supabase.com) |

---

## 🗄️ Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in details:
   - **Name**: `sarkari-express`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Select closest to you (India: `ap-south-1`)
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### 1.2 Get API Credentials

1. Go to **Settings** (⚙️ icon) → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: Click "Generate new key" → Copy

⚠️ **IMPORTANT**: Keep the `service_role` key secret! Never expose it in frontend code.

### 1.3 Run Database Schema

1. In Supabase Dashboard, click **SQL Editor** in left sidebar
2. Copy all content from [server/supabase-schema.sql](server/supabase-schema.sql)
3. Paste into the SQL Editor
4. Click **Run** button
5. You should see "Success" messages

---

## 📦 Step 2: Server Installation

### 2.1 Navigate to Server Directory

```bash
cd c:\Users\AnilPraveen\sarkari-express\server
```

### 2.2 Install Dependencies

```bash
npm install
```

Expected output:
```
added 120 packages in 15s
```

### 2.3 Create Environment File

```bash
copy .env.example .env
```

Edit `.env` file with your credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
PORT=5000
```

---

## 🚀 Step 3: Running the Server

### 3.1 Development Mode (Local Testing)

```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════╗
║   🚀 Sarkari Express Server Started              ║
║   Server URL: http://localhost:5000               ║
║   ⏰ Auto-fetch scheduled: Daily at 8:00 AM      ║
╚═══════════════════════════════════════════════════╝
```

### 3.2 Test Manual Fetch

Open another terminal:
```bash
curl -X POST http://localhost:5000/api/fetch-jobs
```

Expected response:
```json
{"success":true,"count":5}
```

### 3.3 Check Jobs API

```bash
curl http://localhost:5000/api/jobs
```

---

## ☁️ Step 4: Deployment Options

### Option A: Render.com (Free Tier) - RECOMMENDED

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create GitHub repo and push
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com) → Sign in
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `sarkari-express-server`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Environment**: `Node`
   - Add Environment Variables:
     - `SUPABASE_URL`: Your Supabase URL
     - `SUPABASE_SERVICE_KEY`: Your service key
   - Click **"Create Web Service"**

3. **Wait 2-3 minutes** for deployment

4. **Test**: Visit `https://your-app.onrender.com/api/health`

### Option B: Railway.app

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Empty Project"**
3. Connect GitHub repo
4. Add environment variables in Railway dashboard
5. Deploy!

### Option C: Fly.io (Free Tier)

```bash
# Install flyctl
winget install flyctl

# Login
fly auth login

# Launch
fly launch --name sarkari-express

# Set secrets
fly secrets set SUPABASE_URL=your-url
fly secrets set SUPABASE_SERVICE_KEY=your-key
```

### Option D: VPS (DigitalOcean/Render/Contabo)

1. Create a VPS (Ubuntu 20.04+)
2. SSH into server:
   ```bash
   ssh root@your-server-ip
   ```

3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   ```

4. Clone and setup:
   ```bash
   git clone your-repo
   cd sarkari-express/server
   npm install
   ```

5. Create systemd service:
   ```bash
   nano /etc/systemd/system/sarkari-express.service
   ```

   Paste:
   ```ini
   [Unit]
   Description=Sarkari Express Job Fetcher
   After=network.target

   [Service]
   Type=simple
   User=root
   WorkingDirectory=/root/sarkari-express/server
   ExecStart=/usr/bin/node index.js
   Restart=always
   Environment=NODE_ENV=production

   [Install]
   WantedBy=multi-user.target
   ```

6. Enable and start:
   ```bash
   systemctl daemon-reload
   systemctl enable sarkari-express
   systemctl start sarkari-express
   ```

---

## ⏰ Step 5: Scheduler Configuration

### Default Schedule: Daily 8 AM

The server is pre-configured to run at 8:00 AM daily:

```javascript
// In server/index.js
const SCHEDULE = '0 8 * * *';  // Second, Minute, Hour, Day, Month
```

### Custom Schedule Options

| Schedule | Cron Expression | Description |
|----------|-----------------|-------------|
| Every day at 8 AM | `0 8 * * *` | Default |
| Every day at 6 AM | `0 6 * * *` | Early morning |
| Every 6 hours | `0 */6 * * *` | Every 6 hours |
| Twice a day | `0 8,20 * * *` | 8 AM and 8 PM |
| Every Monday at 8 AM | `0 8 * * 1` | Weekly |

To change, edit `server/index.js` line:
```javascript
const SCHEDULE = '0 8 * * *';
```

---

## 📊 Step 6: Monitoring & Logs

### 6.1 View Server Logs (Local)

```bash
# Development
npm start

# Production (PM2)
pm2 logs sarkari-express
```

### 6.2 View Fetch Logs in Database

Run this SQL in Supabase:
```sql
SELECT * FROM fetch_logs ORDER BY fetch_time DESC LIMIT 20;
```

### 6.3 Health Check

```bash
curl https://your-server.com/api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Sarkari Express Server Running",
  "lastFetch": "2025-04-25T08:00:00.000Z"
}
```

---

## 🔍 Step 7: Add More Job Sources

To add more job sources, edit `server/index.js`:

```javascript
// Add new source
const JOB_SOURCES = [
  {
    name: 'Your Source Name',
    baseUrl: 'https://example.com',
  }
];

// Create fetch function
async function fetchFromYourSource() {
  const jobs = [];
  // Fetch and parse jobs here
  // Use axios for HTTP requests
  // Use cheerio for HTML parsing
  return jobs;
}
```

### Example: Adding FreshersLive

```bash
cd server
npm install cheerio axios
```

```javascript
// filepath: server/index.js (add this function)
const cheerio = require('cheerio');

async function fetchFromFreshersLive() {
  try {
    const response = await axios.get('https://www.fresherslive.com/govt-jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const $ = cheerio.load(response.data);
    const jobs = [];
    
    $('.job-list-item').each((i, el) => {
      jobs.push({
        source: 'FreshersLive',
        title: $(el).find('.job-title').text().trim(),
        organization: $(el).find('.company').text().trim(),
        // ... map other fields
      });
    });
    
    return jobs;
  } catch (error) {
    console.error('Error fetching:', error.message);
    return [];
  }
}
```

---

## ❓ Step 8: Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `SUPABASE_URL not set` | Check your `.env` file |
| `Connection refused` | Check Supabase project status |
| `CORS error` | Add your domain to allowed origins |
| `Cron not running` | Check server logs for errors |
| `Jobs not saving` | Check RLS policies in Supabase |

### Debug Mode

```javascript
// In server/index.js, add at top:
process.env.DEBUG = '*';
```

### Check Database Connection

Run in Supabase SQL Editor:
```sql
SELECT current_database();
```

Should return: `postgres`

### Reset Database

```sql
-- Delete all jobs
DELETE FROM jobs;

-- Delete all logs
DELETE FROM fetch_logs;
```

---

## 📞 Step 9: API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/fetch-jobs` | Manual trigger fetch |
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs?state=up` | Filter by state |
| GET | `/api/jobs?category=railway` | Filter by category |

### Example: Filter Jobs

```bash
# Get jobs from Uttar Pradesh
curl "http://localhost:5000/api/jobs?state=up"

# Get Railway jobs
curl "http://localhost:5000/api/jobs?category=railway"
```

---

## 🎯 Step 10: Frontend Integration

Update your React app to fetch from your server instead of mock data:

### 10.1 Update supabaseClient.js

```javascript
// filepath: src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add this function to fetch jobs
export const fetchJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('fetched_at', { ascending: false })
  
  if (error) throw error
  return data
}
```

### 10.2 Update JobCard.jsx to use real data

```javascript
// filepath: src/components/JobCard.jsx
// Replace mock data with:
import { fetchJobs } from '../supabaseClient'

// In your component:
useEffect(() => {
  fetchJobs().then(setJobs)
}, [])
```

---

## ✅ Final Checklist

- [ ] Supabase project created
- [ ] Database schema run
- [ ] API credentials saved
- [ ] Server dependencies installed
- [ ] Environment variables configured
- [ ] Server tested locally
- [ ] Manual fetch tested
- [ ] Jobs visible in database
- [ ] Deployed to production
- [ ] Health check working
- [ ] Scheduler verified

---

## 📞 Support

If you face issues:
1. Check server logs
2. Verify Supabase credentials
3. Check database tables exist
4. Verify environment variables

---

**Happy Coding! 🚀**
**Sarkari Express - Auto Job Fetcher**