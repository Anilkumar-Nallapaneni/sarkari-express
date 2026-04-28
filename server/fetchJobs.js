// filepath: server/fetchJobs.js
// =====================================================
// Sarkari Express - Multi-Source Job Fetcher
// Fetches jobs from reliable sources
// =====================================================

require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

// =====================================================
// CONFIGURATION
// =====================================================

const config = {
  // Add your JSearch API key from RapidAPI (free tier available)
  // Get it at: https://rapidapi.com/jsearch/api/jsearch/
  jsearchApiKey: process.env.JSEARCH_API_KEY || '',
  
  // Fallback to RSS feeds if no API key
  rssFeeds: [
    'https://www.sarkariresult.com/feed/',
    'https://www.freejobalert.com/feed/',
  ]
};

// =====================================================
// JOB SOURCES
// =====================================================

/**
 * Fetch jobs using JSearch API (RapidAPI)
 * This is the most reliable and legal approach
 */
async function fetchFromJSearch() {
  if (!config.jsearchApiKey) {
    console.log('⚠️  No JSearch API key configured');
    return [];
  }

  const jobs = [];
  const queries = [
    'government jobs India 2026',
    'Sarkari Naukri 2026',
    'banking jobs India',
    'railway jobs India',
    'state government jobs'
  ];

  for (const query of queries) {
    try {
      const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: query,
          num_pages: 1
        },
        headers: {
          'X-RapidAPI-Key': config.jsearchApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      });

      if (response.data && response.data.data) {
        for (const item of response.data.data) {
          const job = parseJSearchJob(item);
          if (job) jobs.push(job);
        }
      }
    } catch (err) {
      console.log(`❌ JSearch error for "${query}":`, err.message);
    }
  }

  return jobs;
}

/**
 * Parse JSearch API response to our format
 */
function parseJSearchJob(item) {
  const title = item.job_title || '';
  const company = item.employer_name || '';
  
  // Only include government/relevant jobs
  const keywords = ['government', 'sarkari', 'bank', 'railway', 'psc', 'ssc', 'upsc', 'ibps', 'police', 'teacher', 'medical', 'nurse', 'engineer', 'officer'];
  const isRelevant = keywords.some(k => 
    title.toLowerCase().includes(k) || company.toLowerCase().includes(k)
  );
  
  if (!isRelevant) return null;

  return {
    source: 'JSearch',
    title: title,
    organization: company,
    department: company,
    state: 'All India',
    statecode: 'central',
    posts: 1,
    education: extractEducation(item.job_description || ''),
    salary: item.estimated_salary || 'As per norms',
    deadline: extractDeadline(item.job_posted_at_datetime || ''),
    notifdate: new Date().toISOString().split('T')[0],
    examdate: 'To be announced',
    category: extractCategory(title),
    badge: 'NEW',
    urgent: isUrgent(title),
    agemin: 18,
    agemax: 35,
    description: (item.job_description || '').substring(0, 500),
    link: item.job_google_link || item.employer_website || ''
  };
}

/**
 * Fetch from RSS feeds (Sarkari Result)
 */
async function fetchFromRSS() {
  const jobs = [];
  
  for (const feedUrl of config.rssFeeds) {
    try {
      const Parser = require('rss-parser');
      const parser = new Parser();
      const feed = await parser.parseURL(feedUrl);
      
      for (const item of feed.items.slice(0, 20)) {
        const job = parseRSSJob(item);
        if (job) jobs.push(job);
      }
    } catch (err) {
      console.log(`⚠️  RSS feed error (${feedUrl}):`, err.message);
    }
  }
  
  return jobs;
}

/**
 * Parse RSS item to our format
 */
function parseRSSJob(item) {
  const title = item.title || '';
  
  // Skip non-job entries
  if (!title.toLowerCase().includes('recruitment') && 
      !title.toLowerCase().includes('result') &&
      !title.toLowerCase().includes('admit card')) {
    return null;
  }

  return {
    source: 'SarkariResult',
    title: title,
    organization: extractOrg(title),
    department: extractDept(title),
    state: extractState(title),
    statecode: extractStateCode(title),
    posts: 0,
    education: 'As per notification',
    salary: 'As per norms',
    deadline: item.isoDate ? item.isoDate.split('T')[0] : new Date().toISOString().split('T')[0],
    notifdate: item.isoDate ? item.isoDate.split('T')[0] : new Date().toISOString().split('T')[0],
    examdate: 'To be announced',
    category: extractCategory(title),
    badge: 'NEW',
    urgent: isUrgent(title),
    agemin: 18,
    agemax: 35,
    description: title,
    link: item.link || ''
  };
}

