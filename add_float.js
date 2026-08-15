const fs = require('fs');
const file = 'src/app/globals.css';
let code = fs.readFileSync(file, 'utf8');

const themeInsert = `  --color-background: var(--background);
  --animate-float: float 4s ease-in-out infinite;`;

code = code.replace('--color-background: var(--background);', themeInsert);

const keyframesInsert = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@layer base {`;

code = code.replace('@layer base {', keyframesInsert);

fs.writeFileSync(file, code);
console.log('Added float animation to globals.css');