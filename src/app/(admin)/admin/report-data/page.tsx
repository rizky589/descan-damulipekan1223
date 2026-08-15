"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ReportData {
  id: string;
  judul: string;
  waktuTerbit: string | null;
  deskripsi: string | null;
  kategori: string | null;
  filePath: string | null;
  createdAt: string;
}

export default function ReportDataPage() {
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/report-data");
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          console.error("Failed to fetch report data");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReports();
  }, []);

  const handleExport = async () => {
    try {
      const response = await fetch("/api/report-data/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report-data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting report data:", error);
      alert("Gagal mengekspor report data.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus report ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/report-data/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReports((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete report data");
      }
    } catch (error) {
      console.error("Error deleting report data:", error);
      alert("Gagal menghapus report data. Silakan coba lagi.");
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Report Data</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Export Report
          </button>
          <Link
            href="/admin/report-data/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tambah Report
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Judul</th>
                <th className="text-left p-4 font-medium text-gray-900">Waktu Terbit</th>
                <th className="text-left p-4 font-medium text-gray-900">Kategori</th>
                <th className="text-left p-4 font-medium text-gray-900">Deskripsi</th>
                <th className="text-left p-4 font-medium text-gray-900">File</th>
                <th className="text-left p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    Tidak ada data report
                  </td>
                </tr>
              ) : (
                reports.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.judul}</td>
                    <td className="p-4 text-gray-600">{formatDate(item.waktuTerbit)}</td>
                    <td className="p-4 text-gray-600">{item.kategori || "-"}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">{item.deskripsi || "-"}</td>
                    <td className="p-4 text-gray-600">
                      {item.filePath ? (
                        <a 
                          href={item.filePath} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Lihat File
                        </a>
                      ) : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/report-data/${item.id}/edit`}
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