/**
 * Fetch from SarkariResult.com (HTML scraping)
 */
async function fetchFromSarkariResult() {
  const jobs = [];
  const sources = [
    'https://www.sarkariresult.com/',
    'https://www.sarkariresult.com/latest-results.php',
    'https://www.sarkariresult.com/latest-jobs.php'
  ];

  for (const url of sources) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      
      // Parse the listing - adjust selectors based on actual HTML
      $('div.result-box, div.job-listing, a[href*="recruitment"]').each((i, el) => {
        const $el = $(el);
        const title = $el.find('h2, h3, a').text().trim();
        const link = $el.find('a').attr('href') || '';
        
        if (title && title.length > 10) {
          jobs.push({
            source: 'SarkariResult',
            title: title,
            organization: extractOrg(title),
            department: extractDept(title),
            state: extractState(title),
            statecode: extractStateCode(title),
            posts: 0,
            education: 'As per notification',
            salary: 'As per norms',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            notifdate: new Date().toISOString().split('T')[0],
            examdate: 'To be announced',
            category: extractCategory(title),
            badge: 'NEW',
            urgent: isUrgent(title),
            agemin: 18,
            agemax: 35,
            description: title,
            link: link.startsWith('http') ? link : `https://www.sarkariresult.com${link}`
          });
        }
      });
    } catch (err) {
      console.log(`⚠️  SarkariResult scrape error (${url}):`, err.message);
    }
  }

  return jobs;
}

/**
 * Fetch from FreeJobAlert.com
 */
async function fetchFromFreeJobAlert() {
  const jobs = [];
  const sources = [
    'https://www.freejobalert.com/',
    'https://www.freejobalert.com/govt-jobs/'
  ];

  for (const url of sources) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      
      $('div.job-box, div.vacancy-list, h2 a, h3 a').each((i, el) => {
        const $el = $(el);
        const title = $el.text().trim();
        const link = $el.attr('href') || '';
        
        if (title && title.length > 15 && title.toLowerCase().includes('recruitment')) {
          jobs.push({
            source: 'FreeJobAlert',
            title: title,
            organization: extractOrg(title),
            department: extractDept(title),
            state: extractState(title),
            statecode: extractStateCode(title),
            posts: 0,
            education: 'As per notification',
            salary: 'As per norms',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            notifdate: new Date().toISOString().split('T')[0],
            examdate: 'To be announced',
            category: extractCategory(title),
            badge: 'NEW',
            urgent: isUrgent(title),
            agemin: 18,
            agemax: 35,
            description: title,
            link: link.startsWith('http') ? link : `https://www.freejobalert.com${link}`
          });
        }
      });
    } catch (err) {
      console.log(`⚠️  FreeJobAlert scrape error (${url}):`, err.message);
    }
  }

  return jobs;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function extractEducation(desc) {
  const eduPatterns = [
    '10th pass', '12th pass', 'graduate', 'post graduate', 
    'diploma', 'b.tech', 'b.e.', 'm.sc', 'b.sc', 'mbbs', 'bds'
  ];
  const lower = desc.toLowerCase();
  for (const pattern of eduPatterns) {
    if (lower.includes(pattern)) return pattern.toUpperCase();
  }
  return 'As per notification';
}

function extractDeadline(dateStr) {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (!isNaN(date)) {
      return date.toISOString().split('T')[0];
    }
  } catch {}
  // Default to 30 days from now
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

function extractCategory(title) {
  const lower = title.toLowerCase();
  if (lower.includes('police') || lower.includes('constable')) return 'Police';
  if (lower.includes('railway') || lower.includes('rrb')) return 'Railway';
  if (lower.includes('bank') || lower.includes('ibps')) return 'Banking';
  if (lower.includes('teacher') || lower.includes('tgt') || lower.includes('prt')) return 'Teaching';
  if (lower.includes('ssc') || lower.includes('cgl') || lower.includes('chsl')) return 'SSC';
  if (lower.includes('upsc') || lower.includes('civil service')) return 'Civil Services';
  if (lower.includes('medical') || lower.includes('nurse') || lower.includes('paramedical')) return 'Medical';
  if (lower.includes('engineering') || lower.includes('engineer')) return 'Engineering';
  if (lower.includes('state psc') || lower.includes('psc')) return 'State PSC';
  return 'General';
}

