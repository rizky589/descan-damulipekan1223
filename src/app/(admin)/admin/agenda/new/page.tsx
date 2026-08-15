"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewAgendaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    judulKegiatan: "",
    tanggalKegiatan: "",
    waktuMulai: "",
    waktuSelesai: "",
    tempatKegiatan: "",
    penyelenggara: ""
  });

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
      const response = await fetch("/api/agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tanggalKegiatan: new Date(formData.tanggalKegiatan).toISOString()
        }),
      });

      if (response.ok) {
        router.push("/admin/agenda");
        router.refresh();
      } else {
        throw new Error("Failed to create agenda");
      }
    } catch (error) {
      console.error("Error creating agenda:", error);
      alert("Failed to create agenda. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Agenda</h1>
        <p className="text-gray-600 mt-1">Add a new agenda item for the village</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="judulKegiatan" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Kegiatan
            </label>
            <input
              type="text"
              id="judulKegiatan"
              name="judulKegiatan"
              value={formData.judulKegiatan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter activity title"
            />
          </div>

          <div>
            <label htmlFor="tanggalKegiatan" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kegiatan
            </label>
            <input
              type="date"
              id="tanggalKegiatan"
              name="tanggalKegiatan"
              value={formData.tanggalKegiatan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="waktuMulai" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Mulai
              </label>
              <input
                type="time"
                id="waktuMulai"
                name="waktuMulai"
                value={formData.waktuMulai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="waktuSelesai" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Selesai
              </label>
              <input
                type="time"
                id="waktuSelesai"
                name="waktuSelesai"
                value={formData.waktuSelesai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tempatKegiatan" className="block text-sm font-medium text-gray-700 mb-2">
              Tempat Kegiatan
            </label>
            <input
              type="text"
              id="tempatKegiatan"
              name="tempatKegiatan"
              value={formData.tempatKegiatan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter activity location"
            />
          </div>

          <div>
            <label htmlFor="penyelenggara" className="block text-sm font-medium text-gray-700 mb-2">
              Penyelenggara
            </label>
            <input
              type="text"
              id="penyelenggara"
              name="penyelenggara"
              value={formData.penyelenggara}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter organizer name"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "Creating..." : "Create Agenda"}
            </button>
            <Link
              href="/admin/agenda"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
