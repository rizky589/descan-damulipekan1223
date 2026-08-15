"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditKepalaKeluargaPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    jenisKelamin: "Laki-laki",
    tempatLahir: "",
    tanggalLahir: "",
    umur: "",
    nik: "",
    noKK: "",
    pekerjaan: "",
    pendidikan: "",
    alamat: ""
  });

  useEffect(() => {
    const fetchKepalaKeluarga = async () => {
      try {
        const response = await fetch(`/api/kepala-keluarga/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            nama: data.nama || "",
            jenisKelamin: data.jenisKelamin || "Laki-laki",
            tempatLahir: data.tempatLahir || "",
            tanggalLahir: data.tanggalLahir ? new Date(data.tanggalLahir).toISOString().split('T')[0] : "",
            umur: data.umur?.toString() || "",
            nik: data.nik || "",
            noKK: data.noKK || "",
            pekerjaan: data.pekerjaan || "",
            pendidikan: data.pendidikan || "",
            alamat: data.alamat || ""
          });
        }
      } catch (error) {
        console.error("Error fetching kepala keluarga:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchKepalaKeluarga();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch(`/api/kepala-keluarga/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/kepala-keluarga");
        router.refresh();
      } else {
        throw new Error("Failed to update kepala keluarga");
      }
    } catch (error) {
      console.error("Error updating kepala keluarga:", error);
      alert("Gagal mengupdate kepala keluarga. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Kepala Keluarga</h1>
        <p className="text-gray-600 mt-1">Ubah data kepala keluarga</p>
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
              <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin *
              </label>
              <select
                id="jenisKelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label htmlFor="tempatLahir" className="block text-sm font-medium text-gray-700 mb-2">
                Tempat Lahir
              </label>
              <input
                type="text"
                id="tempatLahir"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan tempat lahir"
              />
            </div>

            <div>
              <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="tanggalLahir"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="umur" className="block text-sm font-medium text-gray-700 mb-2">
                Umur
              </label>
              <input
                type="number"
                id="umur"
                name="umur"
                value={formData.umur}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan umur"
              />
            </div>

            <div>
              <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-2">
                NIK *
              </label>
              <input
                type="text"
                id="nik"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan NIK"
              />
            </div>

            <div>
              <label htmlFor="noKK" className="block text-sm font-medium text-gray-700 mb-2">
                No KK *
              </label>
              <input
                type="text"
                id="noKK"
                name="noKK"
                value={formData.noKK}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan No KK"
              />
            </div>

            <div>
              <label htmlFor="pekerjaan" className="block text-sm font-medium text-gray-700 mb-2">
                Pekerjaan
              </label>
              <input
                type="text"
                id="pekerjaan"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan pekerjaan"
              />
            </div>

            <div>
              <label htmlFor="pendidikan" className="block text-sm font-medium text-gray-700 mb-2">
                Pendidikan
              </label>
              <input
                type="text"
                id="pendidikan"
                name="pendidikan"
                value={formData.pendidikan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan pendidikan"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat *
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan alamat"
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
              href="/admin/kepala-keluarga"
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
