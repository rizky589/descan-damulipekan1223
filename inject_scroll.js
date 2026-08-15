const fs = require('fs');
const file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('ScrollToTop')) {
    code = code.replace('import "./globals.css";', 'import "./globals.css";\nimport ScrollToTop from "@/components/ScrollToTop";');
    code = code.replace('{children}', '{children}\n        <ScrollToTop />');
    fs.writeFileSync(file, code);
    console.log("Injected into layout.tsx");
} else {
    console.log("Already in layout.tsx");
}