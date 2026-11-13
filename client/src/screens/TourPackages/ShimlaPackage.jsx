
import React, { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Mountain,
  Hotel,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Camera,
  Route,
  Compass,
} from "lucide-react";

import shimlap from "../../assets/shimlainner.jpg";
import TravelEnquiry from "../TravelEnquiry";

const itinerary = [
  {
    day: "DAY 01",
    title: "Welcome to the Queen of Hills – Shimla",
    distance: "Approx. 3–4 Hours (from Chandigarh)",
    description:
      "Begin your memorable Himalayan holiday with a scenic drive towards Shimla. Enjoy beautiful mountain landscapes, winding roads and the refreshing atmosphere of this charming hill station.",
    places: [
      "Shimla",
      "The Ridge",
      "Mall Road",
      "Christ Church",
      "Scandal Point",
    ],
    details: [
      "Arrive in Shimla and enjoy the beautiful mountain surroundings.",
      "Check in to your hotel and relax after your journey.",
      "Explore the famous Mall Road and enjoy its lively atmosphere.",
      "Visit The Ridge and the beautiful historic Christ Church.",
      "Explore Scandal Point and enjoy the stunning Himalayan views.",
      "Return to the hotel for dinner and an overnight stay.",
    ],
  },
  {
    day: "DAY 02",
    title: "Discover the Beauty of Kufri",
    distance: "Full Day Sightseeing",
    description:
      "Spend a wonderful day exploring Kufri, a beautiful hill destination near Shimla. Experience panoramic mountain views, lush green landscapes and exciting outdoor activities.",
    places: [
      "Kufri",
      "Green Valley",
      "Himalayan Nature Park",
      "Kufri Fun World",
      "Fagu",
    ],
    details: [
      "After breakfast, drive towards the beautiful Kufri region.",
      "Stop at Green Valley to enjoy breathtaking mountain scenery.",
      "Explore Kufri and experience its peaceful natural surroundings.",
      "Visit Himalayan Nature Park and discover its wildlife.",
      "Enjoy optional adventure activities at Kufri Fun World.",
      "Explore the scenic landscapes around Fagu.",
      "Return to Shimla for dinner and an overnight stay.",
    ],
  },
  {
    day: "DAY 03",
    title: "Explore the Hidden Gems of Shimla",
    distance: "Full Day Sightseeing",
    description:
      "Discover the peaceful surroundings of Mashobra and Naldehra. Enjoy beautiful pine forests, scenic mountain viewpoints and the natural charm of Himachal Pradesh.",
    places: [
      "Mashobra",
      "Naldehra",
      "Craignano Nature Park",
      "Jakhoo Temple",
      "Jakhoo Hill",
    ],
    details: [
      "Enjoy breakfast and begin your sightseeing adventure.",
      "Visit Mashobra and explore its beautiful forest landscapes.",
      "Discover the peaceful surroundings of Craignano Nature Park.",
      "Continue towards Naldehra and enjoy its scenic beauty.",
      "Visit the famous Jakhoo Temple, located on Jakhoo Hill.",
      "Enjoy panoramic views of Shimla and the surrounding mountains.",
      "Return to the hotel for dinner and an overnight stay.",
    ],
  },
  {
    day: "DAY 04",
    title: "A Beautiful Farewell to Shimla",
    distance: "Departure Day",
    description:
      "Wake up to the refreshing mountain atmosphere and enjoy your final morning in Shimla. Take home wonderful memories of scenic landscapes, peaceful hill stations and unforgettable experiences.",
    places: [
      "Shimla",
      "Local Shopping",
      "Himalayan Views",
      "Departure",
    ],
    details: [
      "Enjoy breakfast at the hotel.",
      "Complete the hotel check-out formalities.",
      "Explore local markets for souvenirs and Himachali handicrafts, time permitting.",
      "Enjoy the beautiful mountain scenery one last time.",
      "Begin your return journey with wonderful memories of Shimla.",
    ],
  },
];

const inclusions = [
  "3 Nights accommodation in a comfortable hotel",
  "Daily breakfast and dinner",
  "Pickup and drop as per the itinerary",
  "Sightseeing as mentioned in the itinerary",
  "Transportation for the complete trip",
  "All applicable hotel taxes",
];

