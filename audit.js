const fs = require('fs');
const code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Check for data fetching patterns
const patterns = [
    {name: 'fetch()', regex: /fetch\(/g},
    {name: 'useEffect', regex: /useEffect/g},
    {name: 'API calls', regex: /\/api\//g},
    {name: '<img tags', regex: /<img /g},
    {name: 'framer-motion animate', regex: /animate=\{/g},
    {name: 'Swiper', regex: /Swiper/g},
    {name: 'Google Fonts', regex: /googleapis/g},
];

patterns.forEach(p => {
    const matches = code.match(p.regex);
    console.log(`${p.name}: ${matches ? matches.length : 0}`);
});