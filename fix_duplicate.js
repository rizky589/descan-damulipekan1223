const fs = require('fs');
const file = 'src/app/struktur-organisasi/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const firstReturnIdx = code.indexOf('const CardNode');
const secondReturnIdx = code.indexOf('const CardNode', firstReturnIdx + 1);

if (secondReturnIdx !== -1) {
    const endOfFirst = code.indexOf('return (', firstReturnIdx);
    if (endOfFirst !== -1) {
        // Remove from first CardNode up to just before 'return ('
        code = code.substring(0, firstReturnIdx) + code.substring(endOfFirst);
        fs.writeFileSync(file, code);
        console.log('Fixed');
    }
}