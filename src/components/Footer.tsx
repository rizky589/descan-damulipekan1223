import Link from "next/link";

export default function Footer() {
    const currentYear = 2026;

    return (
        <footer className="bg-gray-900 text-white">
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <img 
                                src="/logolabura.png" 
                                alt="Logo Labura" 
                                className="w-12 h-12 object-contain"
                            />
                            <div>
                                <div className="font-bold text-white text-lg">Desa Damuli Pekan</div>
                                <div className="text-gray-400 text-xs"></div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sistem informasi terpadu untuk kemajuan desa dan pelayanan masyarakat yang lebih baik dan transparan.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {/* Social icons placeholder */}
                            {["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"].map((d, i) => (
                                <div
                                    key={i}
                                    className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menu Utama */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Menu Utama</h4>
                        <ul className="space-y-3">
                            {[
                                { href: "/", label: "Beranda" },
                                { href: "/informasi-desa", label: "Informasi Desa" },
                                { href: "/agenda-desa", label: "Agenda Desa" },
                                { href: "/struktur-organisasi", label: "Struktur Organisasi Desa" },
                                { href: "/jdih", label: "JDIH" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-green-400 transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Layanan</h4>
                        <ul className="space-y-3">
                            {[
                                { href: "/apbdes", label: "APBDes" },
                                
                                { href: "/struktur-organisasi", label: "Pimpinan Desa" },
                                { href: "/jdih", label: "Peraturan Desa" },
                                { href: "/agenda-desa", label: "Kegiatan Desa" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-green-400 transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm leading-relaxed">
                                    Desa Damuli Pekan, Kecamatan Kualuh Selatan, Kabupaten Labuhanbatu Utara
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm">(021) 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm">info@desadamulipekan.id</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-sm" suppressHydrationWarning>
                        © {currentYear} Portal Desa Damuli Pekan. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs">TERM & CONDITION</span>
                        <span className="text-green-400 text-xs font-semibold">PRIVACY POLICY</span>
                        <span className="text-green-400 text-xs font-semibold">Support IPDS</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
