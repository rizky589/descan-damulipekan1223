"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface KegiatanDesa {
  id: string;
  judulKegiatan: string;
  tanggalKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  tempatKegiatan: string;
  penyelenggara: string;
  foto?: string;
  narasi?: string;
}

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function KegiatanDesaPage() {
  const [kegiatan, setKegiatan] = useState<KegiatanDesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<KegiatanDesa | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    fetch("/api/kegiatan-desa")
      .then((r) => r.json())
      .then((data) => setKegiatan(Array.isArray(data) ? data : (data?.data || [])))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(kegiatan.length / PER_PAGE);
  const paged = kegiatan.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Kegiatan</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Kegiatan Desa
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Dokumentasi kegiatan dan program yang dilaksanakan oleh Pemerintah Desa Damuli Pekan
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-green-600 font-medium">Kegiatan Desa</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="skeleton h-52 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : kegiatan.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Kegiatan</h3>
            <p className="text-gray-400">Data kegiatan desa akan tampil di sini</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((k) => (
                <div key={k.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-green-400 to-emerald-600">
                    {k.foto ? (
                      <img src={k.foto} alt={k.judulKegiatan} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Date badge */}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {formatTanggal(k.tanggalKegiatan)}
                    </div>
                    {/* Penyelenggara badge */}
                    <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {k.penyelenggara}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {k.judulKegiatan}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {k.tempatKegiatan}
                      <span className="mx-1">&bull;</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {k.waktuMulai}–{k.waktuSelesai}
                    </div>
                    <button
                      onClick={() => setSelected(k)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${n === page ? "bg-green-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  Selanjutnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
            <p className="text-center text-xs text-gray-400 mt-3">
              Menampilkan {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, kegiatan.length)} dari {kegiatan.length} kegiatan
            </p>
          </>
        )}
      </div>

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {selected.foto && (
              <div className="w-full overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
                <img src={selected.foto} alt={selected.judulKegiatan} className="w-full max-h-96 object-contain" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {selected.penyelenggara}
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {selected.judulKegiatan}
                  </h2>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 ml-4 mt-1 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-400 font-semibold mb-1">📅 Tanggal</div>
                  <div className="font-medium text-gray-700">{formatTanggal(selected.tanggalKegiatan)}</div>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-400 font-semibold mb-1">🕐 Waktu</div>
                  <div className="font-medium text-gray-700">{selected.waktuMulai} – {selected.waktuSelesai}</div>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 col-span-2">
                  <div className="text-xs text-gray-400 font-semibold mb-1">📍 Tempat</div>
                  <div className="font-medium text-gray-700">{selected.tempatKegiatan}</div>
                </div>
              </div>

              {selected.narasi ? (
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Narasi Kegiatan</div>
                  <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{selected.narasi}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">Narasi kegiatan belum tersedia.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