function isUrgent(title) {
  const urgentKeywords = ['last date', 'last day', 'closing soon', 'apply online', 'notification'];
  return urgentKeywords.some(k => title.toLowerCase().includes(k));
}

function extractOrg(title) {
  const orgs = [
    'UPSC', 'SSC', 'IBPS', 'RRB', 'State Police', 'Delhi Police', 'UP Police',
    'Bihar Police', 'Maharashtra Police', 'Karnataka Police',
    'Indian Railways', 'Central Railway', 'Northern Railway',
    'State Bank', 'Punjab National Bank', 'Canara Bank',
    'UPSC', 'State PSC', 'BPSC', 'UPPSC', 'MPPSC'
  ];
  for (const org of orgs) {
    if (title.toLowerCase().includes(org.toLowerCase())) return org;
  }
  return 'Government of India';
}

function extractDept(title) {
  const depts = [
    'Ministry of Personnel', 'Ministry of Railways', 'Ministry of Education',
    'Ministry of Health', 'Ministry of Defence', 'Ministry of Finance',
    'Home Affairs', 'External Affairs'
  ];
  for (const dept of depts) {
    if (title.toLowerCase().includes(dept.toLowerCase())) return dept;
  }
  return 'Various Departments';
}

function extractState(title) {
  const states = [
    'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Delhi', 'Maharashtra',
    'Tamil Nadu', 'Karnataka', 'West Bengal', 'Gujarat', 'Punjab',
    'Haryana', 'Bihar', 'Jharkhand', 'Odisha', 'Chhattisgarh',
    'Uttarakhand', 'Himachal Pradesh', 'Jammu Kashmir', 'Assam',
    'Kerala', 'Telangana', 'Andhra Pradesh'
  ];
  for (const state of states) {
    if (title.toLowerCase().includes(state.toLowerCase())) return state;
  }
  return 'All India';
}

function extractStateCode(title) {
  const stateCodes = {
    'uttar pradesh': 'up', 'madhya pradesh': 'mp', 'rajasthan': 'raj',
    'delhi': 'delhi', 'maharashtra': 'mh', 'tamil nadu': 'tn',
    'karnataka': 'ka', 'west bengal': 'wb', 'gujarat': 'gj', 'punjab': 'pb',
    'haryana': 'hr', 'bihar': 'br', 'jharkhand': 'jh', 'odisha': 'or',
    'chhattisgarh': 'cg', 'uttarakhand': 'uk', 'himachal pradesh': 'hp',
    'jammu kashmir': 'jk', 'assam': 'as', 'kerala': 'kl',
    'telangana': 'ts', 'andhra pradesh': 'ap'
  };
  const lower = title.toLowerCase();
  for (const [state, code] of Object.entries(stateCodes)) {
    if (lower.includes(state)) return code;
  }
  return 'central';
}

// =====================================================
// MAIN FETCH FUNCTION
// =====================================================

async function fetchAllJobs() {
  console.log('\n📡 Starting job fetch from all sources...\n');
  
  let allJobs = [];
  
  // Try JSearch API first (most reliable)
  if (config.jsearchApiKey) {
    console.log('🔍 Fetching from JSearch API...');
    const jsearchJobs = await fetchFromJSearch();
    console.log(`   ✅ Found ${jsearchJobs.length} jobs from JSearch`);
    allJobs = [...allJobs, ...jsearchJobs];
  }
  
  // Try RSS feeds
  console.log('🔍 Fetching from RSS feeds...');
  const rssJobs = await fetchFromRSS();
  console.log(`   ✅ Found ${rssJobs.length} jobs from RSS`);
  allJobs = [...allJobs, ...rssJobs];
  
  // Try SarkariResult scraping
  console.log('🔍 Fetching from SarkariResult...');
  const sarkariJobs = await fetchFromSarkariResult();
  console.log(`   ✅ Found ${sarkariJobs.length} jobs from SarkariResult`);
  allJobs = [...allJobs, ...sarkariJobs];
  
  // Try FreeJobAlert scraping
  console.log('🔍 Fetching from FreeJobAlert...');
  const freejobJobs = await fetchFromFreeJobAlert();
  console.log(`   ✅ Found ${freejobJobs.length} jobs from FreeJobAlert`);
  allJobs = [...allJobs, ...freejobJobs];
  
  // Deduplicate by title
  const seen = new Set();
  const uniqueJobs = allJobs.filter(job => {
    const key = job.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  console.log(`\n📊 Total unique jobs fetched: ${uniqueJobs.length}`);
  return uniqueJobs;
}

module.exports = { fetchAllJobs };