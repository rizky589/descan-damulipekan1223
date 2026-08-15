import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoverInfografisImage from "@/components/CoverInfografisImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infografis Desa - Portal Desa Damuli Pekan",
  description: "Infografis Desa Damuli Pekan",
};

export default function InfografisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Data dan Informasi Statistik</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Infografis Desa
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Informasi visual terkait data kependudukan, ekonomi, dan fasilitas Desa Damuli Pekan
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
            <span className="text-green-600 font-medium">Infografis</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
        
            <h2 className="text-xl font-bold text-gray-900">Infografis Desa Damuli Pekan</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cover PDF */}
            <div className="w-full lg:w-[55%] flex-shrink-0">
              <CoverInfografisImage />
            </div>

            {/* Deskripsi + Tombol Unduh */}
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold text-green-700 mb-4 uppercase leading-tight">
                Desa Damuli Pekan Dalam Infografis
              </h3>
              <div className="w-16 h-1 bg-green-500 rounded-full mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Desa Damuli Pekan merupakan salah satu wilayah desa yang memiliki potensi penduduk, ekonomi, serta sarana dan prasarana yang cukup beragam. Berdasarkan data tahun 2025, Desa Damuli Pekan memiliki jumlah penduduk sebanyak <strong>7.271 jiwa</strong>, yang terdiri atas 3.623 laki-laki dan 3.648 perempuan. Wilayah desa memiliki luas sekitar <strong>2.000 hektare</strong> yang terbagi ke dalam 12 dusun. Dari sisi karakteristik penduduk, sebagian besar penduduk berada pada kelompok usia produktif 18-59 tahun, yaitu sebanyak 4.118 jiwa. Sementara itu, sektor <strong>pertanian, khususnya subsektor tanaman perkebunan</strong>, menjadi sumber penghasilan utama sebagian besar penduduk.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Dalam mendukung kehidupan masyarakat, Desa Damuli Pekan memiliki berbagai fasilitas pendidikan, kesehatan, ekonomi, olahraga, dan keagamaan. Sarana pendidikan terdiri atas TK/RA/BA, SD/sederajat, SMP/sederajat, SMA/sederajat, hingga akademi/perguruan tinggi. Di bidang kesehatan tersedia puskesmas, puskesmas pembantu, tempat praktik bidan, poskesdes, polindes, serta fasilitas kesehatan lainnya. Aktivitas ekonomi masyarakat juga didukung oleh keberadaan <strong>85 toko kelontong, 59 warung/kedai makanan, dan 5 rumah makan</strong>, serta berbagai UMKM seperti warung, toko pakaian, bengkel, penjahit, salon, usaha kue/roti, dan jasa lainnya.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Dari aspek sosial dan lingkungan, mayoritas penduduk Desa Damuli Pekan beragama Islam sebanyak 6.328 jiwa dan Kristen Protestan sebanyak 896 jiwa. Kehidupan masyarakat didukung oleh sarana ibadah berupa 14 masjid, 8 musholla, dan 6 gereja. Di bidang komunikasi, mayoritas penduduk telah menggunakan telepon seluler dan sebagian besar wilayah desa telah mendapatkan sinyal internet 5G/4G/LTE. Dengan dukungan sumber daya manusia, potensi ekonomi, fasilitas pelayanan dasar, serta infrastruktur yang tersedia, Desa Damuli Pekan memiliki modal yang penting untuk terus mengembangkan pembangunan dan meningkatkan kesejahteraan masyarakat.
              </p>
              <a
                href="/Infografis-Damuli-Pekan.pdf"
                download
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md mt-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Infografis (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}