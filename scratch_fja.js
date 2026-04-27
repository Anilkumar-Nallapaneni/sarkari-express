const fs = require('fs');
fetch('https://www.freejobalert.com/all-india-government-jobs/').then(r=>r.text()).then(t=>{
    const cheerio = require('cheerio');
    const $ = cheerio.load(t);
    const rows = [];
    $('table.lattable tr').slice(1, 10).each((i, el)=>{
        rows.push($(el).text().replace(/\s+/g, ' ').trim());
    });
    console.log(JSON.stringify(rows, null, 2));
}).catch(console.error);
