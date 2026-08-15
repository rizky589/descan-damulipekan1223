"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PimpinanOrganisasiDesa {
  id: string;
  nama: string;
  posisi: string;
  periodeAwal: string | null;
  periodeAkhir: string | null;
  pengalaman: string | null;
  fokus: string | null;
  foto: string | null;
  createdAt: string;
}

export default function PimpinanOrganisasiDesaPage() {
  const [pimpinanList, setPimpinanList] = useState<PimpinanOrganisasiDesa[]>([]);

  useEffect(() => {
    const fetchPimpinan = async () => {
      try {
        const response = await fetch("/api/pimpinan-organisasi-desa");
        if (response.ok) {
          const data = await response.json();
          setPimpinanList(data);
        } else {
          console.error("Failed to fetch pimpinan organisasi desa");
        }
      } catch (error) {
        console.error("Error fetching pimpinan organisasi desa:", error);
      }
    };

    fetchPimpinan();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pimpinan ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/pimpinan-organisasi-desa/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPimpinanList((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete pimpinan organisasi desa");
      }
    } catch (error) {
      console.error("Error deleting pimpinan organisasi desa:", error);
      alert("Gagal menghapus pimpinan organisasi desa. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pimpinan Organisasi Desa</h1>
        <Link
          href="/admin/pimpinan-organisasi-desa/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Tambah Pimpinan
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Nama</th>
                <th className="text-left p-4 font-medium text-gray-900">Posisi</th>
                <th className="text-left p-4 font-medium text-gray-900">Periode</th>
                <th className="text-left p-4 font-medium text-gray-900">Pengalaman</th>
                <th className="text-left p-4 font-medium text-gray-900">Fokus</th>
                <th className="text-left p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pimpinanList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    Tidak ada data pimpinan organisasi desa
                  </td>
                </tr>
              ) : (
                pimpinanList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        {item.foto && (
                          <img src={item.foto} alt={item.nama} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        {item.nama}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{item.posisi}</td>
                    <td className="p-4 text-gray-600">
                      {item.periodeAwal && item.periodeAkhir 
                        ? `${item.periodeAwal} - ${item.periodeAkhir}`
                        : item.periodeAwal || item.periodeAkhir || "-"}
                    </td>
                    <td className="p-4 text-gray-600">{item.pengalaman || "-"}</td>
                    <td className="p-4 text-gray-600">{item.fokus || "-"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/pimpinan-organisasi-desa/${item.id}/edit`}
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
