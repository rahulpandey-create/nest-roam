import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, adminRequest } from "./adminApi";

export default function PackageList() {
  const [packages,setPackages]=useState([]), [error,setError]=useState(""), [loading,setLoading]=useState(true);
  async function load(){setLoading(true);try{const r=await adminRequest("/api/packages/admin/all");setPackages(r.packages||[]);setError("");}catch(e){setError(e.message);}finally{setLoading(false);}}
  useEffect(()=>{load();},[]);
  async function remove(item){
    if(!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try{await adminRequest(`/api/packages/admin/${item.id}`,{method:"DELETE"});load();}catch(e){setError(e.message);}
  }
  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-lime-700">Content</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Tour packages</h1><p className="mt-2 text-slate-500">Create and update the packages shown on your website.</p></div><Link to="/admin/packages/new" className="rounded-xl bg-[#1d2d50] px-5 py-3 font-semibold text-white">+ Add package</Link></div>
    {error&&<p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    <div className="mt-7 overflow-hidden rounded-2xl border bg-white">
      {loading?<p className="p-8 text-slate-500">Loading packages…</p>:packages.length===0?<div className="p-10 text-center"><p className="font-semibold">No packages yet</p><p className="mt-2 text-sm text-slate-500">Add your first package to publish it on the website.</p></div>:
      <div className="divide-y">{packages.map(item=><article key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <img src={`${API}${item.cover_image}`} alt="" className="h-20 w-28 rounded-xl bg-slate-100 object-cover" />
        <div className="min-w-0 flex-1"><h2 className="font-bold text-slate-900">{item.title}</h2><p className="mt-1 text-sm text-slate-500">{item.destination||"Destination not set"} · {item.duration||"Duration not set"}</p><span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.status==="published"?"bg-green-100 text-green-800":"bg-amber-100 text-amber-800"}`}>{item.status}</span></div>
        <div className="flex gap-2"><Link to={`/admin/packages/${item.id}`} className="rounded-lg border px-3 py-2 text-sm font-medium">Edit</Link><button onClick={()=>remove(item)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700">Delete</button></div>
      </article>)}</div>}
    </div>
  </section>;
}
