const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `      {/*  TENTANG DESA - HEADING  */}
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tentang Portal Desa
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" />
        </div>
      </section>


      {/*  TENTANG DESA  */}
      <motion.section 
        id="tentang" 
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">`;

const newCode = `      {/*  TENTANG DESA  */}
      <motion.section 
        id="tentang" 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tentang Portal Desa
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">`;

if (code.includes('Tentang Portal Desa')) {
    code = code.replace(oldCode, newCode);
    fs.writeFileSync(file, code);
    console.log("Merged heading and content for Tentang Desa");
} else {
    console.log("Could not find old code block.");
}