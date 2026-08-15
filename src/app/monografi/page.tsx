import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monografi Desa - Portal Desa Damuli Pekan",
  description: "Monografi Desa Damuli Pekan - Data dan informasi wilayah desa",
};

export default function MonografiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Data dan Informasi Statistik</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Monografi Desa
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Data monografi wilayah dan kependudukan Desa Damuli Pekan
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-500">Data dan Informasi Statistik</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-green-600 font-medium">Monografi</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            
            <h2 className="text-xl font-bold text-gray-900">Monografi Desa Damuli Pekan</h2>
          </div>

          {/* Gambar Monografi */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/monografi-desa.jpg"
              alt="Monografi Desa Damuli Pekan"
              className="w-full object-contain"
            />
          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            Monografi Desa Damuli Pekan - Kecamatan Kualuh Selatan, Kabupaten Labuhanbatu Utara
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}