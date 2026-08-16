const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const regex = /\{\/\*.*?TENTANG DESA - HEADING.*?\*\/\}[\s\S]*?<section className="py-16 bg-white">[\s\S]*?<div className="text-center">[\s\S]*?<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>[\s\S]*?Tentang Portal Desa[\s\S]*?<\/h2>[\s\S]*?<div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" \/>[\s\S]*?<\/div>[\s\S]*?<\/section>[\s\S]*?\{\/\*.*?TENTANG DESA.*?\*\/\}[\s\S]*?<motion\.section[\s\S]*?id="tentang"[\s\S]*?className="py-24 bg-white"[\s\S]*?initial="hidden"[\s\S]*?whileInView="visible"[\s\S]*?viewport={{ once: true, margin: "-50px" }}[\s\S]*?variants={staggerContainer}*?>[\s\S]*?<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">[\s\S]*?<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">/;

const newCode = `{/* TENTANG DESA */}
      <motion.section 
        id="tentang" 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tentang Portal Desa
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">`;

code = code.replace(regex, newCode);
fs.writeFileSync(file, code);
console.log("Regex replace executed");