const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Remove the full-screen dark gradient overlay
const gradientRegex = /\{\/\* Dark overlay specifically requested by user \(60-80\%\) \*\/\}\s*<div className="absolute inset-0 bg-gradient-to-t from-black\/80 via-black\/50 to-black\/30" \/>/g;
code = code.replace(gradientRegex, '{/* Removed full dark overlay */}');

// 2. Wrap the text in the transparent box
const oldText = `<>
                  <h1
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {slide.title}
                    <br />
                    <span className="text-green-300 drop-shadow-md">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-900 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
                    {slide.subtitle}
                  </p>
                </>`;

const newText = `<div className="w-full max-w-5xl mx-auto bg-black/40 backdrop-blur-sm border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl">
                  <h1
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {slide.title}
                    <br />
                    <span className="text-green-400 drop-shadow-lg">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
                    {slide.subtitle}
                  </p>
                </div>`;

if (code.includes(oldText)) {
    code = code.replace(oldText, newText);
    console.log("Success replacing text block.");
} else {
    // Maybe text-white/95 was reverted? Let's use regex for the text block.
    console.log("Exact match failed, trying regex...");
    const regex = /<>\s*<h1[\s\S]*?<\/h1>\s*<p[\s\S]*?<\/p>\s*<\/>/;
    
    code = code.replace(regex, newText);
    console.log("Regex replacement done.");
}

fs.writeFileSync(file, code);