"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KontakPage() {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    keperluan: "Permohonan",
    pesan: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-badge bg-white/15 text-white border-white/20">Layanan Desa</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Hubungi Kami
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Sampaikan pesan, pertanyaan, atau pengaduan Anda kepada pihak Desa Damuli Pekan.
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-green-600 transition-colors">Beranda</a>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-green-600 font-medium">Kontak</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pesan Terkirim!</h2>
            <p className="text-gray-500 mb-6">Terima kasih, pesan Anda telah kami terima.</p>
            <button onClick={() => setSubmitted(false)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Kirim Pesan Lagi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Kirim pesan Anda</h2>
              <p className="text-gray-500 text-sm mb-6">
                Silahkan melengkapi form berikut untuk mengirim pesan ke Desa Damuli Pekan.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nama Lengkap</label>
                  <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Budi" required className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2 text-sm text-gray-700 transition" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">No Whatsapp <span className="text-red-400">*</span></label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Contoh: 6281231232322" required className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2 text-sm text-gray-700 transition" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Keperluan</label>
                  <select name="keperluan" value={form.keperluan} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2 text-sm text-gray-700 bg-transparent transition">
                    <option>Permohonan</option>
                    <option>Pengaduan</option>
                    <option>Pertanyaan</option>
                    <option>Saran</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Isi pesan</label>
                  <textarea name="pesan" value={form.pesan} onChange={handleChange} rows={4} required className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2 text-sm text-gray-700 resize-none transition" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Berkas Pendukung (jika ada)</label>
                  <input type="file" className="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 file:rounded file:text-xs file:bg-white file:text-gray-600 hover:file:bg-gray-50" />
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-4">
                  Kirim Pesan
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-b from-green-700 to-emerald-600 text-white rounded-2xl shadow-sm p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Kontak</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  Jln. Sisingamangaraja No. 1, Desa Damuli Pekan, Kecamatan Kualuh Selatan, Kabupaten Labuhanbatu Utara, Sumatera Utara
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Tel: (0624) 123456</p>
                <p className="text-sm opacity-90 mt-1">Email: info@desadamuliPekan.id</p>
              </div>
              <div>
                <p className="text-xs opacity-70 uppercase tracking-wider font-semibold mb-3">Jam Layanan</p>
                <div className="text-sm opacity-90 space-y-1">
                  <div className="flex justify-between"><span>Senin - Jumat</span><span>08.00 - 16.00</span></div>
                  <div className="flex justify-between"><span>Sabtu</span><span>08.00 - 12.00</span></div>
                  <div className="flex justify-between"><span>Minggu</span><span>Libur</span></div>
                </div>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}