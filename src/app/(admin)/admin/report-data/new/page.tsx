"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewReportDataPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    waktuTerbit: "",
    deskripsi: "",
    kategori: "",
    filePath: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/report-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/report-data");
        router.refresh();
      } else {
        throw new Error("Failed to create report data");
      }
    } catch (error) {
      console.error("Error creating report data:", error);
      alert("Gagal membuat report data. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Report Data</h1>
        <p className="text-gray-600 mt-1">Tambah data report baru</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-2">
                Judul *
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan judul"
              />
            </div>

            <div>
              <label htmlFor="waktuTerbit" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Terbit
              </label>
              <input
                type="date"
                id="waktuTerbit"
                name="waktuTerbit"
                value={formData.waktuTerbit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih Kategori</option>
                <option value="Keuangan">Keuangan</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Penduduk">Penduduk</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="filePath" className="block text-sm font-medium text-gray-700 mb-2">
                URL File
              </label>
              <input
                type="text"
                id="filePath"
                name="filePath"
                value={formData.filePath}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan URL file"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan deskripsi"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
            <Link
              href="/admin/report-data"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
