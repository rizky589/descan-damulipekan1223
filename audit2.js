const fs = require('fs');
const code = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = code.split('\n');

// Find fetch calls and their context
lines.forEach((line, i) => {
    if (line.includes('fetch(') || line.includes('useEffect') || line.includes('/api/')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
});