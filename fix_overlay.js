const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldOverlay = `style={{
                background:
                  "linear-gradient(135deg, rgba(15,76,37,0.85) 0%, rgba(22,163,74,0.75) 50%, rgba(13,148,136,0.80) 100%)",
              }}`;

const newOverlay = `className="absolute inset-0 bg-black/40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15,76,37,0.6) 0%, rgba(22,163,74,0.3) 50%, rgba(13,148,136,0.5) 100%)",
              }}`;

code = code.replace(oldOverlay, newOverlay);
fs.writeFileSync(file, code);
console.log('Success');