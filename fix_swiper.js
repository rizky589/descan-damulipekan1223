const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Remove swiper CSS imports from page.tsx
code = code.replace(`import 'swiper/css';\nimport 'swiper/css/effect-coverflow';\nimport 'swiper/css/pagination';\n`, '');

fs.writeFileSync(file, code);
console.log('Swiper CSS imports removed from page.tsx');