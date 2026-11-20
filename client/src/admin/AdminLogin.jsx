import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminRequest } from "./adminApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      await adminRequest("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
      navigate("/admin/packages", { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <Link to="/" className="text-sm text-slate-500">← Back to website</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-lime-700">Nestroam Holidays</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin sign in</h1>
      <p className="mt-2 text-sm text-slate-500">Manage your published tour packages.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <label className="mt-6 block text-sm font-semibold text-slate-700">Email</label>
      <input autoComplete="username" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-lime-600" />
      <label className="mt-4 block text-sm font-semibold text-slate-700">Password</label>
      <input autoComplete="current-password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-lime-600" />
      <button disabled={busy} className="mt-7 w-full rounded-xl bg-[#1d2d50] px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  </main>;
}