const exclusions = [
  "Airfare or train tickets",
  "Early check-in and late check-out charges",
  "Monument entrance and camera fees",
  "Personal expenses, shopping and laundry",
  "Adventure activities and activity charges",
  "Meals other than those specified",
  "Travel insurance and medical expenses",
  "Any additional sightseeing not mentioned",
  "Expenses arising due to weather or road conditions",
];

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85",
    title: "Beautiful Shimla",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    title: "Himalayan Peaks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85",
    title: "Scenic Kufri Views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
    title: "Mountain Getaway",
  },
];

const ShimlaPackage = () => {
  const [activeDay, setActiveDay] = useState(0);

  const scrollToEnquiry = () => {
    document.getElementById("package-enquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="bg-white text-[#172b3a] overflow-hidden mt-[-96px] md:mt-[-150px]">

      {/* HERO SECTION */}
      <section className="relative min-h-[620px] md:min-h-[720px] flex items-end">
        <img
          src={shimlap}
          alt="Beautiful Shimla Himalayan landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#081c2b]/85 via-[#081c2b]/70 to-transparent" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-5 pb-16 md:pb-24 pt-36">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <span>Home</span>
            <span>/</span>
            <span>Packages</span>
            <span>/</span>
            <span className="text-[#a8db69]">Shimla & Kufri Retreat</span>
          </div>

          <h1 className="fontsylegilda text-white leading-16.5">
            Discover The Shimla <br /> & Kufri Retreat
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Explore charming hill stations, beautiful mountain landscapes,
            scenic viewpoints and the refreshing beauty of Shimla and Kufri.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-8 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays size={19} className="text-[#a8db69]" />
              <span className="text-sm">3 Nights / 4 Days</span>
            </div>

            <span className="hidden sm:block text-white/40">|</span>

            <div className="flex items-center gap-2">
              <MapPin size={19} className="text-[#a8db69]" />
              <span className="text-sm">Shimla, Himachal Pradesh</span>
            </div>

            <span className="hidden sm:block text-white/40">|</span>

            <div className="flex items-center gap-2">
              <Route size={19} className="text-[#a8db69]" />
              <span className="text-sm">Himalayan Hill Station Tour</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-9">
            <button
              onClick={scrollToEnquiry}
              className="bg-[#fff] hover:bg-[#a8db69] text-[#172b3a] px-7 py-4 rounded-full font-semibold flex items-center gap-3 transition-all text-[18px]"
            >
              Enquire Now
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection("itinerary")}
              className="border border-white/60 hover:bg-white hover:text-[#172b3a] text-white px-7 py-4 rounded-full font-semibold transition-all"
            >
              Explore Itinerary
            </button>
          </div>
        </div>
      </section>

      {/* QUICK PACKAGE DETAILS */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-5 md:px-5 -mt-1 md:-mt-10">
        <div className="bg-white rounded-[24px] md:rounded-[28px] shadow-[0_12px_50px_rgba(23,43,58,0.10)] border border-gray-100 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {[
            { icon: CalendarDays, label: "Duration", value: "3 Nights / 4 Days" },
            { icon: MapPin, label: "Starting Point", value: "Chandigarh" },
            { icon: Mountain, label: "Destination", value: "Shimla & Kufri" },
            { icon: Clock3, label: "Package Price", value: "₹12,999" },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-5 md:p-7 flex items-center gap-3 md:gap-4 ${
                  index < 2 ? "border-b md:border-b-0" : ""
                } ${index % 2 === 0 ? "border-r" : ""} ${
                  index === 1 ? "md:border-r" : ""
                } border-gray-100`}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-2xl bg-[#f1f7e8] flex items-center justify-center text-[#719f18]">
                  <Icon size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm md:text-base font-bold text-[#172b3a]">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION NAVIGATION */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 mt-10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-5 overflow-x-auto">
          <div className="flex items-center gap-7 md:gap-10 min-w-max py-5 text-[16px] font-semibold">
            {[
              ["Overview", "overview"],
              ["Highlights", "highlights"],
              ["Itinerary", "itinerary"],
              ["Inclusions", "inclusions"],
              ["Gallery", "gallery"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="hover:text-[#719f18] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section
        id="overview"
        className="scroll-mt-28 max-w-[1280px] mx-auto px-5 md:px-5 py-20 md:py-28"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
              Discover The Experience
            </span>

            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-5">
              Experience The Charming Beauty Of Shimla
            </h2>

            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">
              Discover the beauty of Himachal Pradesh with this 3 Nights / 4
              Days Shimla and Kufri retreat. Surrounded by lush green forests,
              snow-capped mountains and breathtaking valleys, Shimla offers
              the perfect escape from everyday life.
            </p>

            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">
              Explore the iconic Mall Road, The Ridge and Christ Church.
              Experience the scenic beauty of Kufri, discover the peaceful
              landscapes of Mashobra and enjoy the refreshing atmosphere of
              Naldehra.
            </p>

            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">
              From beautiful mountain viewpoints to charming local markets,
              every moment of this journey brings a new experience. Make
              unforgettable memories in the Queen of Hills.
            </p>

            <button
              onClick={scrollToEnquiry}
              className="mt-8 inline-flex items-center gap-3 text-[#719f18] font-bold hover:gap-5 transition-all"
            >
              Plan Your Shimla Trip
              <ArrowRight size={19} />
            </button>
          </div>

          <div className="relative">
            <img
              src={shimlap}
              alt="Beautiful landscape of Shimla"
              className="w-full h-[400px] md:h-[520px] object-cover rounded-[28px]"
            />

            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-[#1d2d50] text-white p-6 md:p-8 rounded-[24px] shadow-xl">
              <p className="text-4xl font-bold text-[#ffffff]">04</p>
              <p className="text-sm mt-1">Days of Exploration</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section
        id="highlights"
        className="scroll-mt-28 bg-[#F6F7F8] py-20 md:py-24 m-5 rounded-[40px]"
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-5">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
              What Makes It Special
            </span>

            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-5">
              Shimla Trip Highlights
            </h2>

            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">
              From charming hill station streets to breathtaking mountain
              viewpoints, discover the unforgettable experiences waiting
              for you in Shimla.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Mountain,
                title: "Kufri",
                text: "Experience beautiful mountain landscapes, scenic viewpoints and exciting outdoor activities.",
              },
              {
                icon: Compass,
                title: "The Ridge & Mall Road",
                text: "Explore Shimla's iconic attractions, local shopping streets and charming colonial architecture.",
              },
              {
                icon: Hotel,
                title: "Mashobra",
                text: "Discover peaceful surroundings, beautiful pine forests and refreshing mountain scenery.",
              },
              {
                icon: Camera,
                title: "Green Valley",
                text: "Capture breathtaking views of lush green mountains and spectacular Himalayan landscapes.",
              },
              {
                icon: Route,
                title: "Naldehra",
                text: "Enjoy the natural beauty of Naldehra, surrounded by dense forests and scenic mountain views.",
              },
              {
                icon: Mountain,
                title: "Jakhoo Temple",
                text: "Visit the famous hilltop temple and enjoy panoramic views of Shimla and its surroundings.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#edf5df] text-[#719f18] flex items-center justify-center mb-6">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-7 text-sm">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section
        id="itinerary"
        className="scroll-mt-28 max-w-[1280px] mx-auto px-5 md:px-5 py-12 md:py-12"
      >
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
            Your Journey
          </span>

          <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
            4 Days Of Shimla Exploration
          </h2>

          <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
            Explore your journey day by day and discover the incredible
            landscapes, attractions and experiences of Shimla and Kufri.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <img
              src={shimlap}
              alt="Shimla mountain route"
              className="w-full h-[300px] md:h-[420px] object-cover rounded-[28px]"
            />

            <div className="bg-[#1d2d50] text-white rounded-[24px] p-6 mt-5">
              <p className="text-[#a8db69] text-sm font-semibold">
                THE SHIMLA ROUTE
              </p>

              <p className="text-lg font-bold mt-2 leading-relaxed">
                Chandigarh → Shimla → Kufri → Mashobra → Naldehra
              </p>

              <p className="text-white/60 text-xs mt-3">
                Starting and return point: Chandigarh
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div
                key={item.day}
                className={`border rounded-[22px] overflow-hidden transition-all duration-300 ${
                  activeDay === index
                    ? "border-[#8fc31f] shadow-[0_8px_30px_rgba(143,195,31,0.10)]"
                    : "border-gray-200"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveDay(activeDay === index ? -1 : index)
                  }
                  className="w-full text-left p-5 md:p-7 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center font-bold ${
                        activeDay === index
                          ? "bg-[#8fc31f] text-[#172b3a]"
                          : "bg-[#f1f5eb] text-[#719f18]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <p className="text-xs text-[#719f18] font-bold tracking-wider">
                        {item.day}
                      </p>

                      <h3 className="text-lg md:text-xl font-bold mt-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        <Clock3 size={14} />
                        {item.distance}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${
                      activeDay === index
                        ? "bg-[#8fc31f] rotate-180"
                        : "bg-gray-100"
                    }`}
                  >
                    <ChevronDown size={19} />
                  </div>
                </button>

                {activeDay === index && (
                  <div className="px-5 md:px-7 pb-7 pt-1">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-600 leading-7 mb-5">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.places.map((place) => (
                          <span
                            key={place}
                            className="bg-[#f2f6ec] text-[#557c16] text-xs font-semibold px-3 py-2 rounded-full"
                          >
                            {place}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-3">
                        {item.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm text-gray-600 leading-6"
                          >
                            <span className="mt-1 text-[#8fc31f]">
                              <Check size={17} />
                            </span>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIONS / EXCLUSIONS */}
      <section
        id="inclusions"
        className="scroll-mt-28 bg-[#F6F7F8] py-12 md:py-12 m-5 rounded-[40px]"
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-5">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
              Package Details
            </span>

            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
              What's Included?
            </h2>

            <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
              Know what is covered in your Shimla holiday package and plan
              your journey with complete clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[28px] p-7 md:p-10 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#edf5df] text-[#719f18] flex items-center justify-center">
                  <Check size={25} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Inclusions</h3>
                  <p className="text-sm text-gray-500">What's covered</p>
                </div>
              </div>

              <div className="space-y-5">
                {inclusions.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-[#719f18] mt-0.5 shrink-0"
                    />
                    <p className="text-gray-600 text-sm leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-7 md:p-10 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                  <X size={25} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Exclusions</h3>
                  <p className="text-sm text-gray-500">Not included</p>
                </div>
              </div>

              <div className="space-y-5">
                {exclusions.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <X
                      size={18}
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                    <p className="text-gray-600 text-sm leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="scroll-mt-28 max-w-[1280px] mx-auto px-5 md:px-5 py-12 md:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7">
            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
              Moments & Memories
            </span>

            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
              Explore Shimla & Kufri
            </h2>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-4 max-w-[640px] lg:pt-1">
            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">
              A glimpse into the breathtaking mountain landscapes, charming
              hill stations and unforgettable experiences of Shimla.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {gallery.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-[20px] h-52 md:h-80 group"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <p className="absolute bottom-5 left-4 right-4 text-white font-semibold text-sm md:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 md:px-10 pb-12 md:pb-12">
        <div className="max-w-[1280px] mx-auto bg-[#1d2d50] rounded-[28px] md:rounded-[36px] px-7 md:px-16 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute w-72 h-72 rounded-full bg-[#8fc31f]/10 -right-20 -top-20 blur-2xl" />
          <div className="absolute w-60 h-60 rounded-full bg-[#8fc31f]/10 -left-20 -bottom-28 blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
                Your Shimla Getaway Awaits
              </span>

              <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#ffffff] mb-3">
                Ready To Discover Shimla?
              </h2>

              <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#fdfdfd] font-normal">
                Experience the charm of the Queen of Hills. Get in touch
                with our team for package details and availability.
              </p>
            </div>

            <button
              onClick={scrollToEnquiry}
              className="shrink-0 bg-[#fff] hover:bg-[#a8db69] text-[#172b3a] px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all"
            >
              Enquire Now
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* EXISTING ENQUIRY COMPONENT */}
      <section id="package-enquiry" className="scroll-mt-24">
        <TravelEnquiry />
      </section>

    </main>
  );
};

export default ShimlaPackage;
