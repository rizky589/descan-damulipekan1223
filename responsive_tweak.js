const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Fix Hero padding & text for ultra-small screens (320px)
code = code.replace('className="w-full max-w-5xl mx-auto p-10 sm:p-16', 'className="w-full max-w-5xl mx-auto p-6 sm:p-12 lg:p-16');
code = code.replace('className="text-4xl sm:text-5xl md:text-7xl font-extrabold', 'className="text-3xl sm:text-5xl md:text-7xl font-extrabold');

// Fix BPS Card padding for ultra-small screens
code = code.replace('className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-xs w-full', 'className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 max-w-xs w-full');

fs.writeFileSync(file, code);
console.log("Responsive tweaks applied");