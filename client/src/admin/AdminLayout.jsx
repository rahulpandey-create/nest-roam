import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminRequest } from "./adminApi";

export default function AdminLayout() {
  const navigate = useNavigate();
  async function logout() {
    try { await adminRequest("/api/admin/logout", { method: "POST" }); } finally { navigate("/admin/login", { replace: true }); }
  }
  return <div className="min-h-screen bg-slate-50">
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div><p className="font-bold text-[#1d2d50]">Nestroam Admin</p><p className="text-xs text-slate-500">Tour package management</p></div>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/admin/packages" className="font-semibold text-slate-700">Packages</NavLink>
          <button onClick={logout} className="rounded-lg border px-3 py-2">Sign out</button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-8"><Outlet /></main>
  </div>;
}
