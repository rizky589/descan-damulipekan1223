"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PimpinanOrganisasi {
    id: string;
    nama: string;
    posisi: string;
    periodeAwal?: string;
    periodeAkhir?: string;
    pengalaman?: string;
    fokus?: string;
    foto?: string;
}

function getInitials(nama: string) {
    return nama.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getColor(posisi: string) {
    const pos = posisi.toLowerCase();
    if (pos.includes("kepala desa")) return "from-green-500 to-emerald-600";
    if (pos.includes("sekretaris")) return "from-blue-500 to-blue-600";
    if (pos.includes("bendahara")) return "from-purple-500 to-purple-600";
    if (pos.includes("kaur")) return "from-orange-500 to-amber-600";
    if (pos.includes("kadus")) return "from-teal-500 to-teal-600";
    return "from-gray-400 to-gray-600";
}

const visi = "Terwujudnya Desa Damuli Pekan yang MAJU, SEJAHTERA, MANDIRI, dan BERBUDAYA melalui pembangunan yang partisipatif dan berkelanjutan.";

const misi = [
    "Meningkatkan kualitas pelayanan publik yang cepat, transparan, dan akuntabel kepada seluruh masyarakat desa.",
    "Membangun infrastruktur desa yang merata dan berkualitas untuk mendukung aktivitas masyarakat.",
    "Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi lokal dan pengembangan potensi desa.",
    "Melestarikan budaya dan kearifan lokal sebagai identitas dan kebanggaan masyarakat desa.",
    "Mengembangkan potensi sumber daya manusia melalui pendidikan, pelatihan, dan pembinaan generasi muda.",
];

export default function StrukturOrganisasi() {
    const [pimpinan, setPimpinan] = useState<PimpinanOrganisasi[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<PimpinanOrganisasi | null>(null);

    useEffect(() => {
        fetch("/api/pimpinan-organisasi-desa")
            .then((r) => r.json())
            .then((data) => {
                const list = Array.isArray(data) ? data : [];
                setPimpinan(list);
                if (list.length > 0) setSelected(list[0]);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const kepalaDesa = pimpinan.find(p => p.posisi.toLowerCase().includes("kepala desa")) || pimpinan[0];
    const lainnya = pimpinan.filter(p => p.id !== kepalaDesa?.id);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="hero-bg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-badge bg-white/15 text-white border-white/20">Pemerintahan</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Struktur Organisasi Desa
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Susunan pimpinan dan perangkat pemerintahan Desa Damuli Pekan yang melayani masyarakat
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-green-600 font-medium">Struktur Organisasi Desa</span>
                    </div>
                </div>
            </div>

            {/* ═══ VISI & MISI ═══ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Visi &amp; Misi
                        </h2>
                        <div className="mt-3 mx-auto w-16 h-1 bg-indigo-500 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Visi */}
                        <div className="bg-gray-50 rounded-3xl p-10 flex flex-col items-center text-center border border-gray-100">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Visi</h3>
                            <div className="w-12 h-0.5 bg-indigo-300 rounded mb-6" />
                            <p className="text-gray-700 leading-relaxed font-medium">{visi}</p>
                        </div>

                        {/* Misi */}
                        <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Misi</h3>
                                <div className="w-12 h-0.5 bg-indigo-300 rounded mt-3" />
                            </div>
                            <ol className="space-y-3">
                                {misi.map((m, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                                            {i + 1}
                                        </span>
                                        {m}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ ORG CHART / TREE ═══ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Pemerintahan Desa
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Klik anggota untuk melihat detail</p>
                        <div className="mt-3 mx-auto w-16 h-1 bg-green-500 rounded-full" />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : pimpinan.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Tree diagram */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-8">Pemerintahan desa</p>

                                {/* Root — Kepala Desa */}
                                {kepalaDesa && (
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => setSelected(kepalaDesa)}
                                            className={`flex flex-col items-center group transition-all ${selected?.id === kepalaDesa.id ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                                        >
                                            <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getColor(kepalaDesa.posisi)} flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 transition-all ${selected?.id === kepalaDesa.id ? "ring-green-400" : "ring-white"}`}>
                                                {kepalaDesa.foto
                                                    ? <img src={kepalaDesa.foto} alt={kepalaDesa.nama} className="w-full h-full object-cover rounded-full" />
                                                    : getInitials(kepalaDesa.nama)}
                                            </div>
                                            <span className="mt-2 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                                {kepalaDesa.posisi}
                                            </span>
                                        </button>

                                        {/* Connector line to children */}
                                        {lainnya.length > 0 && (
                                            <>
                                                <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                                                <div className="relative w-full">
                                                    {/* Horizontal bar */}
                                                    {lainnya.length > 1 && (
                                                        <div
                                                            className="absolute top-0 h-0.5 bg-gray-300"
                                                            style={{
                                                                left: `${100 / (lainnya.length * 2)}%`,
                                                                right: `${100 / (lainnya.length * 2)}%`,
                                                            }}
                                                        />
                                                    )}
                                                    {/* Children row */}
                                                    <div className={`grid gap-4 pt-0`} style={{ gridTemplateColumns: `repeat(${Math.min(lainnya.length, 4)}, 1fr)` }}>
                                                        {lainnya.slice(0, 8).map((p) => (
                                                            <div key={p.id} className="flex flex-col items-center">
                                                                <div className="w-0.5 h-6 bg-gray-300" />
                                                                <button
                                                                    onClick={() => setSelected(p)}
                                                                    className={`flex flex-col items-center transition-all ${selected?.id === p.id ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100 hover:scale-105"}`}
                                                                >
                                                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getColor(p.posisi)} flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 transition-all ${selected?.id === p.id ? "ring-green-400" : "ring-white"}`}>
                                                                        {p.foto
                                                                            ? <img src={p.foto} alt={p.nama} className="w-full h-full object-cover rounded-full" />
                                                                            : getInitials(p.nama)}
                                                                    </div>
                                                                    <span className="mt-1.5 text-[10px] font-semibold text-gray-500 text-center leading-tight max-w-[70px]">
                                                                        {p.posisi}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {lainnya.length > 8 && (
                                                        <p className="text-center text-xs text-gray-400 mt-4">
                                                            +{lainnya.length - 8} anggota lainnya
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Detail panel */}
                            {selected && (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sticky top-28">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getColor(selected.posisi)} flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0`}>
                                            {selected.foto
                                                ? <img src={selected.foto} alt={selected.nama} className="w-full h-full object-cover rounded-2xl" />
                                                : getInitials(selected.nama)}
                                        </div>
                                        <div>
                                            <div className="text-green-600 text-sm font-bold mb-1">{selected.posisi}</div>
                                            <h3 className="text-xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {selected.nama}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {(selected.periodeAwal || selected.periodeAkhir) && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Periode</div>
                                                    <div className="text-gray-700 text-sm font-medium">
                                                        {selected.periodeAwal} {selected.periodeAkhir && `– ${selected.periodeAkhir}`}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selected.pengalaman && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Pengalaman</div>
                                                    <div className="text-gray-700 text-sm">{selected.pengalaman}</div>
                                                </div>
                                            </div>
                                        )}

                                        {selected.fokus && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Bidang / Fokus</div>
                                                    <div className="text-gray-700 text-sm">{selected.fokus}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Navigation buttons */}
                                    <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx > 0) setSelected(pimpinan[idx - 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === 0}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            ← Sebelumnya
                                        </button>
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx < pimpinan.length - 1) setSelected(pimpinan[idx + 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === pimpinan.length - 1}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            Berikutnya →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Data</h3>
                            <p className="text-gray-400">Data pimpinan organisasi akan ditampilkan di sini setelah diinput oleh admin</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
