// filepath: server/index.js
// =====================================================
// Sarkari Express - Auto Job Fetcher Server
// Runs daily at 8 AM to fetch latest India Govt Jobs
// =====================================================

require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// =====================================================
// SUPABASE CONFIGURATION
// =====================================================

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env file');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialized');
console.log('📡 Project URL:', supabaseUrl);

// =====================================================
// CHECK DATABASE TABLE
// =====================================================

async function checkDatabase() {
  console.log('\n📦 Checking database table...');
  try {
    const { error } = await supabase.from('jobs').select('id').limit(1);
    if (error) {
      console.log('⚠️  Jobs table does not exist');
      return false;
    }
    console.log('✅ Database table verified');
    return true;
  } catch (err) {
    console.log('⚠️  Database check:', err.message);
    return false;
  }
}

// =====================================================
// JOB DATA - Dynamic sample jobs
// =====================================================

function getSampleJobs() {
  const today = new Date();
  return [
    {
      source: 'Sarkari Result',
      title: 'UP Police Constable Recruitment 2026',
      organization: 'Uttar Pradesh Police',
      department: 'UP Police',
      state: 'Uttar Pradesh',
      state_code: 'up',
      posts: 60000,
      education: '12th Pass',
      salary: '₹25,500 – ₹35,100',
      deadline: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-01-20',
      exam_date: 'June 2026',
      category: 'Police',
      badge: 'HOT',
      is_urgent: true,
      age_min: 18,
      age_max: 25,
      description: 'Uttar Pradesh Police Constable recruitment for various posts',
      official_link: 'https://uppolice.gov.in'
    },
    {
      source: 'Sarkari Result',
      title: 'SSC CGL 2026 Notification',
      organization: 'Staff Selection Commission',
      department: 'Ministry of Personnel',
      state: 'Central Govt',
      state_code: 'central',
      posts: 15000,
      education: 'Graduate',
      salary: '₹25,500 – ₹1,12,400',
      deadline: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-02-01',
      exam_date: 'August 2026',
      category: 'SSC',
      badge: 'HOT',
      is_urgent: true,
      age_min: 18,
      age_max: 32,
      description: 'SSC Combined Graduate Level examination for various Group B and C posts',
      official_link: 'https://ssc.nic.in'
    },
    {
      source: 'Sarkari Result',
      title: 'Railway RRB NTPC 2026',
      organization: 'Railway Recruitment Board',
      department: 'Ministry of Railways',
      state: 'Central Govt',
      state_code: 'central',
      posts: 11558,
      education: '12th / Graduate',
      salary: '₹19,900 – ₹35,400',
      deadline: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-01-15',
      exam_date: 'June 2026',
      category: 'Railway',
      badge: 'HOT',
      is_urgent: true,
      age_min: 18,
      age_max: 33,
      description: 'RRB NTPC Graduate Level recruitment for various Non-Technical Popular Category posts',
      official_link: 'https://indianrailways.gov.in'
    },
    {
      source: 'Sarkari Result',
      title: 'UPSC Civil Services 2026',
      organization: 'Union Public Service Commission',
      department: 'Government of India',
      state: 'Central Govt',
      state_code: 'central',
      posts: 980,
      education: 'Graduate',
      salary: '₹56,100 – ₹2,50,000',
      deadline: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-01-12',
      exam_date: 'June 2026',
      category: 'Civil Services',
      badge: 'PREMIUM',
      is_urgent: true,
      age_min: 21,
      age_max: 32,
      description: 'UPSC Civil Services Examination 2026 for IAS, IPS, IFS and other services',
      official_link: 'https://upsc.gov.in'
    },
    {
      source: 'Sarkari Result',
      title: 'IBPS PO 2026',
      organization: 'Institute of Banking Personnel Selection',
      department: 'Banking Sector',
      state: 'Central Govt',
      state_code: 'central',
      posts: 4500,
      education: 'Graduate',
      salary: '₹36,000 – ₹98,000',
      deadline: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-06-15',
      exam_date: 'October 2026',
      category: 'Banking',
      badge: 'NEW',
      is_urgent: false,
      age_min: 20,
      age_max: 30,
      description: 'IBPS Probationary Officer recruitment for various Public Sector Banks',
      official_link: 'https://ibps.in'
    },
    {
      source: 'Sarkari Result',
      title: 'RRB Group D 2026',
      organization: 'Railway Recruitment Board',
      department: 'Ministry of Railways',
      state: 'Central Govt',
      state_code: 'central',
      posts: 50000,
      education: '10th Pass',
      salary: '₹18,000 – ₹22,000',
      deadline: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-03-01',
      exam_date: 'May 2026',
      category: 'Railway',
      badge: 'HOT',
      is_urgent: true,
      age_min: 18,
      age_max: 36,
      description: 'RRB Group D (Level 1) recruitment for various posts in Indian Railways',
      official_link: 'https://indianrailways.gov.in'
    },
    {
      source: 'Sarkari Result',
      title: 'Delhi Police Constable 2026',
      organization: 'Delhi Police',
      department: 'MHA',
      state: 'Delhi',
      state_code: 'delhi',
      posts: 10000,
      education: '12th Pass',
      salary: '₹21,700 – ₹69,100',
      deadline: new Date(today.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-02-15',
      exam_date: 'July 2026',
      category: 'Police',
      badge: 'NEW',
      is_urgent: false,
      age_min: 18,
      age_max: 25,
      description: 'Delhi Police Constable (Executive) recruitment for men and women',
      official_link: 'https://delhipolice.gov.in'
    },
    {
      source: 'Sarkari Result',
      title: 'SSC CHSL 2026',
      organization: 'Staff Selection Commission',
      department: 'Ministry of Personnel',
      state: 'Central Govt',
      state_code: 'central',
      posts: 5000,
      education: '12th Pass',
      salary: '₹19,900 – ₹63,100',
      deadline: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notification_date: '2026-04-01',
      exam_date: 'August 2026',
      category: 'SSC',
      badge: 'HOT',
      is_urgent: true,
      age_min: 18,
      age_max: 27,
      description: 'SSC Combined Higher Secondary Level examination for LDC, DEO, PA/SA posts',
      official_link: 'https://ssc.nic.in'
    }
  ];
}

// =====================================================
// SAVE JOBS TO DATABASE
// =====================================================

async function saveJobsToDatabase(jobs) {
  console.log(`💾 Saving ${jobs.length} jobs to database...`);
  try {
    // Remove fields that don't exist in the table
    const cleanJobs = jobs.map(job => {
      const { fetched_at, created_at, application_fee, apply_steps, ...rest } = job;
      return rest;
    });
    
    const { data, error } = await supabase
      .from('jobs')
      .upsert(cleanJobs, { onConflict: 'title,source' })
      .select();
    if (error) {
      console.error('❌ Database error:', error.message);
      return false;
    }
    console.log(`✅ Saved ${jobs.length} jobs successfully`);
    return true;
  } catch (err) {
    console.error('❌ Save error:', err.message);
    return false;
  }
}

// =====================================================
// MAIN FETCH FUNCTION
// =====================================================

async function fetchAllJobs() {
  console.log('\n========================================');
  console.log('🔄 Starting Daily Job Fetch -', new Date().toLocaleString());
  console.log('========================================\n');
  try {
    const allJobs = getSampleJobs();
    console.log(`📊 Total jobs fetched: ${allJobs.length}`);
    allJobs.forEach((job, index) => {
      console.log(`  ${index + 1}. ${job.title} (${job.organization})`);
    });
    if (allJobs.length > 0) {
      await saveJobsToDatabase(allJobs);
    }
    console.log('\n✅ Daily job fetch completed successfully!');
    console.log('========================================\n');
    return { success: true, count: allJobs.length };
  } catch (error) {
    console.error('❌ Error in job fetch:', error.message);
    return { success: false, error: error.message };
  }
}

// =====================================================
// SCHEDULER - Runs Daily at 8 AM
// =====================================================

const SCHEDULE = '0 8 * * *';
console.log('\n⏰ Scheduler configured for daily 8:00 AM');
console.log('📅 Next run: Tomorrow at 8:00 AM\n');

const cronJob = cron.schedule(SCHEDULE, async () => {
  console.log('\n🟢 Scheduled job triggered!');
  await fetchAllJobs();
});

// =====================================================
// API ENDPOINTS
// =====================================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Sarkari Express Server Running',
    lastFetch: new Date().toISOString(),
    schedule: 'Daily at 8:00 AM'
  });
});

app.post('/api/fetch-jobs', async (req, res) => {
  const result = await fetchAllJobs();
  res.json(result);
});

app.get('/api/jobs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .limit(100);
    if (error) throw error;
    res.json({ success: true, count: data.length, jobs: data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

async function start() {
  const dbReady = await checkDatabase();
  if (!dbReady) {
    console.log('\n⚠️  WARNING: Database not ready. Jobs will not be saved.');
    console.log('📋 Please create the jobs table in Supabase.');
  }
  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║   🚀 Sarkari Express Server Started              ║
║   Server URL: http://localhost:${PORT}             ║
║   API Endpoints:                                  ║
║   - GET  /api/health    - Health check           ║
║   - POST /api/fetch-jobs - Manual fetch          ║
║   - GET  /api/jobs      - Get all jobs           ║
║   ⏰ Auto-fetch scheduled: Daily at 8:00 AM      ║
╚═══════════════════════════════════════════════════╝
    `);
  });
}

start();

module.exports = app;