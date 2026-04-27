import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';

const parser = new Parser();

export default async function handler(req, res) {
  try {
    // 1. Check authorization for cron job (Optional but recommended for Vercel Cron)
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV !== 'development') {
      // Allow execution without auth in development, but require it in production if CRON_SECRET is set
      if (process.env.CRON_SECRET) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    }

    // 2. Initialize Supabase Client
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Helper to extract metadata
    const STATES = [
      { name: "Andhra Pradesh", code: "ap" }, { name: "Arunachal Pradesh", code: "ar" }, { name: "Assam", code: "as" }, { name: "Bihar", code: "bihar" }, { name: "Chhattisgarh", code: "cg" }, { name: "Goa", code: "goa" }, { name: "Gujarat", code: "gj" }, { name: "Haryana", code: "hr" }, { name: "Himachal Pradesh", code: "hp" }, { name: "Jharkhand", code: "jh" }, { name: "Karnataka", code: "ka" }, { name: "Kerala", code: "kl" }, { name: "Madhya Pradesh", code: "mp" }, { name: "Maharashtra", code: "mh" }, { name: "Manipur", code: "mn" }, { name: "Meghalaya", code: "ml" }, { name: "Mizoram", code: "mz" }, { name: "Nagaland", code: "nl" }, { name: "Odisha", code: "or" }, { name: "Punjab", code: "pb" }, { name: "Rajasthan", code: "raj" }, { name: "Sikkim", code: "sk" }, { name: "Tamil Nadu", code: "tn" }, { name: "Telangana", code: "ts" }, { name: "Tripura", code: "tr" }, { name: "Uttar Pradesh", code: "up" }, { name: "Uttarakhand", code: "uk" }, { name: "West Bengal", code: "wb" }
    ];
    
    const extractJobMetadata = (title) => {
      let state = "Central Govt";
      let statecode = "central";
      let cat = "Other";
      
      const t = title.toLowerCase();
      
      for (const s of STATES) {
        if (t.includes(s.name.toLowerCase())) {
          state = s.name;
          statecode = s.code;
          break;
        }
      }
      if (t.match(/\bup\b/) || t.includes("uppsc") || t.includes("uppbpb")) { state = "Uttar Pradesh"; statecode = "up"; }
      if (t.includes("rpsc") || t.includes("rsmssb")) { state = "Rajasthan"; statecode = "raj"; }
      if (t.includes("bpsc")) { state = "Bihar"; statecode = "bihar"; }
      if (t.includes("mpsc")) { state = "Maharashtra"; statecode = "mh"; }
      if (t.includes("ukpsc")) { state = "Uttarakhand"; statecode = "uk"; }
      if (t.includes("tnpsc")) { state = "Tamil Nadu"; statecode = "tn"; }
      
      if (t.includes("railway") || t.includes("rrb") || t.includes("rrc")) cat = "Railway";
      else if (t.includes("bank") || t.includes("ibps") || t.includes("sbi") || t.includes("rbi")) cat = "Banking";
      else if (t.includes("police") || t.includes("constable") || t.includes("defence") || t.includes("army") || t.includes("navy") || t.includes("air force") || t.includes("cisf") || t.includes("crpf") || t.includes("bsf")) cat = "Police";
      else if (t.includes("teach") || t.includes("tet") || t.includes("tgt") || t.includes("pgt") || t.includes("professor") || t.includes("school")) cat = "Teaching";
      else if (t.includes("medical") || t.includes("health") || t.includes("nurse") || t.includes("aiims") || t.includes("doctor")) cat = "Medical";
      else if (t.includes("engineer") || t.includes("je ") || t.includes("ae ") || t.includes("tech")) cat = "Engineering";
      else if (t.includes("psc") || t.includes("upsc")) cat = "PSC";
      else if (t.includes("ssc")) cat = "SSC";
      
      return { state, statecode, cat };
    };

    // 4. Fetch RSS Feed from FreeJobAlert
    console.log('Fetching live jobs from FreeJobAlert...');
    const feed = await parser.parseURL('https://www.freejobalert.com/feed/');
    
    if (!feed.items || feed.items.length === 0) {
      return res.status(200).json({ success: true, message: 'No jobs found in feed' });
    }

    // 5. Map RSS items to Database Schema
    const jobsToInsert = feed.items.map(item => {
      const meta = extractJobMetadata(item.title);
      return {
        title: item.title,
        link: item.link,
        desc: item.contentSnippet || item.content || '',
        badge: 'NEW',
        urgent: false,
        org: meta.cat === "Police" ? "Defence/Police" : (meta.cat === "Railway" ? "Indian Railways" : "Government Sector"),
        state: meta.state,
        statecode: meta.statecode,
        posts: 1,
        edu: 'Check Notification',
        salary: 'As per rules',
        deadline: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        cat: meta.cat,
        emoji: '🆕'
      };
    });

    console.log(`Parsed ${jobsToInsert.length} jobs.`);

    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('title')
      .order('id', { ascending: false })
      .limit(200);

    const existingTitles = new Set(existingJobs?.map(j => j.title) || []);
    
    const newJobs = jobsToInsert.filter(job => !existingTitles.has(job.title));

    if (newJobs.length > 0) {
      const { error } = await supabase
        .from('jobs')
        .insert(newJobs);
      
      if (error) {
        console.error('Supabase Insert Error:', error);
        return res.status(500).json({ success: false, message: 'Database insert failed', error: error.message });
      }
      
      console.log(`Successfully inserted ${newJobs.length} new jobs.`);
    } else {
      console.log('No new jobs to insert.');
    }

    // 6. Return Success
    return res.status(200).json({
      success: true,
      message: 'Job fetch completed successfully',
      jobsFound: jobsToInsert.length,
      jobsAdded: newJobs.length
    });

  } catch (error) {
    console.error('Cron Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
