"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Agenda {
  id: string;
  judulKegiatan: string;
  tanggalKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  tempatKegiatan: string;
  penyelenggara: string;
  createdAt: string;
}

export default function AgendaPage() {
  const router = useRouter();
  const [agendas, setAgendas] = useState<Agenda[]>([]);

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await fetch("/api/agenda");
        if (response.ok) {
          const data = await response.json();
          setAgendas(data);
        } else {
          console.error("Failed to fetch agendas");
        }
      } catch (error) {
        console.error("Error fetching agendas:", error);
      }
    };

    fetchAgendas();
  }, []);

  const handleExport = async () => {
    try {
      const response = await fetch("/api/agenda/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'agenda.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting agenda:", error);
      alert("Gagal mengekspor agenda.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/agenda/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAgendas((prev) => prev.filter((agenda) => agenda.id !== id));
      } else {
        throw new Error("Failed to delete agenda");
      }
    } catch (error) {
      console.error("Error deleting agenda:", error);
      alert("Failed to delete agenda. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agenda Desa</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Export Agenda
          </button>
          <Link
            href="/admin/agenda/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tambah Agenda
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Judul kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Tanggal kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Waktu mulai kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Waktu selesai kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Tempat kegiatan</th>
                <th className="text-left p-4 font-medium text-gray-900">Penyelenggara</th>
                <th className="text-left p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    Tidak ada data agenda
                  </td>
                </tr>
              ) : (
                agendas.map((item) => (
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
                          href={`/admin/agenda/${item.id}/edit`}
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