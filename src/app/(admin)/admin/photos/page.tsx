"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export default function PhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          console.error("Failed to fetch photos");
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPhotos((prev) => prev.filter((photo) => photo.id !== id));
      } else {
        throw new Error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Foto Home</h1>
        <Link
          href="/admin/photos/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New photo
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Title</th>
                <th className="text-left p-4 font-medium text-gray-900">Description</th>
                <th className="text-left p-4 font-medium text-gray-900">Image URL</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {photos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-gray-500">
                    No photos found
                  </td>
                </tr>
              ) : (
                photos.map((photo) => (
                  <tr key={photo.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{photo.title}</td>
                    <td className="p-4 text-gray-600">{photo.description || "-"}</td>
                    <td className="p-4 text-gray-600">
                      {photo.imageUrl ? (
                        <div className="w-32 aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/photos/${photo.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(photo.id)}
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
