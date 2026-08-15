const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// The block to replace is from '{idx === current && (' to ')}' just before '</div>'
const targetStart = '{idx === current && (';
const targetEndStr = '</>';

const startIdx = code.indexOf(targetStart);
if (startIdx !== -1) {
    const nextCloseIdx = code.indexOf(targetEndStr, startIdx);
    if (nextCloseIdx !== -1) {
        const fullEndIdx = nextCloseIdx + targetEndStr.length;
        
        const newText = `{idx === current && (
                <div className="inline-block p-8 sm:p-12 rounded-3xl bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl mx-4">
                  <h1
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {slide.title}
                    <br />
                    <span className="text-green-400 drop-shadow-lg">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>`;
                
        code = code.substring(0, startIdx) + newText + code.substring(fullEndIdx);
        console.log("Text replaced.");
    }
}

// 1. Remove the background overlay completely and just use a very light black tint (20%)
const gradientRegex = /<div\s+className="absolute inset-0 bg-black\/40"\s+style=\{\{\s+background:\s+"linear-gradient\(.*?\)",\s+\}\}\s*\/>/s;
code = code.replace(gradientRegex, '<div className="absolute inset-0 bg-black/20" />');

// Fallback if the regex fails because of formatting
if (!code.includes('<div className="absolute inset-0 bg-black/20" />')) {
    const backupRegex = /<div\s+className="absolute inset-0"\s+style=\{\{\s+background:\s+"linear-gradient\(.*?\)",\s+\}\}\s*\/>/s;
    code = code.replace(backupRegex, '<div className="absolute inset-0 bg-black/20" />');
}

fs.writeFileSync(file, code);
console.log('Success');