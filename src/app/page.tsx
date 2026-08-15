"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface KegiatanDesa {
  id: string;
  judulKegiatan: string;
  tanggalKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  tempatKegiatan: string;
  penyelenggara: string;
  foto?: string | null;
  narasi?: string | null;
}

interface Agenda {
  id: string;
  judulKegiatan: string;
  tanggalKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  tempatKegiatan: string;
  penyelenggara: string;
}

interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

interface KepalaKeluarga {
  id: string;
}

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Administrasi Desa",
    desc: "Pengurusan surat keterangan, surat pengantar, dan dokumen resmi lainnya secara mudah.",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    href: "/informasi-desa",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Informasi Keuangan",
    desc: "Transparansi pengelolaan keuangan desa, anggaran, dan realisasi pembangunan.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    href: "/apbdes",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: "Pengumuman",
    desc: "Informasi terkini tentang kegiatan desa, program pemerintah, dan pengumuman penting.",
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    href: "/informasi-desa",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Agenda Kegiatan",
    desc: "Jadwal kegiatan desa, pertemuan, dan acara-acara penting bagi masyarakat.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    href: "/agenda-desa",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Hukum & Peraturan",
    desc: "Dokumen hukum dan peraturan desa yang dapat diakses oleh seluruh masyarakat.",
    color: "from-red-500 to-red-600",
    bg: "bg-red-50",
    href: "/jdih",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Data Statistik",
    desc: "Data kependudukan, ekonomi, dan sosial desa untuk mendukung perencanaan pembangunan.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
    href: "/daftar-data",
  },
];

const advantages = [
  { icon: "🏛️", title: "Pelayanan Terpadu", desc: "Layanan satu pintu untuk kemudahan masyarakat" },
  { icon: "🔍", title: "Transparansi", desc: "Informasi yang akurat dan dapat diakses publik" },
  { icon: "📱", title: "Akses Digital", desc: "Platform responsive untuk semua perangkat" },
  { icon: "🔒", title: "Keamanan Data", desc: "Perlindungan data dengan teknologi terkini" },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
}

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate();
}

