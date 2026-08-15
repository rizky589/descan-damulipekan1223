"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TahunAnggaran {
    id: string;
    tahun: string;
    namaPetugasKeuangan?: string;
    createdAt: string;
}

export default function APBDes() {
    const [anggaran, setAnggaran] = useState<TahunAnggaran[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<TahunAnggaran | null>(null);

    useEffect(() => {
        fetch("/api/tahun-anggaran-apbd")
            .then((r) => r.json())
            .then((data) => {
                const list = Array.isArray(data) ? data : [];
                setAnggaran(list);
                if (list.length > 0) setSelected(list[0]);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="hero-bg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-badge bg-white/15 text-white border-white/20">Keuangan Desa</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        APBDes
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Anggaran Pendapatan dan Belanja Desa — Transparansi pengelolaan keuangan Desa Damuli Pekan
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-green-600 font-medium">APBDes</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Info banner */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-green-800 mb-1">Transparansi Keuangan Desa</h3>
                        <p className="text-green-700 text-sm leading-relaxed">
                            APBDes (Anggaran Pendapatan dan Belanja Desa) adalah rencana keuangan tahunan desa yang ditetapkan bersama antara Pemerintah Desa dan BPD. Informasi ini dipublikasikan sebagai bentuk akuntabilitas kepada masyarakat.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
                        </div>
                        <div className="lg:col-span-2 skeleton h-64 rounded-2xl" />
                    </div>
                ) : anggaran.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Year list */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tahun Anggaran</h3>
                            <div className="space-y-2">
                                {anggaran.map((a) => (
                                    <button
                                        key={a.id}
                                        onClick={() => setSelected(a)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${selected?.id === a.id
                                                ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-200"
                                                : "bg-white border-gray-100 text-gray-700 hover:border-green-200 hover:bg-green-50"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0 ${selected?.id === a.id ? "bg-white/20" : "bg-green-100 text-green-700"
                                            }`}>
                                            📅
                                        </div>
                                        <div>
                                            <div className="font-bold text-base">{a.tahun}</div>
                                            <div className={`text-xs ${selected?.id === a.id ? "text-white/70" : "text-gray-400"}`}>
                                                Tahun Anggaran
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="lg:col-span-2">
                            {selected && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                                        <div className="text-sm font-medium text-green-200 mb-1">Anggaran Tahun</div>
                                        <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{selected.tahun}</div>
                                        {selected.namaPetugasKeuangan && (
                                            <div className="text-green-100 text-sm mt-3 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                Petugas Keuangan: <span className="font-semibold">{selected.namaPetugasKeuangan}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <div className="bg-green-50 rounded-xl p-5 text-center">
                                                <div className="text-2xl mb-2">💰</div>
                                                <div className="text-sm text-green-700 font-medium mb-1">Pendapatan Desa</div>
                                                <div className="text-xs text-gray-500">Data pendapatan APBDes {selected.tahun}</div>
                                            </div>
                                            <div className="bg-blue-50 rounded-xl p-5 text-center">
                                                <div className="text-2xl mb-2">🏗️</div>
                                                <div className="text-sm text-blue-700 font-medium mb-1">Belanja Desa</div>
                                                <div className="text-xs text-gray-500">Data belanja APBDes {selected.tahun}</div>
                                            </div>
                                            <div className="bg-orange-50 rounded-xl p-5 text-center">
                                                <div className="text-2xl mb-2">📊</div>
                                                <div className="text-sm text-orange-700 font-medium mb-1">Pembiayaan</div>
                                                <div className="text-xs text-gray-500">Sumber pembiayaan desa</div>
                                            </div>
                                            <div className="bg-purple-50 rounded-xl p-5 text-center">
                                                <div className="text-2xl mb-2">📋</div>
                                                <div className="text-sm text-purple-700 font-medium mb-1">Realisasi</div>
                                                <div className="text-xs text-gray-500">Realisasi anggaran {selected.tahun}</div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-5 text-center border border-dashed border-gray-300">
                                            <div className="text-4xl mb-3">📄</div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Detail APBDes {selected.tahun}</h4>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Untuk melihat rincian lengkap APBDes tahun {selected.tahun}, silakan hubungi kantor desa atau minta dokumen resmi kepada petugas keuangan.
                                            </p>
                                            {selected.namaPetugasKeuangan && (
                                                <p className="text-xs text-gray-400">
                                                    Petugas Keuangan: <span className="font-medium text-gray-600">{selected.namaPetugasKeuangan}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                        <div className="text-6xl mb-4">💼</div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Data APBDes</h3>
                        <p className="text-gray-400">Data anggaran desa akan ditampilkan di sini setelah diinput oleh admin</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
