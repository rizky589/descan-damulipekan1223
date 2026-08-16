"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Hukum {
    id: string;
    namaKategori: string;
    deskripsi?: string;
    createdAt: string;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function JDIH() {
    const [hukums, setHukums] = useState<Hukum[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/hukum")
            .then((r) => r.json())
            .then((data) => setHukums(Array.isArray(data) ? data : (data?.data || [])))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filtered = hukums.filter((h) =>
        h.namaKategori.toLowerCase().includes(search.toLowerCase()) ||
        (h.deskripsi && h.deskripsi.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="hero-bg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-badge bg-white/15 text-white border-white/20">Hukum</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        JDIH
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Jaringan Dokumentasi dan Informasi Hukum — Peraturan dan dokumen hukum resmi Desa Damuli Pekan
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-green-600 font-medium">JDIH</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Info banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Tentang JDIH</h3>
                        <p className="text-blue-600 text-sm leading-relaxed">
                            JDIH (Jaringan Dokumentasi dan Informasi Hukum) adalah portal resmi yang menyediakan dokumentasi hukum berupa peraturan desa, keputusan kepala desa, dan produk hukum lainnya yang berlaku di Desa Damuli Pekan.
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Cari peraturan atau kategori hukum..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm shadow-sm"
                    />
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                                <div className="skeleton h-5 w-1/2 mb-3" />
                                <div className="skeleton h-4 w-full mb-2" />
                                <div className="skeleton h-4 w-3/4" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <>
                        <div className="text-sm text-gray-500 mb-4">
                            Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> dokumen hukum
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filtered.map((item, i) => (
                                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="font-bold text-gray-900 leading-tight">{item.namaKategori}</h3>
                                                <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                                                    Hukum
                                                </span>
                                            </div>
                                            {item.deskripsi && (
                                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-3">{item.deskripsi}</p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {formatDate(item.createdAt)}
                                                </span>
                                                <span className="text-xs text-gray-300">#{String(i + 1).padStart(3, "0")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                        <div className="text-6xl mb-4">⚖️</div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">
                            {search ? "Tidak Ditemukan" : "Belum Ada Data"}
                        </h3>
                        <p className="text-gray-400">
                            {search ? `Tidak ada dokumen yang cocok dengan "${search}"` : "Data peraturan hukum desa akan ditampilkan di sini"}
                        </p>
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="mt-4 text-green-600 text-sm font-medium hover:underline"
                            >
                                Hapus filter
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
