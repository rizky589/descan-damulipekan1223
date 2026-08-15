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
    const sekdes = pimpinan.find(p => p.posisi.toLowerCase().includes("sekretaris"));
    const kasiList = pimpinan.filter(p => p.posisi.toLowerCase().includes("seksi"));
    const kaurList = pimpinan.filter(p => p.posisi.toLowerCase().includes("urusan"));

    
    
    const CardNode = ({ p, type }: { p: any, type: 'blue' | 'green' }) => (
        <button
            onClick={() => setSelected(p)}
            className={`flex flex-col justify-center items-center bg-white border-[3px] rounded-xl p-3 text-center w-36 sm:w-48 h-24 transition-all z-10 relative cursor-pointer group ${
                type === 'blue' 
                ? 'border-[#1e3a8a] shadow-[4px_4px_0px_#1e3a8a]' 
                : 'border-[#15803d] shadow-[4px_4px_0px_#15803d]'
            } ${selected?.id === p.id ? 'ring-4 ring-offset-2 ring-blue-400 scale-105' : 'hover:-translate-y-1 hover:scale-105'}`}
        >
            <h3 className={`font-bold text-[10px] sm:text-xs leading-tight mb-1 ${type === 'blue' ? 'text-[#1e3a8a]' : 'text-[#15803d]'}`}>
                {p.posisi}
            </h3>
            <p className="text-gray-800 font-extrabold uppercase text-[10px] sm:text-xs tracking-wide line-clamp-2 px-1">
                {p.nama}
            </p>
        </button>
    );

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
                        <div className="flex flex-col items-center">
                            {/* Tree diagram */}
                            <div className="w-full overflow-hidden">
                                <style dangerouslySetInnerHTML={{__html: `
                                    .org-tree ul { display: flex; justify-content: center; padding-top: 20px; position: relative; padding-left: 0; margin: 0; }
                                    .org-tree li { display: flex; flex-direction: column; align-items: center; position: relative; padding: 20px 10px 0 10px; list-style-type: none; }
                                    .org-tree li::before, .org-tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #1e3a8a; width: 50%; height: 20px; }
                                    .org-tree li::after { right: auto; left: 50%; border-left: 2px solid #1e3a8a; }
                                    .org-tree li:only-child::after, .org-tree li:only-child::before { display: none; }
                                    .org-tree li:only-child { padding-top: 0; }
                                    .org-tree li:first-child::before, .org-tree li:last-child::after { border: 0 none; }
                                    .org-tree li:last-child::before { border-right: 2px solid #1e3a8a; border-radius: 0; }
                                    .org-tree ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #1e3a8a; width: 0; height: 20px; transform: translateX(-50%); }
                                    .org-tree > ul::before { display: none; }
                                `}} />

                                <div className="org-tree overflow-x-auto pb-8 pt-4 w-full flex justify-center">
                                    <ul>
                                        <li>
                                            {kepalaDesa && <CardNode p={kepalaDesa} type="blue" />}
                                            <ul>
                                                {kasiList.map(kasi => (
                                                    <li key={kasi.id}>
                                                        <CardNode p={kasi} type="green" />
                                                    </li>
                                                ))}
                                                {sekdes && (
                                                    <li>
                                                        <CardNode p={sekdes} type="blue" />
                                                        {kaurList.length > 0 && (
                                                            <ul>
                                                                {kaurList.map(kaur => (
                                                                    <li key={kaur.id}>
                                                                        <CardNode p={kaur} type="blue" />
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Detail panel */}
                            {selected && (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-6 w-full max-w-3xl text-left">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${getColor(selected.posisi)} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0`}>
                                            {selected.foto
                                                ? <img src={selected.foto} alt={selected.nama} className="w-full h-full object-cover rounded-2xl" />
                                                : getInitials(selected.nama)}
                                        </div>
                                        <div>
                                            <div className="text-green-600 text-sm font-bold mb-1">{selected.posisi}</div>
                                            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {selected.nama}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(selected.periodeAwal || selected.periodeAkhir) && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium">Masa Jabatan</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.periodeAwal || '-'} s/d {selected.periodeAkhir || 'Sekarang'}</div>
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
                                                    <div className="text-xs text-gray-500 font-medium">Pengalaman</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.pengalaman}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selected.fokus && (
                                            <div className="flex items-start gap-3 md:col-span-2">
                                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium">Fokus & Tugas Utama</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.fokus}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx > 0) setSelected(pimpinan[idx - 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === 0}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: '&larr; Sebelumnya' }} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx < pimpinan.length - 1) setSelected(pimpinan[idx + 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === pimpinan.length - 1}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: 'Berikutnya &rarr;' }} />
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
