const fs = require('fs');
const file = 'src/app/globals.css';
let code = fs.readFileSync(file, 'utf8');

// Remove the Google Fonts import from globals.css
code = code.replace(`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap');`, `/* Fonts now loaded via next/font in layout.tsx (self-hosted, faster) */`);

// Add Poppins CSS variable support
if (!code.includes('--font-poppins')) {
    code = code.replace('  --background: #ffffff;', `  --background: #ffffff;
  font-family: var(--font-inter, system-ui, sans-serif);`);
}

fs.writeFileSync(file, code);
console.log("Removed Google Fonts from globals.css");