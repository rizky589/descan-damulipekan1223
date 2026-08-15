"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ReportData {
    id: string;
    judul: string;
    waktuTerbit?: string;
    deskripsi?: string;
    kategori?: string;
    filePath?: string;
    createdAt: string;
}

function formatDate(dateStr?: string) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
    kependudukan: { bg: "bg-blue-100", text: "text-blue-700", icon: "👥" },
    ekonomi: { bg: "bg-green-100", text: "text-green-700", icon: "💹" },
    sosial: { bg: "bg-purple-100", text: "text-purple-700", icon: "🤝" },
    pertanian: { bg: "bg-amber-100", text: "text-amber-700", icon: "🌾" },
    infrastruktur: { bg: "bg-gray-100", text: "text-gray-700", icon: "🏗️" },
};

function getCategoryStyle(kategori?: string) {
    if (!kategori) return { bg: "bg-teal-100", text: "text-teal-700", icon: "📊" };
    const key = Object.keys(categoryColors).find(k => kategori.toLowerCase().includes(k));
    return key ? categoryColors[key] : { bg: "bg-teal-100", text: "text-teal-700", icon: "📊" };
}

export default function DaftarData() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedKategori, setSelectedKategori] = useState<string>("all");

    useEffect(() => {
        fetch("/api/report-data")
            .then((r) => r.json())
            .then((data) => setReports(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const kategoris = ["all", ...Array.from(new Set(reports.map(r => r.kategori).filter(Boolean) as string[]))];

    const filtered = reports.filter((r) => {
        const matchSearch = r.judul.toLowerCase().includes(search.toLowerCase()) ||
            (r.deskripsi && r.deskripsi.toLowerCase().includes(search.toLowerCase()));
        const matchKategori = selectedKategori === "all" || r.kategori === selectedKategori;
        return matchSearch && matchKategori;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="hero-bg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-badge bg-white/15 text-white border-white/20">Statistik & Data</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Daftar Data
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Kumpulan data dan laporan statistik Desa Damuli Pekan untuk mendukung perencanaan pembangunan
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-green-600 font-medium">Daftar Data</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats bar */}
                {!loading && reports.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Total Dataset", value: reports.length, icon: "📊", color: "text-green-600" },
                            { label: "Kategori", value: kategoris.length - 1, icon: "🏷️", color: "text-blue-600" },
                            { label: "Terbaru", value: formatDate(reports[0]?.waktuTerbit || reports[0]?.createdAt), icon: "📅", color: "text-purple-600" },
                            { label: "Tersedia", value: reports.filter(r => r.filePath).length, icon: "📁", color: "text-orange-600" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className={`text-xl font-extrabold ${stat.color}`}>{stat.value || "-"}</div>
                                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari data atau laporan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm shadow-sm"
                        />
                    </div>

                    {/* Category filter */}
                    {kategoris.length > 1 && (
                        <select
                            value={selectedKategori}
                            onChange={(e) => setSelectedKategori(e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-sm"
                        >
                            <option value="all">Semua Kategori</option>
                            {kategoris.filter(k => k !== "all").map(k => (
                                <option key={k} value={k}>{k}</option>
                            ))}
                        </select>
                    )}
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
                            Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> dari {reports.length} dataset
                        </div>
                        <div className="space-y-4">
                            {filtered.map((item, i) => {
                                const catStyle = getCategoryStyle(item.kategori);
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover">
                                        <div className="flex items-start gap-5">
                                            {/* Number */}
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm font-bold flex-shrink-0">
                                                {String(i + 1).padStart(2, "0")}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    {item.kategori && (
                                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}>
                                                            <span>{catStyle.icon}</span>
                                                            {item.kategori}
                                                        </span>
                                                    )}
                                                    {item.waktuTerbit && (
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                            Terbit: {formatDate(item.waktuTerbit)}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">{item.judul}</h3>
                                                {item.deskripsi && (
                                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.deskripsi}</p>
                                                )}
                                            </div>

                                            {/* Download / Action */}
                                            <div className="flex-shrink-0">
                                                {item.filePath ? (
                                                    <a
                                                        href={item.filePath}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Unduh
                                                    </a>
                                                ) : (
                                                    <span className="flex items-center gap-2 bg-gray-50 text-gray-400 text-sm px-4 py-2.5 rounded-xl">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Lihat
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                        <div className="text-6xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">
                            {search || selectedKategori !== "all" ? "Tidak Ditemukan" : "Belum Ada Data"}
                        </h3>
                        <p className="text-gray-400">
                            {search || selectedKategori !== "all"
                                ? "Coba ubah kata kunci atau filter kategori"
                                : "Data dan laporan statistik desa akan ditampilkan di sini"}
                        </p>
                        {(search || selectedKategori !== "all") && (
                            <button
                                onClick={() => { setSearch(""); setSelectedKategori("all"); }}
                                className="mt-4 text-green-600 text-sm font-medium hover:underline"
                            >
                                Reset filter
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
