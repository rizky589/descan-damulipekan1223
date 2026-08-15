"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditKegiatanDesaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    judulKegiatan: "",
    tanggalKegiatan: "",
    waktuMulai: "",
    waktuSelesai: "",
    tempatKegiatan: "",
    penyelenggara: "",
    foto: "",
    narasi: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/kegiatan-desa/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            judulKegiatan: data.judulKegiatan,
            tanggalKegiatan: data.tanggalKegiatan.split('T')[0],
            waktuMulai: data.waktuMulai,
            waktuSelesai: data.waktuSelesai,
            tempatKegiatan: data.tempatKegiatan,
            penyelenggara: data.penyelenggara,
            foto: data.foto || "",
            narasi: data.narasi || "",
          });
          if (data.foto) setPreview(data.foto);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch {
        alert("Gagal memuat data.");
        router.push("/admin/kegiatan-desa");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        setFormData(prev => ({ ...prev, foto: data.url }));
      } else {
        alert(data.error || "Upload gagal");
        setPreview(formData.foto || null);
      }
    } catch {
      alert("Upload gagal.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/kegiatan-desa/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tanggalKegiatan: new Date(formData.tanggalKegiatan).toISOString(),
        }),
      });
      if (response.ok) {
        router.push("/admin/kegiatan-desa");
        router.refresh();
      } else {
        throw new Error("Failed");
      }
    } catch {
      alert("Gagal menyimpan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Kegiatan Desa</h1>
      <p className="text-gray-600 mt-1">Memuat data...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Kegiatan Desa</h1>
        <p className="text-gray-600 mt-1">Perbarui informasi kegiatan desa</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="judulKegiatan" className="block text-sm font-medium text-gray-700 mb-2">Judul Kegiatan *</label>
              <input type="text" id="judulKegiatan" name="judulKegiatan" value={formData.judulKegiatan} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="tanggalKegiatan" className="block text-sm font-medium text-gray-700 mb-2">Tanggal *</label>
              <input type="date" id="tanggalKegiatan" name="tanggalKegiatan" value={formData.tanggalKegiatan} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="penyelenggara" className="block text-sm font-medium text-gray-700 mb-2">Penyelenggara *</label>
              <input type="text" id="penyelenggara" name="penyelenggara" value={formData.penyelenggara} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="waktuMulai" className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai *</label>
              <input type="time" id="waktuMulai" name="waktuMulai" value={formData.waktuMulai} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="waktuSelesai" className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai *</label>
              <input type="time" id="waktuSelesai" name="waktuSelesai" value={formData.waktuSelesai} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="tempatKegiatan" className="block text-sm font-medium text-gray-700 mb-2">Tempat *</label>
              <input type="text" id="tempatKegiatan" name="tempatKegiatan" value={formData.tempatKegiatan} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Foto Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto Kegiatan</label>
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Mengupload...</span>
                      </div>
                    )}
                    <p className="mt-2 text-xs text-gray-500">Klik untuk ganti foto</p>
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
            </div>

            {/* Narasi */}
            <div className="md:col-span-2">
              <label htmlFor="narasi" className="block text-sm font-medium text-gray-700 mb-2">Narasi / Deskripsi</label>
              <textarea id="narasi" name="narasi" value={formData.narasi} onChange={handleChange} rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Narasi atau deskripsi kegiatan..." />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={isSubmitting || isUploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <Link href="/admin/kegiatan-desa"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
