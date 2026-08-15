"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPimpinanOrganisasiDesaPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    periodeAwal: "",
    periodeAkhir: "",
    pengalaman: "",
    fokus: "",
    foto: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, foto: data.url }));
      } else {
        alert(data.error || "Upload gagal");
        setPreview(null);
      }
    } catch {
      alert("Upload gagal.");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/pimpinan-organisasi-desa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/pimpinan-organisasi-desa");
        router.refresh();
      } else {
        throw new Error("Failed to create pimpinan organisasi desa");
      }
    } catch (error) {
      console.error("Error creating pimpinan organisasi desa:", error);
      alert("Gagal membuat pimpinan organisasi desa. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Pimpinan Organisasi Desa</h1>
        <p className="text-gray-600 mt-1">Tambah data pimpinan organisasi desa baru</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                Nama *
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama"
              />
            </div>

            <div>
              <label htmlFor="posisi" className="block text-sm font-medium text-gray-700 mb-2">
                Posisi *
              </label>
              <input
                type="text"
                id="posisi"
                name="posisi"
                value={formData.posisi}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan posisi"
              />
            </div>

            <div>
              <label htmlFor="periodeAwal" className="block text-sm font-medium text-gray-700 mb-2">
                Periode Awal
              </label>
              <input
                type="text"
                id="periodeAwal"
                name="periodeAwal"
                value={formData.periodeAwal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 2020"
              />
            </div>

            <div>
              <label htmlFor="periodeAkhir" className="block text-sm font-medium text-gray-700 mb-2">
                Periode Akhir
              </label>
              <input
                type="text"
                id="periodeAkhir"
                name="periodeAkhir"
                value={formData.periodeAkhir}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 2025"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="pengalaman" className="block text-sm font-medium text-gray-700 mb-2">
                Pengalaman
              </label>
              <textarea
                id="pengalaman"
                name="pengalaman"
                value={formData.pengalaman}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan pengalaman"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="fokus" className="block text-sm font-medium text-gray-700 mb-2">
                Fokus
              </label>
              <textarea
                id="fokus"
                name="fokus"
                value={formData.fokus}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan fokus"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Mengupload...</span>
                      </div>
                    )}
                    {!isUploading && formData.foto && (
                      <p className="mt-2 text-xs text-green-600 font-medium">✅ Upload berhasil</p>
                    )}
                  </div>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500"><span className="text-blue-600 font-medium">Klik untuk pilih foto</span></p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — Maks 5MB</p>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              {preview && (
                <button type="button" onClick={() => { setPreview(null); setFormData(p => ({ ...p, foto: "" })); }} className="mt-1 text-xs text-red-500 hover:text-red-700">Ganti foto</button>
              )}
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
              href="/admin/pimpinan-organisasi-desa"
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
