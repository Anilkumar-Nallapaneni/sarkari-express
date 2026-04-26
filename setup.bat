@echo off
REM =====================================================
REM Sarkari Express - Auto Job Fetcher
REM Quick Setup Script for Windows
REM =====================================================

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║   Sarkari Express - Auto Job Fetcher Setup        ║
echo ╚═══════════════════════════════════════════════════╝
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo.

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm not found. Please reinstall Node.js
    pause
    exit /b 1
)

echo ✅ npm found
npm --version
echo.

REM Navigate to server
cd /d "%~dp0server"
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Server folder not found
    pause
    exit /b 1
)

echo 📦 Installing server dependencies...
echo.
call npm install
echo.

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Check for .env file
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
        echo ⚠️  Created .env file
        echo.
        echo ========================================================
        echo IMPORTANT: Edit server\.env with your Supabase credentials
        echo ========================================================
        echo.
        echo 1. Go to https://supabase.com
        echo 2. Open your project → Settings → API
        echo 3. Copy Project URL and Service Role Key
        echo 4. Edit server\.env file
        echo.
    )
)

echo.
echo ========================================================
echo 🚀 Starting Sarkari Express Server
echo ========================================================
echo.
echo Server will run at: http://localhost:5000
echo Auto-fetch scheduled: Daily at 8:00 AM
echo.
echo Press Ctrl+C to stop
echo.

REM Start the server
node index.js

pause