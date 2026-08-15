"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface AnggotaKeluarga {
  id: string;
  nama: string;
  jenisKelamin: string;
  hubungan: string;
  nik?: string;
  umur?: number | null;
}

interface KepalaKeluarga {
  id: string;
  nama: string;
  jenisKelamin: string;
  tempatLahir: string | null;
  tanggalLahir: string | null;
  umur: number | null;
  nik: string;
  noKK: string;
  pekerjaan: string | null;
  pendidikan: string | null;
  alamat: string;
  anggota?: AnggotaKeluarga[];
  createdAt: string;
}

export default function KepalaKeluargaPage() {
  const [kepalaKeluargas, setKepalaKeluargas] = useState<KepalaKeluarga[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKK, setSearchKK] = useState("");
  const [searchNama, setSearchNama] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/kepala-keluarga")
      .then((r) => r.json())
      .then((data) => setKepalaKeluargas(Array.isArray(data) ? data : []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kepala keluarga ini?")) return;
    try {
      const response = await fetch(`/api/kepala-keluarga/${id}`, { method: "DELETE" });
      if (response.ok) {
        setKepalaKeluargas((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch {
      alert("Gagal menghapus kepala keluarga. Silakan coba lagi.");
    }
  };

  // Filter
  const filtered = useMemo(() => {
    return kepalaKeluargas.filter((item) => {
      const kkMatch = item.noKK.toLowerCase().includes(searchKK.toLowerCase());
      const namaMatch = item.nama.toLowerCase().includes(searchNama.toLowerCase());
      return kkMatch && namaMatch;
    });
  }, [kepalaKeluargas, searchKK, searchNama]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [searchKK, searchNama]);

  // Download Excel
  const handleDownloadCSV = () => {
    const headers = ["No KK","NIK","Nama","Hubungan","Jenis Kelamin","Umur","Tempat Lahir","Pekerjaan","Pendidikan","Alamat"];
    const escape = (v: string | number | null | undefined) => {
      const s = String(v ?? "-").replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows: string[][] = [headers];
    filtered.forEach((kk) => {
      rows.push([kk.noKK, kk.nik, kk.nama, "Kepala Keluarga", kk.jenisKelamin, String(kk.umur ?? "-"), kk.tempatLahir ?? "-", kk.pekerjaan ?? "-", kk.pendidikan ?? "-", kk.alamat]);
      (kk.anggota || []).forEach((a) => {
        rows.push([kk.noKK, a.nik ?? "-", a.nama, a.hubungan, a.jenisKelamin, String(a.umur ?? "-"), "-", "-", "-", kk.alamat]);
      });
    });

    const csv = rows.map(r => r.map(escape).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-kepala-keluarga.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kepala Keluarga</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download CSV
          </button>
          <Link
            href="/admin/kepala-keluarga/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            + Tambah KK
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari No KK..."
            value={searchKK}
            onChange={(e) => setSearchKK(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 relative">
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            placeholder="Cari Nama Kepala Keluarga..."
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(searchKK || searchNama) && (
          <button
            onClick={() => { setSearchKK(""); setSearchNama(""); }}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 border border-gray-200 rounded-lg whitespace-nowrap"
          >
            Reset
          </button>
        )}
      </div>

      {/* Info */}
      <div className="text-xs text-gray-500 mb-3">
        Menampilkan {filtered.length} dari {kepalaKeluargas.length} kepala keluarga
        {(searchKK || searchNama) && <span className="ml-1 text-blue-600 font-medium">(difilter)</span>}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">No KK</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">Nama</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">NIK</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">Alamat</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">Pekerjaan</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm text-center">Anggota</th>
                <th className="text-left p-4 font-medium text-gray-900 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-400 text-sm">Memuat data...</td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-400 text-sm">
                    {searchKK || searchNama ? "Tidak ditemukan hasil yang sesuai" : "Tidak ada data kepala keluarga"}
                  </td>
                </tr>
              ) : (
                paged.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    >
                      <td className="p-4 text-gray-700 font-mono text-sm font-semibold">{item.noKK}</td>
                      <td className="p-4 font-medium text-gray-900">{item.nama}</td>
                      <td className="p-4 text-gray-600 font-mono text-sm">{item.nik}</td>
                      <td className="p-4 text-gray-600 text-sm max-w-[180px] truncate">{item.alamat}</td>
                      <td className="p-4 text-gray-600 text-sm">{item.pekerjaan || "-"}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${(item.anggota?.length || 0) > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {(item.anggota?.length || 0) + 1}
                        </span>
                      </td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/kepala-keluarga/${item.id}/anggota`} className="text-green-600 hover:text-green-800 font-medium text-sm">Anggota</Link>
                          <span className="text-gray-300">|</span>
                          <Link href={`/admin/kepala-keluarga/${item.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</Link>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Hapus</button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded: Anggota Keluarga */}
                    {expandedId === item.id && item.anggota && item.anggota.length > 0 && (
                      <tr key={`${item.id}-anggota`}>
                        <td colSpan={7} className="bg-green-50 px-6 pb-4 pt-2">
                          <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Anggota Keluarga ({item.anggota.length} orang)
                          </div>
                          <div className="rounded-lg overflow-hidden border border-green-200">
                            <table className="w-full text-sm">
                              <thead className="bg-green-100">
                                <tr>
                                  <th className="text-left px-4 py-2 font-semibold text-green-800">Nama</th>
                                  <th className="text-left px-4 py-2 font-semibold text-green-800">Hubungan</th>
                                  <th className="text-left px-4 py-2 font-semibold text-green-800">Jenis Kelamin</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-green-100 bg-white">
                                {item.anggota.map((a) => (
                                  <tr key={a.id}>
                                    <td className="px-4 py-2 text-gray-800">{a.nama}</td>
                                    <td className="px-4 py-2 text-gray-600">{a.hubungan}</td>
                                    <td className="px-4 py-2 text-gray-600">{a.jenisKelamin}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">
            Halaman {page} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              ← Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${n === page ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
