"use client";

import { Calendar, Book, Image as ImageIcon, Scale, Activity, Users, Settings, ShieldCheck, UserCircle, Home, UsersRound, FileText, Wallet, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menus = [
  {
    group: "Main", items: [
      { name: "Agenda Desa", icon: Calendar, href: "/admin/agenda" },
      { name: "Books", icon: Book, href: "/admin/books" },
      { name: "Foto Home", icon: ImageIcon, href: "/admin/photos" },
      { name: "Kategori Produk Hukum", icon: Scale, href: "/admin/hukum" },
      { name: "Kegiatan Desa", icon: Activity, href: "/admin/kegiatan-desa" },
      { name: "Users", icon: Users, href: "/admin/users" },
      { name: "Kepala Keluarga", icon: Home, href: "/admin/kepala-keluarga" },
      { name: "Pimpinan Organisasi Desa", icon: UsersRound, href: "/admin/pimpinan-organisasi-desa" },
      { name: "Report Data", icon: FileText, href: "/admin/report-data" },
      { name: "Tahun Anggaran APBD", icon: Wallet, href: "/admin/tahun-anggaran-apbd" },
    ]
  },
  {
    group: "Settings", items: [
      // { name: "Manage Setting", icon: Settings, href: "/admin/settings" },
      // { name: "Profile", icon: UserCircle, href: "/admin/profile" },
    ]
  },
  {
    group: "Filament Shield", items: [
      // { name: "Roles", icon: ShieldCheck, href: "/admin/roles" },
    ]
  }
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
        Admin Dashboard <span className="text-slate-300 font-light">|</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {menus.map((g) => (
          <div key={g.group}>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">{g.group}</h3>
            {g.items.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-orange-500 rounded-lg transition-all mb-1 group shadow-sm hover:shadow-md border border-transparent hover:border-orange-100">
                <item.icon className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                {item.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-lg transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}