const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// The string that was duplicated:
const duplicateBlock = `import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ScrollToTop from "@/components/ScrollToTop";`;

// We just replace the first occurrence of this block + newline with empty string
// Because it was inserted twice
const firstIdx = code.indexOf(duplicateBlock);
if (firstIdx !== -1) {
    const endIdx = firstIdx + duplicateBlock.length;
    code = code.substring(0, firstIdx) + code.substring(endIdx);
    // There might be an extra newline left over, but that's fine.
    fs.writeFileSync(file, code);
    console.log('Fixed duplicates');
}