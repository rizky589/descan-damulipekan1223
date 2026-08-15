"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import Link from "next/link";

// Data konten website untuk pencarian
const SEARCH_DATA = [
  {
    title: "Profil & Informasi Desa",
    description: "Sejarah, letak geografis, visi misi, dan buku profil Desa Damuli Pekan.",
    href: "/informasi-desa",
    tags: ["profil", "sejarah", "visi", "misi", "informasi", "buku profil", "damuli pekan"],
  },
  {
    title: "Struktur Organisasi",
    description: "Susunan pemerintahan dan struktur organisasi Desa Damuli Pekan.",
    href: "/struktur-organisasi",
    tags: ["struktur", "organisasi", "pemerintahan", "kades", "perangkat desa"],
  },
  {
    title: "APBDes",
    description: "Anggaran Pendapatan dan Belanja Desa (APBDes) Damuli Pekan.",
    href: "/apbdes",
    tags: ["apbdes", "anggaran", "keuangan", "dana desa", "transparansi", "belanja"],
  },
  {
    title: "Kegiatan Desa",
    description: "Berita, dokumentasi, dan kegiatan terbaru yang dilaksanakan di desa.",
    href: "/kegiatan-desa",
    tags: ["kegiatan", "berita", "dokumentasi", "acara", "terbaru"],
  },
  {
    title: "Agenda Desa",
    description: "Jadwal dan agenda kegiatan yang akan datang di Desa Damuli Pekan.",
    href: "/agenda-desa",
    tags: ["agenda", "jadwal", "kegiatan", "akan datang", "acara"],
  },
  {
    title: "JDIH (Produk Hukum)",
    description: "Jaringan Dokumentasi dan Informasi Hukum, Peraturan Desa (Perdes).",
    href: "/jdih",
    tags: ["jdih", "hukum", "perdes", "peraturan", "dokumen", "legal"],
  },
  {
    title: "Monografi Desa",
    description: "Data monografi wilayah dan kependudukan Desa Damuli Pekan.",
    href: "/monografi",
    tags: ["monografi", "statistik", "data", "kependudukan", "wilayah"],
  },
  {
    title: "Infografis Desa",
    description: "Informasi visual terkait data kependudukan, ekonomi, dan fasilitas desa.",
    href: "/infografis",
    tags: ["infografis", "gambar", "visual", "statistik", "data", "penduduk"],
  },
  {
    title: "Publikasi Data Podes",
    description: "Dokumen resmi publikasi Data Potensi Desa (Podes) Damuli Pekan 2025.",
    href: "/publikasi-podes",
    tags: ["publikasi", "podes", "potensi", "data", "statistik", "dokumen", "2025"],
  },
  {
    title: "Publikasi Statistik Lainnya",
    description: "Laporan statistik sektoral, UMKM, dan permukiman Desa Damuli Pekan.",
    href: "/publikasi-statistik",
    tags: ["publikasi", "statistik", "umkm", "laporan", "data", "permukiman"],
  },
  {
    title: "Kontak",
    description: "Informasi kontak, lokasi kantor desa, dan form pengaduan/pesan.",
    href: "/kontak",
    tags: ["kontak", "hubungi", "lokasi", "alamat", "telepon", "pesan", "pengaduan"],
  }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const lowerQuery = query.toLowerCase().trim();

  // Filter data berdasarkan judul, deskripsi, atau tags
  const results = useMemo(() => {
    if (!lowerQuery) return [];
    
    return SEARCH_DATA.filter(item => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.includes(lowerQuery))
      );
    });
  }, [lowerQuery]);

  return (
    <div className="flex-1 pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Hasil Pencarian</h1>
      
      {query ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <p className="text-gray-600 mb-6 pb-4 border-b border-gray-100">
            Menampilkan hasil pencarian untuk: <strong className="text-green-700">"{query}"</strong>
          </p>
          
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Link href={result.href} key={index} className="block group">
                  <div className="p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all">
                    <h3 className="text-lg font-bold text-green-700 group-hover:text-green-800 flex items-center gap-2">
                      {result.title}
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                    <div className="text-xs text-green-600/70 mt-2 flex gap-2">
                      <span className="bg-white px-2 py-0.5 rounded border border-green-100">
                        {result.href}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Pencarian tidak ditemukan</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                Maaf, kami tidak dapat menemukan halaman yang berhubungan dengan "{query}". Coba gunakan kata kunci lain (misal: "profil", "publikasi", "statistik").
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Silakan masukkan kata kunci pencarian di kolom pencarian.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-gray-500">Memuat pencarian...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}