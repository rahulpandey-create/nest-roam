import { Link } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import bghimachal from "../../assets/bghimachal.png";
import manali from "../../assets/manali.png";
import manaliinner from '../../assets/manalibg.png';
import spitivalley from '../../assets/spitivalley.png';

const SLIDES = [
  {
    eyebrow: "Your Mountain Escape Awaits",
    title: "Discover Himachal",
    text: "Breathtaking landscapes, charming hill towns, thrilling adventures and unforgettable experiences.",
    image: bghimachal,
  },
  {
    eyebrow: "Snow, Cafes and Pine Forests",
    title: "Manali & Beyond",
    text: "Wake up to snow-capped peaks, riverside cafes and winding roads through the Beas valley.",
    image: manaliinner,
  },
  {
    eyebrow: "Where the Road Runs Out",
    title: "Spiti Valley",
    text: "High-altitude deserts, ancient monasteries and the clearest night skies in the Himalayas.",
    image: spitivalley,
  },
  {
    eyebrow: "Slow Mornings by the River",
    title: "Parvati Valley",
    text: "Quiet villages, hot springs and trails that lead you deeper into the mountains.",
    image: manali,
  },
];

const AUTOPLAY_MS = 6000;

const ArrowRight = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

const ArrowUp = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 20V4M6 10l6-6 6 6" />
  </svg>
);

const ArrowDown = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

const PlayCircle = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M10 8.5v7l5.5-3.5L10 8.5z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export default function Banner() {
  const [index, setIndex] = useState(0);

  const total = SLIDES.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") prev();
      if (e.key === "ArrowDown") next();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      className="relative h-[85 vh] min-h-[426px] md:h-screen md:min-h-[560px] xl:mt-[-150px] w-full overflow-hidden bg-neutral-900 font-['Figtree',sans-serif] text-white"
      aria-roledescription="carousel"
      aria-label="Himachal destinations"
    >
      
      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <img
          key={`${s.title}-${index}`}
          src={s.image}
          alt={s.title}
          className={`banner-bg-image absolute inset-0 h-full w-full object-cover ${
            i === index
              ? `banner-active ${i % 2 === 0 ? "zoom-in" : "zoom-out"}`
              : "banner-inactive"
          }`}
          aria-hidden={i !== index}
        />
      ))}
{/* <div class="absolute inset-0 bg-gradient-to-r from-[#081c2b]/85 via-[#081c2b]/70 to-transparent"></div> */}
      {/* Content */}
      <div className="relative z-10 flex h-full items-center p-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 max-w-[1280px] w-full flex flex-wrap items-center justify-between mx-auto p-0 md:p-4">

          {/* Left Content */}
          <div className="mt-[150px] md:mt-24 grid">
            {SLIDES.map((s, i) => (
              <div
                key={s.title}
                className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${
                  i === index
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
              >
                <p className="text-[20px] font-light mb-3 md:mb-1">
                  {s.eyebrow}
                </p>

                <h1 className="fontsylegilda leading-12.5 sm:leading-normal">
                  {s.title}
                </h1>

                <p className="mt-3 md:mt-1 max-w-xl text-[16px] font-light leading-relaxed text-white/90">
                  {s.text}
                </p>
              </div>
            ))}

            {/* Buttons */}
            <div className="mt-5 md:mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="#packages"
                className="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-white px-8 py-4 text-lg font-normal text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Packages
                <ArrowRight className="h-6 w-6 text-lime-600 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                className="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full border border-white/70 px-8 py-3 text-lg font-normal text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Watch Video
                <PlayCircle className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Right Slider Controls */}
          <div className="flex ml-auto relative top-[-126px] md:top-[100px]">
            <div>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-16 sm:w-16"
              >
                <ArrowUp className="h-7 w-7" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid h-14 w-14 place-items-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-16 sm:w-16"
              >
                <ArrowDown className="h-7 w-7" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