const heroSlides = [
  {
    image: "/hero-bg.png",
    title: "Selamat Datang",
    highlight: "di Desa Damuli Pekan",
    subtitle: "Sistem Informasi Terpadu untuk Kemajuan Desa dan Pelayanan Masyarakat yang Cepat, Transparan, dan Modern",
  },
  {
    image: "/1.png",
    title: "Bersama Membangun",
    highlight: "Desa yang Maju",
    subtitle: "Wujudkan desa yang sejahtera, transparan, dan berdaya saing melalui teknologi digital.",
  },
  {
    image: "/4.png",
    title: "Pelayanan Terbaik untuk",
    highlight: "Masyarakat Desa",
    subtitle: "Akses layanan publik kapan saja dan di mana saja dengan mudah dan cepat.",
  },
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.highlight}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,76,37,0.85) 0%, rgba(22,163,74,0.75) 50%, rgba(13,148,136,0.80) 100%)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`transition-all duration-700 ${idx === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"}`}
          >
            {idx === current && (
              <>
                <h1
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {slide.title}
                  <br />
                  <span className="text-green-300">{slide.highlight}</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
              }`}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function Home() {
  const [kegiatan, setKegiatan] = useState<KegiatanDesa[]>([]);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [kkCount, setKkCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kegRes, agendaRes, photoRes, kkRes] = await Promise.all([
          fetch("/api/kegiatan-desa"),
          fetch("/api/agenda"),
          fetch("/api/photos"),
          fetch("/api/kepala-keluarga"),
        ]);
        const [kegData, agendaData, photoData, kkData] = await Promise.all([
          kegRes.json(),
          agendaRes.json(),
          photoRes.json(),
          kkRes.json(),
        ]);
        setKegiatan(Array.isArray(kegData) ? kegData : []);
        setAgenda(Array.isArray(agendaData) ? agendaData.slice(0, 4) : []);
        setPhotos(Array.isArray(photoData) ? photoData.slice(0, 6) : []);
        setKkCount(Array.isArray(kkData) ? kkData.length : null);
      } catch {
        // silently fail — will show fallback UI
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════════ HERO SECTION – SLIDESHOW ═══════════════════ */}
      <HeroSlideshow />


      {/* ═══════════════════ TENTANG DESA – HEADING ═══════════════════ */}
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tentang Portal Desa
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" />
        </div>
      </section>


      {/* ═══════════════════ TENTANG DESA ═══════════════════ */}
      <motion.section 
        id="tentang" 
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Membangun Desa Digital<br />
                <span className="gradient-text">yang Maju & Transparan</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Portal Desa Damuli Pekan adalah platform digital yang dirancang khusus untuk meningkatkan transparansi, efisiensi, dan kualitas pelayanan publik di tingkat desa. Kami menyediakan akses mudah ke informasi dan layanan yang dibutuhkan masyarakat.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Dengan teknologi modern, portal ini menghubungkan pemerintah desa dengan warga secara langsung, memastikan setiap keputusan dan kebijakan dapat diakses secara transparan oleh seluruh lapisan masyarakat.
              </p>

              {/* Advantages grid */}
              <div className="grid grid-cols-2 gap-4">
                {advantages.map((adv, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 transition-colors cursor-default"
                  >
                    <div className="text-2xl flex-shrink-0">{adv.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm mb-1">{adv.title}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{adv.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-500 to-emerald-700 aspect-[4/3] shadow-2xl">
                {/* Decorative content inside the visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-10">
                    <motion.div 
                      className="w-24 h-24 flex items-center justify-center mx-auto mb-6"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
                    >
                      <img
                        src="/logodescan.png"
                        alt="Logo Descan"
                        className="w-24 h-24 object-contain"
                      />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Desa Damuli Pekan</h3>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {["Pelayanan", "Transparansi", "Digital", "Terpercaya"].map((tag) => (
                        <motion.div 
                          key={tag} 
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/15 rounded-lg py-2 px-3 text-sm font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-emerald-900/20 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════ KOLABORASI BPS ═══════════════════ */}
      <motion.section 
        className="py-24 overflow-hidden" 
        style={{ background: "linear-gradient(135deg, #1a3a6e 0%, #1e4d8c 50%, #1a3a6e 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section title */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Kolaborasi dengan BPS
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-orange-400 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Context & Features */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8 shadow-xl">
                <p className="text-blue-100 text-lg leading-relaxed">
                  Desa Damuli Pekan dengan bangga bermitra bersama <span className="text-white font-semibold">Badan Pusat Statistik (BPS)</span> melalui program{" "}
                  <span className="text-orange-400 font-bold">Desa Cinta Statistik (Desa Cantik)</span>. Kerjasama ini bertujuan untuk meningkatkan literasi, kesadaran, dan peran aktif masyarakat serta aparatur desa dalam penyelenggaraan kegiatan statistik.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "", label: "Data Akurat & Mutakhir" },
                  { icon: "", label: "Pembangunan Tepat Sasaran" },
                  { icon: "", label: "Pengambilan Keputusan Cerdas" },
                  { icon: "", label: "Pemberdayaan Masyarakat" }
                ].map((f) => (
                  <motion.div
                    key={f.label}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 0.5)" }}
                    className="flex items-center gap-3 bg-blue-800/40 border border-blue-600/30 rounded-xl px-4 py-3 text-blue-100 text-sm font-medium backdrop-blur-sm transition-colors cursor-default"
                  >
                    <span className="text-lg">{f.icon}</span>
                    {f.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — BPS card */}
            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-xs w-full text-center relative overflow-hidden"
              >
                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-50 rounded-full" />

                <div className="relative z-10">
                  {/* BPS Logo */}
                  <div className="w-[100px] h-[100px] mx-auto mb-2 flex items-center justify-center">
                    <img
                      src="/bps-logo.png"
                      alt="Logo BPS"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling!.classList.remove("hidden");
                      }}
                    />
                    {/* Fallback SVG logo if image not found */}
                    <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-green-500 to-orange-500 flex items-center justify-center">
                      <span className="text-white font-extrabold text-2xl">BPS</span>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-gray-800 text-base leading-snug mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Badan Pusat Statistik <span className="text-blue-700 block mt-1">Kab. Labuhanbatu&nbsp;Utara</span>
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-5">
                    Mitra resmi dalam pengembangan sistem informasi desa berbasis data statistik yang akurat dan terpercaya
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-orange-200 cursor-pointer"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ❤️
                    </motion.span> 
                    Desa Cinta Statistik
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════ LAYANAN ═══════════════════ */}
      <motion.section 
        id="layanan" 
        className="py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Layanan Digital <span className="gradient-text">Desa Damuli Pekan</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Berbagai layanan digital yang tersedia untuk memudahkan akses masyarakat terhadap informasi dan administrasi desa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={svc.href} className="block h-full">
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className="card-hover bg-white rounded-2xl p-7 border border-gray-100 h-full flex flex-col items-start"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                      {svc.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{svc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
                    <div className="mt-5 flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Selengkapnya
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* ═══════════════════ AGENDA ═══════════════════ */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-green-900 to-emerald-800 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-4">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Jadwal Kegiatan Desa
              </h2>
              <div className="mt-3 w-16 h-1 bg-green-400 rounded-full" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/agenda-desa" className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full font-medium transition-all backdrop-blur-sm">
                Lihat Semua
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="skeleton h-24 rounded-2xl bg-white/10" />)}
            </div>
          ) : agenda.length > 0 ? (
            <div className="space-y-4">
              {agenda.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-5 hover:bg-white/20 transition-all cursor-default"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 bg-white rounded-2xl p-3 text-center min-w-[64px] shadow-sm">
                    <div className="text-xs font-bold text-green-700 uppercase">{formatMonth(item.tanggalKegiatan)}</div>
                    <div className="text-2xl font-extrabold text-gray-800 leading-tight">{formatDay(item.tanggalKegiatan)}</div>
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base mb-1 truncate">{item.judulKegiatan}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/60 text-xs">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.waktuMulai} – {item.waktuSelesai}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {item.tempatKegiatan}
                      </span>
                    </div>
                  </div>
                  {/* Organizer tag */}
                  <div className="hidden sm:block flex-shrink-0">
                    <span className="bg-white/15 text-white/80 text-xs px-3 py-1.5 rounded-lg border border-white/10">{item.penyelenggara}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-lg font-semibold text-white mb-1">Belum Ada Agenda</h3>
              <p className="text-white/60 text-sm">Tidak ada jadwal kegiatan dalam waktu dekat</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* ═══════════════════ GALERI FOTO ═══════════════════ */}
      <motion.section 
        className="py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Foto Kegiatan <span className="gradient-text">Desa</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
              Momen berharga dari berbagai kegiatan dan pembangunan Desa Damuli Pekan
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton aspect-video rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center ${i % 4 === 0 ? "from-green-400 to-emerald-600" :
                      i % 4 === 1 ? "from-blue-400 to-blue-600" :
                        i % 4 === 2 ? "from-purple-400 to-purple-600" :
                          "from-amber-400 to-orange-500"
                    }`}>
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
            </div>
          )}
        </div>
      </motion.section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Butuh Informasi Lebih?
              </h2>
              <p className="text-green-100 mb-8 text-lg">
                Hubungi kantor desa atau kunjungi halaman informasi untuk mendapatkan bantuan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/informasi-desa" className="bg-white text-green-700 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                  Informasi Desa
                </Link>
                <Link href="/kontak" className="btn-outline py-3 px-8">
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
