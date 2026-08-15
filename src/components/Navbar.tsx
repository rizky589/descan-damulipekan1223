"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    {
      label: "Profile",
      dropdown: [
        { href: "/informasi-desa", label: "Profile Desa" },
        { href: "/agenda-desa", label: "Agenda Desa" },
        { href: "/kegiatan-desa", label: "Kegiatan Desa" },
        { href: "/struktur-organisasi", label: "Struktur Organisasi Desa" },
      ],
    },
    {
      label: "Data dan Informasi Statistik",
      dropdownStats: [
        { href: "/monografi", label: "Monografi" },
        { href: "/infografis", label: "Infografis" },
        { href: "/publikasi-podes", label: "Publikasi Data Podes" },
        { href: "/publikasi-statistik", label: "Publikasi Statistik" },
      ],
    },
    { href: "/jdih", label: "JDIH" },
    { href: "/apbdes", label: "APBDes" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-lg py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-8xl mx-auto pl-1 pr-1 sm:pl-2 sm:pr-2 lg:pl-1 lg:pr-4">
        <div className="flex items-center">
          {/* Logo - kiri */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-15 h-15 flex items-center justify-center">
              <img
                src="/logolabura.png"
                alt="Logo Labura"
                className="w-15 h-15 object-contain"
              />
            </div>
            <div className="text-left">
              <div
                className={`text-base font-bold leading-tight transition-all duration-300 ${scrolled ? "text-green-700" : "text-white"
                  }`}
              >
                Desa Damuli Pekan
              </div>

            </div>
          </Link>

          {/* Desktop Navigation - center */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link, idx) =>
              link.dropdown ? (
                // Profile dropdown
                <div key={idx} className="relative">
                  <button
                    onClick={() => { setInfoOpen(!infoOpen); setStatsOpen(false); }}
                    onBlur={() => setTimeout(() => setInfoOpen(false), 150)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${scrolled
                      ? "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${infoOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {infoOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.dropdownStats ? (
                // Data dan Informasi Statistik dropdown
                <div key={idx} className="relative">
                  <button
                    onClick={() => { setStatsOpen(!statsOpen); setInfoOpen(false); }}
                    onBlur={() => setTimeout(() => setStatsOpen(false), 150)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${scrolled
                      ? "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${statsOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {statsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {link.dropdownStats.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${scrolled
                    ? "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Search Bar + Logo Descan - kanan (desktop) */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-2 ml-3">
            {/* Search */}
            <div className="flex items-center">
              {searchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="flex items-center"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari..."
                    onBlur={() => {
                      // Tutup form setelah delay agar klik tombol submit sempat terproses
                      setTimeout(() => { 
                        setSearchOpen(false); 
                      }, 250);
                    }}
                    className={`w-40 px-3 py-1.5 text-sm rounded-lg outline-none border transition-all duration-200 ${
                      scrolled
                        ? "border-gray-300 bg-white text-gray-700 placeholder-gray-400"
                        : "border-white/30 bg-white/15 text-white placeholder-white/60 backdrop-blur-sm"
                    }`}
                  />
                  <button
                    type="submit"
                    className={`ml-1 p-1.5 rounded-lg transition-all ${
                      scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}
                  title="Cari"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Logo Descan */}
            <img
              src="/logodescan.png"
              alt="Logo Descan"
              className="w-15 h-15 object-contain"
            />
          </div>

          {/* Mobile Menu Button - kanan */}
          <div className="flex-shrink-0 md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {/* Beranda */}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>

            {/* Profile */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Profile
            </div>
            {[
              { href: "/informasi-desa", label: "Profile Desa" },
              { href: "/agenda-desa", label: "Agenda Desa" },
              { href: "/kegiatan-desa", label: "Kegiatan Desa" },
              { href: "/struktur-organisasi", label: "Struktur Organisasi Desa" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-600 hover:text-orange-500 hover:bg-orange-50 font-medium transition-colors ml-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {item.label}
              </Link>
            ))}

            {/* Data dan Informasi Statistik */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Data dan Informasi Statistik
            </div>
            {[
              { href: "/monografi", label: "Monografi" },
              { href: "/infografis", label: "Infografis" },
              { href: "/publikasi-podes", label: "Publikasi Data Podes" },
              { href: "/publikasi-statistik", label: "Publikasi Statistik" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors ml-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item.label}
              </Link>
            ))}

            {/* Menu lainnya */}
            {[
              { href: "/jdih", label: "JDIH" },
              { href: "/apbdes", label: "APBDes" },
              { href: "/kontak", label: "Kontak" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
