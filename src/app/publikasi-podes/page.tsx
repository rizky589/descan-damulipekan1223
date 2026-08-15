import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoverPodesImage from "@/components/CoverPodesImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publikasi Data Podes - Portal Desa Damuli Pekan",
  description: "Publikasi Data Potensi Desa (Podes) Damuli Pekan",
};

export default function PublikasiPodesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Data dan Informasi Statistik</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Publikasi Data Podes
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Dokumen publikasi resmi Data Potensi Desa (Podes) Damuli Pekan
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
            <span className="text-green-600 font-medium">Publikasi Data Podes</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            
            <h2 className="text-xl font-bold text-gray-900">Dokumen Publikasi Data Podes</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover PDF */}
            <div className="flex-shrink-0 w-full md:w-72">
              <CoverPodesImage />
            </div>

            {/* Deskripsi + Tombol Unduh */}
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold text-green-700 mb-4 uppercase leading-tight">
                Publikasi Data Podes 2025
              </h3>
              <div className="w-16 h-1 bg-green-500 rounded-full mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Desa Damuli Pekan merupakan desa yang memiliki sejarah panjang dan berkembang dari semangat kebersamaan serta gotong royong masyarakat. Sejarah desa ini bermula sekitar tahun 1920 ketika wilayah Damuli mulai dibuka dan dihuni oleh masyarakat yang diprakarsai oleh Saudara Sadimin bersama para tokoh masyarakat. Seiring perkembangan waktu, Desa Damuli Pekan terus tumbuh sebagai kawasan permukiman sekaligus pusat aktivitas sosial dan ekonomi masyarakat. Saat ini, Desa Damuli Pekan secara administratif berada di Kecamatan Kualuh Selatan, Kabupaten Labuhanbatu Utara, Provinsi Sumatera Utara, dengan luas wilayah sekitar 2.000 hektare yang terbagi menjadi 12 dusun. Letaknya yang strategis, berada di sekitar Jalan Lintas Sumatera dan berjarak sekitar 1 kilometer dari pusat pemerintahan Kecamatan Kualuh Selatan, memberikan kemudahan akses terhadap pelayanan pemerintahan, pendidikan, kesehatan, perdagangan, serta mobilitas masyarakat.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Dari sisi kependudukan, Desa Damuli Pekan memiliki 7.224 jiwa yang tergabung dalam 2.083 kepala keluarga berdasarkan data tahun 2025. Struktur penduduk didominasi oleh kelompok usia produktif 18–59 tahun sebanyak 4.118 jiwa, sehingga menjadi potensi sumber daya manusia yang besar bagi pembangunan dan pengembangan ekonomi desa. Masyarakat Desa Damuli Pekan memiliki mata pencaharian yang beragam, antara lain sebagai wiraswasta, petani, nelayan, ASN, pegawai swasta, pedagang, buruh, serta profesi lainnya. Keragaman tersebut menunjukkan bahwa aktivitas ekonomi desa tidak hanya bertumpu pada satu sektor, meskipun pertanian dan usaha mandiri tetap menjadi salah satu penopang penting perekonomian masyarakat. Di sisi sosial, kehidupan masyarakat juga ditandai oleh keberagaman agama yang hidup berdampingan secara harmonis serta masih kuatnya nilai kebersamaan dan gotong royong.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Dalam mendukung kehidupan masyarakat, Desa Damuli Pekan telah memiliki berbagai sarana dan prasarana pendidikan, kesehatan, sosial, serta ekonomi. Fasilitas pendidikan tersedia mulai dari TK, SD, SMP, SMA hingga perguruan tinggi, dengan Dusun VIII Simpang Siranggong menjadi salah satu pusat pelayanan pendidikan karena memiliki fasilitas pendidikan yang relatif lengkap. Selain itu, keberadaan berbagai tenaga dan fasilitas kesehatan, sarana ibadah, fasilitas olahraga, serta UMKM menjadi bagian penting dalam menunjang aktivitas masyarakat. Dengan potensi wilayah yang strategis, sumber daya manusia yang besar, keragaman aktivitas ekonomi, serta nilai sosial dan gotong royong yang terus dipelihara, Desa Damuli Pekan memiliki modal yang kuat untuk berkembang menjadi desa yang maju, mandiri, sejahtera, dan berdaya saing. Profil Desa Damuli Pekan Tahun 2026 diharapkan dapat menjadi sumber informasi dan dasar dalam mendukung perencanaan pembangunan yang lebih tepat sasaran dan berbasis data.
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
                href="/publikasi-data-podes-2025.pdf"
                download
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Dokumen Podes (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}