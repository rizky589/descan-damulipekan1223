const fs = require('fs');
const file = 'src/app/globals.css';
let code = fs.readFileSync(file, 'utf8');

const flipClasses = `
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
.group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
`;

if (!code.includes('perspective-1000')) {
    code += flipClasses;
    fs.writeFileSync(file, code);
    console.log("Added flip classes");
}