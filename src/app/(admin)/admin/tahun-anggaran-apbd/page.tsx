"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TahunAnggaranAPBD {
  id: string;
  tahun: string;
  namaPetugasKeuangan: string | null;
  createdAt: string;
}

export default function TahunAnggaranAPBDPage() {
  const [apbdList, setApbdList] = useState<TahunAnggaranAPBD[]>([]);

  useEffect(() => {
    const fetchApbd = async () => {
      try {
        const response = await fetch("/api/tahun-anggaran-apbd");
        if (response.ok) {
          const data = await response.json();
          setApbdList(data);
        } else {
          console.error("Failed to fetch tahun anggaran APBD");
        }
      } catch (error) {
        console.error("Error fetching tahun anggaran APBD:", error);
      }
    };

    fetchApbd();
  }, []);

  const handleExport = async () => {
    try {
      const response = await fetch("/api/tahun-anggaran-apbd/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tahun-anggaran-apbd.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting tahun anggaran APBD:", error);
      alert("Gagal mengekspor tahun anggaran APBD.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tahun-anggaran-apbd/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setApbdList((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete tahun anggaran APBD");
      }
    } catch (error) {
      console.error("Error deleting tahun anggaran APBD:", error);
      alert("Gagal menghapus data. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tahun Anggaran APBD Desa</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Export Data
          </button>
          <Link
            href="/admin/tahun-anggaran-apbd/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tambah Data
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Tahun</th>
                <th className="text-left p-4 font-medium text-gray-900">Nama Petugas Keuangan</th>
                <th className="text-left p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apbdList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-8 text-gray-500">
                    Tidak ada data tahun anggaran APBD
                  </td>
                </tr>
              ) : (
                apbdList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.tahun}</td>
                    <td className="p-4 text-gray-600">{item.namaPetugasKeuangan || "-"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/tahun-anggaran-apbd/${item.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
