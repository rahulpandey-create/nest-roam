import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, MapPinned } from "lucide-react";
import { adminRequest } from "./adminApi";

const navClass = ({ isActive }) => `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-[#eef4e3] text-[#5d7e1b]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`;

export default function AdminLayout() {
  const navigate = useNavigate();
  async function logout() {
    try { await adminRequest("/api/admin/logout", { method: "POST" }); }
    finally { navigate("/admin/login", { replace: true }); }
  }
  return <div className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div><p className="font-bold text-[#1d2d50]">Nestroam Admin</p><p className="text-xs text-slate-500">Website content management</p></div>
        <div className="flex flex-wrap items-center gap-2">
          <nav aria-label="Admin sections" className="flex flex-wrap items-center gap-1">
            <NavLink to="/admin/packages" className={navClass}><MapPinned size={16} /> Packages</NavLink>
            <NavLink to="/admin/blogs" className={navClass}><BookOpen size={16} /> Blogs</NavLink>
          </nav>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"><LogOut size={15} /> Sign out</button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-8"><Outlet /></main>
  </div>;
}
