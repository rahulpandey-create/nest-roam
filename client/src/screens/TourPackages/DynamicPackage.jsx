import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, MapPin, CheckCircle2, XCircle } from "lucide-react";
import TravelEnquiry from "../TravelEnquiry";
import { API } from "../../admin/adminApi";

export default function DynamicPackage() {
  const { slug } = useParams();
  const [item,setItem]=useState(null), [error,setError]=useState(""), [loading,setLoading]=useState(true);
  useEffect(()=>{
    let active=true;setLoading(true);
    fetch(`${API}/api/packages/${encodeURIComponent(slug)}`)
      .then(async r=>{const data=await r.json();if(!r.ok)throw new Error(data.message||"Package not found.");return data.package;})
      .then(data=>{if(active)setItem(data);})
      .catch(e=>{if(active)setError(e.message);})
      .finally(()=>{if(active)setLoading(false);});
    return ()=>{active=false;};
  },[slug]);
  useEffect(()=>{
    if(!item)return;
    document.title=item.meta_title||`${item.title} | Nestroam Holidays`;
    const meta=document.querySelector('meta[name="description"]');
    if(meta)meta.content=item.meta_description||item.short_description||item.description||"Explore this tour package with Nestroam Holidays.";
  },[item]);
  if(loading)return <main className="min-h-[60vh] grid place-items-center">Loading package…</main>;
  if(error||!item)return <main className="min-h-[60vh] grid place-items-center px-5 text-center"><div><h1 className="text-3xl font-bold">Package unavailable</h1><p className="mt-3 text-slate-500">{error}</p><Link to="/tour-packages" className="mt-6 inline-block rounded-full bg-[#1d2d50] px-6 py-3 text-white">Browse packages</Link></div></main>;
  const image=item.cover_image?.startsWith("http")?item.cover_image:`${API}${item.cover_image}`;
  const hasPrice = item.price !== null && item.price !== undefined && item.price !== "" && Number.isFinite(Number(item.price));
  const price = hasPrice ? `₹${Number(item.price).toLocaleString("en-IN")}` : "Price on request";
  return <main className="bg-white text-[#172b3a]">
    <section className="relative flex min-h-[560px] items-end overflow-hidden bg-slate-900">
      <img src={image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101c2c] via-[#101c2c]/70 to-black/10" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 text-white">
        <Link to="/tour-packages" className="mb-6 inline-block text-sm text-white/80">Tour packages /</Link>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{item.title}</h1>
        <p className="mt-5 max-w-2xl text-white/85">{item.short_description||item.description}</p>
        <div className="mt-7 flex flex-wrap gap-6 text-sm"><span className="flex items-center gap-2"><CalendarDays size={18}/>{item.duration||"Flexible duration"}</span><span className="flex items-center gap-2"><MapPin size={18}/>{item.destination||"Himachal Pradesh"}</span></div>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_320px]">
      <div>
        <h2 className="text-3xl font-bold text-[#1d2d50]">Package overview</h2>
        <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">{item.description||item.short_description}</p>
        {item.itinerary?.length>0&&<div className="mt-12"><h2 className="text-2xl font-bold text-[#1d2d50]">Day-wise itinerary</h2><div className="mt-5 space-y-4">{item.itinerary.map((day,i)=><article key={i} className="rounded-2xl border p-5"><p className="text-xs font-bold uppercase tracking-wider text-lime-700">{day.day||`Day ${i+1}`}</p><h3 className="mt-2 text-lg font-bold">{day.title}</h3><p className="mt-2 whitespace-pre-line leading-7 text-slate-600">{day.description}</p></article>)}</div></div>}
        {item.gallery?.length>0&&<section className="mt-12"><h2 className="text-2xl font-bold text-[#1d2d50]">Gallery</h2><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">{item.gallery.map((src,i)=><img key={i} src={src.startsWith("http")?src:`${API}${src}`} alt={`${item.title} gallery ${i+1}`} className="h-40 w-full rounded-xl object-cover" loading="lazy" />)}</div></section>}
        {(item.inclusions?.length||item.exclusions?.length)>0&&<div className="mt-12 grid gap-7 sm:grid-cols-2">
          {item.inclusions?.length>0&&<div><h2 className="text-xl font-bold">Inclusions</h2><ul className="mt-4 space-y-3">{item.inclusions.map((x,i)=><li key={i} className="flex gap-2 text-slate-600"><CheckCircle2 className="shrink-0 text-green-600" size={18}/>{x}</li>)}</ul></div>}
          {item.exclusions?.length>0&&<div><h2 className="text-xl font-bold">Exclusions</h2><ul className="mt-4 space-y-3">{item.exclusions.map((x,i)=><li key={i} className="flex gap-2 text-slate-600"><XCircle className="shrink-0 text-red-500" size={18}/>{x}</li>)}</ul></div>}
        </div>}
      </div>
      <aside className="h-fit rounded-3xl border bg-slate-50 p-6 lg:sticky lg:top-8"><p className="text-sm text-slate-500">Starting price</p><p className="mt-2 text-3xl font-bold text-[#719f18]">{price}</p><p className="mt-1 text-sm text-slate-500">{hasPrice ? (item.price_label || "per person") : "Contact us for pricing"}</p><a href="#package-enquiry" className="mt-6 block rounded-full bg-[#1d2d50] px-5 py-3 text-center font-semibold text-white">Enquire now</a></aside>
    </section>
    <div id="package-enquiry"><TravelEnquiry /></div>
  </main>;
}
