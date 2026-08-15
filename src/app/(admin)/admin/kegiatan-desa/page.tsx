"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface KegiatanDesa {
  id: string;
  judulKegiatan: string;
  tanggalKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  tempatKegiatan: string;
  penyelenggara: string;
  createdAt: string;
}

export default function KegiatanDesaPage() {
  const router = useRouter();
  const [kegiatanDesas, setKegiatanDesas] = useState<KegiatanDesa[]>([]);

  useEffect(() => {
    const fetchKegiatanDesas = async () => {
      try {
        const response = await fetch("/api/kegiatan-desa");
        if (response.ok) {
          const data = await response.json();
          setKegiatanDesas(data);
        } else {
          console.error("Failed to fetch kegiatan desa");
        }
      } catch (error) {
        console.error("Error fetching kegiatan desa:", error);
      }
    };

    fetchKegiatanDesas();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this kegiatan desa?")) {
      return;
    }

    try {
      const response = await fetch(`/api/kegiatan-desa/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setKegiatanDesas((prev) => prev.filter((kegiatanDesa) => kegiatanDesa.id !== id));
      } else {
        throw new Error("Failed to delete kegiatan desa");
      }
    } catch (error) {
      console.error("Error deleting kegiatan desa:", error);
      alert("Failed to delete kegiatan desa. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kegiatan Desa</h1>
        <Link
          href="/admin/kegiatan-desa/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New kegiatan desa
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Judul Kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Tanggal Kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Waktu Mulai</th>
                <th className="text-left p-4 font-medium text-gray-900">Waktu Selesai</th>
                <th className="text-left p-4 font-medium text-gray-900">Tempat Kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Penyelenggara</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kegiatanDesas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    No kegiatan desa items found
                  </td>
                </tr>
              ) : (
                kegiatanDesas.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.judulKegiatan}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(item.tanggalKegiatan).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-gray-600">{item.waktuMulai}</td>
                    <td className="p-4 text-gray-600">{item.waktuSelesai}</td>
                    <td className="p-4 text-gray-600">{item.tempatKegiatan}</td>
                    <td className="p-4 text-gray-600">{item.penyelenggara}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/kegiatan-desa/${item.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Delete
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
