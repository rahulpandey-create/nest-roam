
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import manaliImg from "../../assets/manalis.webp";
import shimlaImg from "../../assets/shimla.webp";
import kasolImg from "../../assets/kasol.webp";
import spitiImg from "../../assets/spiti.webp";
import manalip from "../../assets/manalip.webp";

const destinations = [
  {
    name: "Manali",
    description: "Adventure, nature & snow",
    image: manaliImg,
    link: "/destinations/manali",
  },
  {
    name: "Shimla",
    description: "Heritage & hill station Charm",
    image: shimlaImg,
    link: "/destinations/shimla",
  },
  {
    name: "Kasol",
    description: "Riverside stays & a laid-back vibe",
    image: kasolImg,
    link: "/destinations/kasol",
  },
  {
    name: "Spiti Valley",
    description: "A high-altitude desert wonder",
    image: spitiImg,
    link: "/destinations/spiti",
  },
];

const TrendingDestinations = ({ asPage = false }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Destinations Page Hero - Only visible on the Destinations page */}
      {asPage && (
        <section className="relative min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[0px] md:mt-[-150px]">
          <img
            src={manalip}
            alt="Himachal Pradesh mountains"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#101d32]/65"></div>

          <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto">
            <p className="text-[20px] font-light mb-3 md:mb-1 text-white mt-4 md:mt-20">
              Explore With Nestroam
            </p>

            <h1 className="fontsylegilda leading-12.5 sm:leading-normal text-white">
              Explore Our Destinations
            </h1>

            <p className="mt-3 md:mt-1 max-w-xl mx-auto text-[16px] font-light leading-relaxed text-white/90 text-center">
              Discover beautiful destinations, exciting adventures and
              unforgettable journeys with our exclusive travel experiences.
            </p>
          </div>
        </section>
      )}

      {/* Destinations Section */}
      <section
        id="destinations"
        className="w-full bg-white py-9 md:py-20 lg:py-12 scroll-mt-24"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-4 xl:px-4">
          {/* Section Heading */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 md:gap-6 mb-12">
            {/* Heading - 7 Columns */}
            <div className="md:col-span-7">
              <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                Discover Your Next Escape
              </span>

              {asPage ? (
                <h1 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Explore Himachal Pradesh Destinations
                </h1>
              ) : (
                <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                  Trending Destinations
                </h2>
              )}
            </div>

            {/* Empty Space - 1 Column */}
            <div className="hidden md:block md:col-span-1"></div>

            {/* Description - 4 Columns */}
            <div className="md:col-span-4 max-w-[640px] lg:pt-1">
              <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">
                Discover Himachal’s stunning destinations, peaceful valleys, and
                unforgettable mountain experiences.
              </p>

              {pathname !== "/destinations" && (
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-3 mt-3.5 md:mt-6 text-[16px] md:text-[16px] font-semibold text-[#1d2d50] group"
                >
                  Explore More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#8fc31f] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <Link
                to={destination.link}
                key={destination.name}
                className="relative group h-[420px] md:h-[460px] overflow-hidden rounded-[28px] block"
              >
                {/* Background Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Destination Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-10 text-white pr-16">
                  <h3 className="text-[20px] md:text-[20px] font-semibold mb-1 leading-tight">
                    {destination.name}
                  </h3>

                  <p className="text-[14px] md:text-[14px] font-normal leading-snug">
                    {destination.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <div className="absolute bottom-0 right-0 z-20 w-[72px] h-[78px] bg-white rounded-tl-[38px] flex items-center justify-center">
                  <div className="absolute -top-8 right-0 w-8 h-8 bg-transparent rounded-br-[32px] shadow-[8px_8px_0_8px_white]" />

                  <div className="absolute bottom-0 -left-8 w-8 h-8 bg-transparent rounded-br-[32px] shadow-[8px_8px_0_8px_white]" />

                  <ArrowUpRight
                    size={28}
                    strokeWidth={1.7}
                    className="text-[#1d2d50] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingDestinations;
