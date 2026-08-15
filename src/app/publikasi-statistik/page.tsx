import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoverStatistikImage from "@/components/CoverStatistikImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publikasi Statistik Lainnya - Portal Desa Damuli Pekan",
  description: "Dokumen publikasi statistik lainnya terkait Desa Damuli Pekan",
};

export default function PublikasiStatistikPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Data dan Informasi Statistik</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Publikasi Statistik
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Dokumen publikasi laporan dan data statistik sektoral Desa Damuli Pekan
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
            <span className="text-green-600 font-medium">Publikasi Statistik</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Publikasi Statistik Lainnya</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover PDF */}
            <div className="flex-shrink-0 w-full md:w-72">
              <CoverStatistikImage />
            </div>

            {/* Deskripsi + Tombol Unduh */}
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold text-green-700 mb-4 uppercase leading-tight">
                Publikasi Statistik Lainnya
              </h3>
              <div className="w-16 h-1 bg-green-500 rounded-full mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Desa Damuli Pekan merupakan salah satu pusat permukiman di Kecamatan Kualuh Selatan yang terus berkembang melalui berbagai kegiatan pemerintahan, pelayanan masyarakat, pembangunan, serta pemberdayaan masyarakat. Sepanjang periode publikasi, Pemerintah Desa Damuli Pekan melaksanakan berbagai kegiatan yang mencerminkan upaya menjaga ketertiban dan keamanan, meningkatkan kedisiplinan aparatur, serta memperkuat koordinasi dalam penyelenggaraan pemerintahan. Kegiatan tersebut antara lain penertiban pencurian buah kelapa sawit, apel rutin jajaran pemerintah desa, gotong royong membersihkan lingkungan kantor dan tempat pemakaman umum, serta pelaksanaan pelayanan administrasi kepada masyarakat. Pemerintah desa juga melaksanakan pembangunan infrastruktur berupa parit untuk mendukung sistem drainase dan menciptakan lingkungan permukiman yang lebih bersih, sehat, dan nyaman.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Dari sisi permukiman, Desa Damuli Pekan memiliki kondisi hunian yang tergolong baik. Berdasarkan data tahun 2025, tercatat 1.918 rumah layak huni dan tidak terdapat rumah tidak layak huni berdasarkan jumlah keluarga. Pada tingkat unit bangunan, terdapat 1.918 rumah layak huni, 11 unit perumahan kompleks, dan 1 unit asrama. Kondisi tersebut menunjukkan bahwa seluruh rumah yang tercatat telah memenuhi kriteria sebagai rumah layak huni dan menjadi salah satu gambaran positif mengenai kondisi tempat tinggal masyarakat Desa Damuli Pekan.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Selain permukiman, sektor Usaha Mikro, Kecil, dan Menengah (UMKM) menjadi bagian penting dalam aktivitas ekonomi masyarakat Desa Damuli Pekan. Pada tahun 2025 terdapat beragam usaha yang berkembang, meliputi 39 warung makan atau kedai, 34 toko kelontong/warung, 20 usaha penjahit, 17 bengkel, 11 salon/pangkas rambut, 10 usaha las/bubut, 5 toko pakaian, dan 2 usaha kue/roti. Keberagaman usaha tersebut menunjukkan bahwa kegiatan ekonomi desa tidak hanya bergerak pada perdagangan, tetapi juga mencakup sektor jasa dan industri kecil. Keberadaan UMKM berperan dalam memenuhi kebutuhan masyarakat, membuka kesempatan kerja, meningkatkan pendapatan keluarga, serta mendorong pertumbuhan ekonomi lokal.
              </p>
              
              <div className="bg-green-50 rounded-xl p-5 mb-8 border border-green-100">
                <h4 className="font-semibold text-green-800 mb-2">Informasi Dokumen</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex justify-between border-b border-green-200/50 pb-2">
                    <span className="opacity-80">Tahun Publikasi</span>
                    <span className="font-medium">2025</span>
                  </li>
                  <li className="flex justify-between border-b border-green-200/50 pb-2">
                    <span className="opacity-80">Cakupan Wilayah</span>
                    <span className="font-medium">Desa Damuli Pekan</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="opacity-80">Format</span>
                    <span className="font-medium">PDF (Portable Document Format)</span>
                  </li>
                </ul>
              </div>

              <a
                href="/publikasi-statistik-lainnya.pdf"
                download
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Publikasi Statistik (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}