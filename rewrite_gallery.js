const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const galleryOld = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {((kegiatan.filter(k => k.foto).length > 0 ? kegiatan.filter(k => k.foto).slice(0, 6).map(k => ({
                  id: k.id,
                  title: k.judulKegiatan,
                  imageUrl: k.foto,
                  description: k.narasi || k.tempatKegiatan
                })) : [
                  { id: "1", title: "Kegiatan Gotong Royong", imageUrl: "/1.png", description: "Warga desa bahu-membahu membersihkan fasilitas umum" },
                  { id: "2", title: "Musyawarah Desa", imageUrl: "/2.jpg", description: "Rapat koordinasi dan musyawarah perencanaan pembangunan desa" },
                  { id: "3", title: "Penyaluran Bantuan", imageUrl: "/3.jpg", description: "Pembagian bantuan langsung kepada masyarakat yang membutuhkan" },
                  { id: "4", title: "Pembangunan Infrastruktur", imageUrl: "/4.png", description: "Pengecoran jalan desa utama untuk kelancaran transportasi" },
                  { id: "5", title: "Kegiatan Posyandu", imageUrl: "/5.jpg", description: "Pemeriksaan kesehatan rutin untuk balita dan lansia" },
                  { id: "6", title: "Pemberdayaan UMKM", imageUrl: "/6.jpg", description: "Pelatihan kewirausahaan untuk meningkatkan ekonomi keluarga" },
                ]) as any[]).map((photo: any, i) => (
                  <motion.div 
                    key={photo.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-hover relative rounded-3xl overflow-hidden group aspect-[4/3] shadow-sm border border-gray-100 bg-gray-50"
                  >
                    <div className={\`w-full h-full bg-gradient-to-br flex items-center justify-center \${i % 4 === 0 ? "from-green-400 to-emerald-600" :
                        i % 4 === 1 ? "from-blue-400 to-blue-600" :
                          i % 4 === 2 ? "from-purple-400 to-purple-600" :
                            "from-amber-400 to-orange-500"
                      }\`}>
                      {photo.imageUrl ? (
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-center text-white p-6">
                          <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-semibold text-sm">{photo.title}</p>
                        </div>
                      )}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{photo.title}</h3>
                        {photo.description && (
                          <p className="text-white/80 text-sm mt-2 line-clamp-2">{photo.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>`;

const swiperStyle = `
        <style dangerouslySetInnerHTML={{__html: \`
          .swiper-3d-gallery {
            padding-bottom: 50px !important;
            padding-top: 20px !important;
          }
          .swiper-slide {
            width: 300px;
            height: 400px;
          }
          @media (min-width: 768px) {
            .swiper-slide {
              width: 400px;
              height: 500px;
            }
          }
          .swiper-pagination-bullet {
            background: #16a34a !important;
          }
          .swiper-pagination-bullet-active {
            background: #15803d !important;
          }
        \`}} />
`;

const galleryNew = `${swiperStyle}
              <div className="w-full">
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                  className="swiper-3d-gallery w-full"
                  initialSlide={2}
                >
                {((kegiatan.filter(k => k.foto).length > 0 ? kegiatan.filter(k => k.foto).slice(0, 8).map(k => ({
                  id: k.id,
                  title: k.judulKegiatan,
                  imageUrl: k.foto,
                  description: k.narasi || k.tempatKegiatan
                })) : [
                  { id: "1", title: "Kegiatan Gotong Royong", imageUrl: "/1.png", description: "Warga desa bahu-membahu membersihkan fasilitas umum" },
                  { id: "2", title: "Musyawarah Desa", imageUrl: "/2.jpg", description: "Rapat koordinasi dan musyawarah perencanaan pembangunan desa" },
                  { id: "3", title: "Penyaluran Bantuan", imageUrl: "/3.jpg", description: "Pembagian bantuan langsung kepada masyarakat yang membutuhkan" },
                  { id: "4", title: "Pembangunan Infrastruktur", imageUrl: "/4.png", description: "Pengecoran jalan desa utama untuk kelancaran transportasi" },
                  { id: "5", title: "Kegiatan Posyandu", imageUrl: "/5.jpg", description: "Pemeriksaan kesehatan rutin untuk balita dan lansia" },
                  { id: "6", title: "Pemberdayaan UMKM", imageUrl: "/6.jpg", description: "Pelatihan kewirausahaan untuk meningkatkan ekonomi keluarga" },
                ]) as any[]).map((photo: any, i) => (
                  <SwiperSlide key={photo.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-hover relative rounded-3xl overflow-hidden group w-full h-full shadow-2xl border border-gray-100 bg-gray-50 cursor-grab active:cursor-grabbing"
                  >
                    <div className={\`w-full h-full bg-gradient-to-br flex items-center justify-center \${i % 4 === 0 ? "from-green-400 to-emerald-600" :
                        i % 4 === 1 ? "from-blue-400 to-blue-600" :
                          i % 4 === 2 ? "from-purple-400 to-purple-600" :
                            "from-amber-400 to-orange-500"
                      }\`}>
                      {photo.imageUrl ? (
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="text-center text-white p-6">
                          <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-semibold text-sm">{photo.title}</p>
                        </div>
                      )}
                    </div>
                    {/* Persistent overlay for Swiper 3D */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                      <div className="p-6 sm:p-8 w-full">
                        <h3 className="text-white font-bold text-xl leading-tight drop-shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>{photo.title}</h3>
                        {photo.description && (
                          <p className="text-white/90 text-sm mt-3 line-clamp-3 drop-shadow-md">{photo.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  </SwiperSlide>
                ))}
                </Swiper>
              </div>`;

code = code.replace(galleryOld, galleryNew);

// Also add ScrollToTop at the end before </main>
code = code.replace('</main>', '  <ScrollToTop />\n    </main>');

// Add Swiper imports
const imports = `import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ScrollToTop from "@/components/ScrollToTop";`;

code = code.replace('import { motion, AnimatePresence, Variants } from "framer-motion";', 'import { motion, AnimatePresence, Variants } from "framer-motion";\n' + imports);


fs.writeFileSync(file, code);
console.log('Success rewriting Gallery');