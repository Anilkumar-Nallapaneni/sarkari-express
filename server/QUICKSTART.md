# Sarkari Express - Quick Start Scripts

## One-Command Setup (Windows)

Run this in PowerShell (as Administrator):

```powershell
# Navigate to project
cd c:\Users\AnilPraveen\sarkari-express

# 1. Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Cyan
cd server
npm install

# 2. Copy env file
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env file - Please edit with your Supabase credentials!" -ForegroundColor Yellow
}

# 3. Test server
Write-Host "`nStarting server for testing..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray

# Start server
node index.js
```

## Manual Setup Steps

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Environment
```bash
copy .env.example .env
```

Edit `.env` with your Supabase credentials:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
PORT=5000
```

### Step 3: Run Server
```bash
npm start
```

### Step 4: Test
```bash
# In another terminal
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/fetch-jobs
curl http://localhost:5000/api/jobs
```

## Deployment Commands

### Render.com
```bash
# Build and deploy
npm run build
# Push to GitHub, Render will auto-deploy
```

### PM2 (Production)
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server/index.js --name sarkari-express

# View logs
pm2 logs sarkari-express

# Restart
pm2 restart sarkari-express
```

## Cron Schedule Reference

Edit `server/index.js` line 180:
```javascript
const SCHEDULE = '0 8 * * *';
```

| Time | Cron |
|------|------|
| 8:00 AM | `0 8 * * *` |
| 6:00 AM | `0 6 * * *` |
| 12:00 PM | `0 12 * * *` |
| 8:00 PM | `0 20 * * *` |

## Troubleshooting

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process on port 5000
taskkill /PID <PID> /F

# Clear npm cache
npm cache clean --force
```

## Database Check

In Supabase SQL Editor:
```sql
-- Check jobs table
SELECT COUNT(*) FROM jobs;

-- Check latest jobs
SELECT title, organization, deadline FROM jobs ORDER BY fetched_at DESC LIMIT 10;

-- Check fetch logs
SELECT * FROM fetch_logs ORDER BY fetch_time DESC LIMIT 5;
```