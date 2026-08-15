"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface KepalaKeluarga {
  id: string;
  nama: string;
  nik: string;
  noKK: string;
  alamat: string;
}

interface AnggotaKeluarga {
  id: string;
  nama: string;
  jenisKelamin: string;
  tempatLahir: string | null;
  tanggalLahir: string | null;
  umur: number | null;
  nik: string | null;
  pekerjaan: string | null;
  pendidikan: string | null;
  hubungan: string;
}

export default function AnggotaKeluargaPage() {
  const router = useRouter();
  const params = useParams();
  const [kepalaKeluarga, setKepalaKeluarga] = useState<KepalaKeluarga | null>(null);
  const [anggotaList, setAnggotaList] = useState<AnggotaKeluarga[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    jenisKelamin: "Laki-laki",
    tempatLahir: "",
    tanggalLahir: "",
    umur: "",
    nik: "",
    pekerjaan: "",
    pendidikan: "",
    hubungan: "Istri"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/kepala-keluarga/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setKepalaKeluarga(data);
          setAnggotaList(data.anggota || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.id) {
      fetchData();
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
      const response = await fetch("/api/anggota-keluarga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          kepalaKeluargaId: params.id
        }),
      });

      if (response.ok) {
        const newAnggota = await response.json();
        setAnggotaList(prev => [...prev, newAnggota]);
        setShowForm(false);
        setFormData({
          nama: "",
          jenisKelamin: "Laki-laki",
          tempatLahir: "",
          tanggalLahir: "",
          umur: "",
          nik: "",
          pekerjaan: "",
          pendidikan: "",
          hubungan: "Istri"
        });
      } else {
        throw new Error("Failed to create anggota keluarga");
      }
    } catch (error) {
      console.error("Error creating anggota keluarga:", error);
      alert("Gagal menambah anggota keluarga. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus anggota keluarga ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/anggota-keluarga/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAnggotaList(prev => prev.filter(item => item.id !== id));
      } else {
        throw new Error("Failed to delete anggota keluarga");
      }
    } catch (error) {
      console.error("Error deleting anggota keluarga:", error);
      alert("Gagal menghapus anggota keluarga. Silakan coba lagi.");
    }
  };

  if (!kepalaKeluarga) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anggota Keluarga</h1>
          <p className="text-gray-600 mt-1">
            Kepala Keluarga: {kepalaKeluarga.nama} - No KK: {kepalaKeluarga.noKK}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showForm ? "Batal" : "Tambah Anggota"}
          </button>
          <Link
            href="/admin/kepala-keluarga"
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Kembali
          </Link>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Tambah Anggota Keluarga</h2>
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
                  NIK
                </label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan NIK"
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

              <div>
                <label htmlFor="hubungan" className="block text-sm font-medium text-gray-700 mb-2">
                  Hubungan Keluarga *
                </label>
                <select
                  id="hubungan"
                  name="hubungan"
                  value={formData.hubungan}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Istri">Istri</option>
                  <option value="Anak">Anak</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Mertua">Mertua</option>
                  <option value="Famili Lain">Famili Lain</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Anggota"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Nama</th>
                <th className="text-left p-4 font-medium text-gray-900">Jenis Kelamin</th>
                <th className="text-left p-4 font-medium text-gray-900">Umur</th>
                <th className="text-left p-4 font-medium text-gray-900">NIK</th>
                <th className="text-left p-4 font-medium text-gray-900">Hubungan</th>
                <th className="text-left p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {anggotaList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    Belum ada anggota keluarga terdaftar
                  </td>
                </tr>
              ) : (
                anggotaList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.jenisKelamin}</td>
                    <td className="p-4 text-gray-600">{item.umur || "-"}</td>
                    <td className="p-4 text-gray-600">{item.nik || "-"}</td>
                    <td className="p-4 text-gray-600">{item.hubungan}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Hapus
                      </button>
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
