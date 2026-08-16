"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Agenda {
    id: string;
    judulKegiatan: string;
    tanggalKegiatan: string;
    waktuMulai: string;
    waktuSelesai: string;
    tempatKegiatan: string;
    penyelenggara: string;
}

function formatDateFull(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatDay(dateStr: string) {
    return new Date(dateStr).getDate();
}

function formatMonth(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
}

function formatYear(dateStr: string) {
    return new Date(dateStr).getFullYear();
}

function isUpcoming(dateStr: string) {
    return new Date(dateStr) >= new Date(new Date().setHours(0, 0, 0, 0));
}

export default function AgendaDesa() {
    const [agenda, setAgenda] = useState<Agenda[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

    useEffect(() => {
        fetch("/api/agenda")
            .then((r) => r.json())
            .then((data) => setAgenda(Array.isArray(data) ? data : (data?.data || [])))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filtered = agenda.filter((a) => {
        if (filter === "upcoming") return isUpcoming(a.tanggalKegiatan);
        if (filter === "past") return !isUpcoming(a.tanggalKegiatan);
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="hero-bg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-badge bg-white/15 text-white border-white/20">Jadwal</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Agenda Desa
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Jadwal kegiatan dan acara resmi Desa Damuli Pekan yang dapat diikuti seluruh masyarakat
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-green-600 font-medium">Agenda Desa</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-8 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm w-fit">
                    {([
                        { key: "all", label: "Semua" },
                        { key: "upcoming", label: "Mendatang" },
                        { key: "past", label: "Selesai" },
                    ] as const).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${filter === tab.key
                                    ? "bg-green-600 text-white shadow-sm"
                                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-5">
                                <div className="skeleton w-16 h-16 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="skeleton h-5 w-2/3" />
                                    <div className="skeleton h-4 w-1/3" />
                                    <div className="skeleton h-4 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="space-y-4">
                        {filtered.map((item, i) => {
                            const upcoming = isUpcoming(item.tanggalKegiatan);
                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-2xl border shadow-sm p-5 flex items-start gap-5 card-hover ${upcoming ? "border-green-100" : "border-gray-100"
                                        }`}
                                >
                                    {/* Date */}
                                    <div className={`flex-shrink-0 rounded-2xl p-3 text-center min-w-[68px] ${upcoming ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                                        }`}>
                                        <div className="text-xs font-bold uppercase opacity-80">{formatMonth(item.tanggalKegiatan)}</div>
                                        <div className="text-3xl font-extrabold leading-tight">{formatDay(item.tanggalKegiatan)}</div>
                                        <div className="text-xs opacity-70">{formatYear(item.tanggalKegiatan)}</div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${upcoming ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                                }`}>
                                                {upcoming ? "Mendatang" : "Selesai"}
                                            </span>
                                            <span className="text-xs text-gray-400">{formatDateFull(item.tanggalKegiatan)}</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight">{item.judulKegiatan}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {item.waktuMulai} – {item.waktuSelesai}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                                {item.tempatKegiatan}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                {item.penyelenggara}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Number */}
                                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-400 text-sm font-bold flex-shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Agenda</h3>
                        <p className="text-gray-400">Belum ada agenda yang {filter === "upcoming" ? "mendatang" : filter === "past" ? "telah selesai" : "tersedia"}</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
