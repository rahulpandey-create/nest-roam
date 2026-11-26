import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { adminRequest } from "./adminApi";

export default function AdminGuard() {
  const [state, setState] = useState("checking");
  useEffect(() => { adminRequest("/api/admin/me").then(()=>setState("ok")).catch(()=>setState("guest")); }, []);
  if (state === "checking") return <div className="min-h-screen grid place-items-center text-slate-500">Checking admin session…</div>;
  return state === "ok" ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
