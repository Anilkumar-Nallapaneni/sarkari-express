// filepath: api/jobs.js
// =====================================================
// Live Jobs API - Fetches directly from FreeJobAlert
// =====================================================

export default async function handler(req, res) {
  try {
    // Fetch from FreeJobAlert RSS feed
    const rssUrl = 'https://www.freejobalert.com/feed/';
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const result = await response.json();
    
    if (result.status !== "ok" || !result.items) {
      return res.status(200).json({ success: true, jobs: [] });
    }
    
    const STATES = [
      { name: "Andhra Pradesh", code: "ap" }, { name: "Arunachal Pradesh", code: "ar" },
      { name: "Assam", code: "as" }, { name: "Bihar", code: "bihar" },
      { name: "Chhattisgarh", code: "cg" }, { name: "Goa", code: "goa" },
      { name: "Gujarat", code: "gj" }, { name: "Haryana", code: "hr" },
      { name: "Himachal Pradesh", code: "hp" }, { name: "Jharkhand", code: "jh" },
      { name: "Karnataka", code: "ka" }, { name: "Kerala", code: "kl" },
      { name: "Madhya Pradesh", code: "mp" }, { name: "Maharashtra", code: "mh" },
      { name: "Odisha", code: "or" }, { name: "Punjab", code: "pb" },
      { name: "Rajasthan", code: "raj" }, { name: "Tamil Nadu", code: "tn" },
      { name: "Telangana", code: "ts" }, { name: "Uttar Pradesh", code: "up" },
      { name: "Uttarakhand", code: "uk" }, { name: "West Bengal", code: "wb" },
      { name: "Delhi", code: "delhi" }
    ];
    
    const CATEGORIES = [
      { keywords: ['railway', 'rrb'], cat: 'Railway' },
      { keywords: ['bank', 'ibps', 'sbi', 'rbi', 'po', 'clerk'], cat: 'Banking' },
      { keywords: ['police', 'constable', 'defence', 'army', 'navy', 'air force'], cat: 'Police/Defense' },
      { keywords: ['teacher', 'tet', 'tgt', 'pgt', 'school'], cat: 'Teaching' },
      { keywords: ['medical', 'health', 'nurse', 'aiims', 'doctor'], cat: 'Medical' },
      { keywords: ['engineer', 'je ', 'ae '], cat: 'Engineering' },
      { keywords: ['psc', 'upsc', 'civil service'], cat: 'PSC' },
      { keywords: ['ssc', 'cgl', 'chsl'], cat: 'SSC' }
    ];
    
    function extractMetadata(title) {
      const t = title.toLowerCase();
      let state = "All India";
      let statecode = "central";
      let cat = "Other";
      
      for (const s of STATES) {
        if (t.includes(s.name.toLowerCase())) {
          state = s.name;
          statecode = s.code;
          break;
        }
      }
      
      // Special cases
      if (t.match(/\bup\b/) && !t.includes('setup')) { state = "Uttar Pradesh"; statecode = "up"; }
      if (t.includes("bpsc")) { state = "Bihar"; statecode = "bihar"; }
      if (t.includes("rpsc")) { state = "Rajasthan"; statecode = "raj"; }
      if (t.includes("mpsc")) { state = "Maharashtra"; statecode = "mh"; }
      
      for (const c of CATEGORIES) {
        if (c.keywords.some(k => t.includes(k))) {
          cat = c.cat;
          break;
        }
      }
      
      return { state, statecode, cat };
    }
    
    function getOrg(title) {
      const t = title.toLowerCase();
      if (t.includes('railway') || t.includes('rrb')) return 'Indian Railways';
      if (t.includes('bank') || t.includes('ibps') || t.includes('sbi')) return 'Public Sector Banks';
      if (t.includes('police') || t.includes('cisf') || t.includes('crpf')) return 'Police/Defense';
      if (t.includes('upsc')) return 'UPSC';
      if (t.includes('ssc')) return 'Staff Selection Commission';
      if (t.includes('teacher') || t.includes('tet')) return 'Education Department';
      if (t.includes('medical') || t.includes('aiims')) return 'Health Department';
      return 'Government of India';
    }
    
    // Process the jobs
    const jobs = result.items.slice(0, 50).map((item, index) => {
      const meta = extractMetadata(item.title);
      return {
        id: 3000 + index,
        source: 'FreeJobAlert',
        title: item.title,
        org: getOrg(item.title),
        dept: '',
        state: meta.state,
        statecode: meta.statecode,
        posts: 1,
        edu: "Check Notification",
        salary: "As per Government Norms",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notifdate: item.pubDate ? item.pubDate.split(' ')[0] : new Date().toISOString().split('T')[0],
        examdate: "To be announced",
        cat: meta.cat,
        badge: "NEW",
        urgent: false,
        agemin: 18,
        agemax: 35,
        desc: item.description || item.title,
        link: item.link || "#",
        emoji: '🏛️'
      };
    });
    
    return res.status(200).json({ 
      success: true, 
      count: jobs.length,
      jobs: jobs 
    });
    
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(200).json({ success: false, jobs: [], error: error.message });
  }
}