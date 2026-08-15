"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Hukum {
  id: string;
  namaKategori: string;
  deskripsi: string | null;
  createdAt: string;
}

export default function HukumPage() {
  const router = useRouter();
  const [hukums, setHukums] = useState<Hukum[]>([]);

  useEffect(() => {
    const fetchHukums = async () => {
      try {
        const response = await fetch("/api/hukum");
        if (response.ok) {
          const data = await response.json();
          setHukums(data);
        } else {
          console.error("Failed to fetch hukums");
        }
      } catch (error) {
        console.error("Error fetching hukums:", error);
      }
    };

    fetchHukums();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hukum?")) {
      return;
    }

    try {
      const response = await fetch(`/api/hukum/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHukums((prev) => prev.filter((hukum) => hukum.id !== id));
      } else {
        throw new Error("Failed to delete hukum");
      }
    } catch (error) {
      console.error("Error deleting hukum:", error);
      alert("Failed to delete hukum. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kategori Produk Hukum</h1>
        <Link
          href="/admin/hukum/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New hukum
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Nama Kategori</th>
                <th className="text-left p-4 font-medium text-gray-900">Deskripsi</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hukums.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-8 text-gray-500">
                    No hukum items found
                  </td>
                </tr>
              ) : (
                hukums.map((hukum) => (
                  <tr key={hukum.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{hukum.namaKategori}</td>
                    <td className="p-4 text-gray-600">{hukum.deskripsi || "-"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/hukum/${hukum.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(hukum.id)}
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
