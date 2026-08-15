const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add Swiper and ScrollToTop imports
const imports = `import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ScrollToTop from "@/components/ScrollToTop";`;

code = code.replace('import { motion, AnimatePresence, Variants } from "framer-motion";', 'import { motion, AnimatePresence, Variants } from "framer-motion";\n' + imports);

// 2. Rewrite Hero Slideshow
const heroOld = `<section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={\`absolute inset-0 transition-opacity duration-1000 \${idx === current ? "opacity-100" : "opacity-0"}\`}
          >
            <img
              src={slide.image}
              alt={slide.highlight}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
  
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={\`transition-all duration-700 \${idx === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"}\`}
            >
              {idx === current && (
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
                </div>
              )}
            </div>
          ))}
  
          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={\`w-3 h-3 rounded-full transition-all duration-300 \${
                  idx === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                }\`}
              />
            ))}
          </div>
        </div>
  
        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>`;

const heroNew = `<section className="relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
        <div className="relative w-full max-w-[96%] sm:max-w-7xl h-[75vh] min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={\`absolute inset-0 transition-opacity duration-1000 \${idx === current ? "opacity-100" : "opacity-0"}\`}
          >
            <img
              src={slide.image}
              alt={slide.highlight}
              className="w-full h-full object-cover scale-105"
            />
            {/* Dark overlay specifically requested by user (60-80%) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>
        ))}
  
        {/* Content */}
        <div className="relative z-10 w-full text-center px-4 mt-12">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={\`transition-all duration-700 \${idx === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"}\`}
            >
              {idx === current && (
                <>
                  <h1
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {slide.title}
                    <br />
                    <span className="text-green-300 drop-shadow-md">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </>
              )}
            </div>
          ))}
  
          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={\`w-3 h-3 rounded-full transition-all duration-300 \${
                  idx === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                }\`}
              />
            ))}
          </div>
        </div>
  
        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        </div>
      </section>`;

code = code.replace(heroOld, heroNew);
fs.writeFileSync(file, code);
console.log('Success rewriting Hero');