"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditTahunAnggaranAPBDPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tahun: "",
    namaPetugasKeuangan: ""
  });

  useEffect(() => {
    const fetchApbd = async () => {
      try {
        const response = await fetch(`/api/tahun-anggaran-apbd/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            tahun: data.tahun || "",
            namaPetugasKeuangan: data.namaPetugasKeuangan || ""
          });
        }
      } catch (error) {
        console.error("Error fetching tahun anggaran APBD:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApbd();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch(`/api/tahun-anggaran-apbd/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/tahun-anggaran-apbd");
        router.refresh();
      } else {
        throw new Error("Failed to update tahun anggaran APBD");
      }
    } catch (error) {
      console.error("Error updating tahun anggaran APBD:", error);
      alert("Gagal mengupdate data. Silakan coba lagi.");
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Tahun Anggaran APBD</h1>
        <p className="text-gray-600 mt-1">Ubah data tahun anggaran APBD</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tahun" className="block text-sm font-medium text-gray-700 mb-2">
                Tahun *
              </label>
              <input
                type="text"
                id="tahun"
                name="tahun"
                value={formData.tahun}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 2024"
              />
            </div>

            <div>
              <label htmlFor="namaPetugasKeuangan" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Petugas Keuangan
              </label>
              <input
                type="text"
                id="namaPetugasKeuangan"
                name="namaPetugasKeuangan"
                value={formData.namaPetugasKeuangan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama petugas keuangan"
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
              href="/admin/tahun-anggaran-apbd"
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
