
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

import spitiinner from "../../assets/spitiinner.jpg";
import TravelEnquiry from "../TravelEnquiry";

const itinerary = [
  {
    day: "DAY 01",
    title: "Enter the Magical Spiti Valley",
    distance: "Approx. 8–9 Hours",
    description:
      "Begin your expedition towards the spectacular Spiti Valley, travelling through dramatic mountain roads, high-altitude passes and traditional Himalayan villages before reaching Kaza.",
    places: [
      "Rohtang Pass",
      "Kunzum Pass",
      "Kunzum Devi Temple",
      "Losar Village",
      "Kaza",
    ],
    details: [
      "Start your journey towards the breathtaking Spiti Valley.",
      "Cross the scenic Rohtang Pass and Kunzum Pass.",
      "Visit Kunzum Devi Temple and enjoy the mountain landscapes.",
      "Pass through the beautiful Losar Village.",
      "Reach Kaza, check in and relax for an overnight stay.",
    ],
  },
  {
    day: "DAY 02",
    title: "Explore the Highest Villages of Spiti",
    distance: "Full Day Sightseeing",
    description:
      "Discover the unique culture, traditional homes and remote Himalayan settlements of Spiti, surrounded by stunning cold desert landscapes.",
    places: ["Langza", "Hikkim", "Komic"],
    details: [
      "After breakfast, head towards the beautiful Langza Village.",
      "Explore the village, its iconic Buddha statue and ancient heritage.",
      "Visit Hikkim, home to one of the world's highest post offices.",
      "Continue towards Komic, one of the highest motorable villages.",
      "Return to Kaza for an overnight stay.",
    ],
  },
  {
    day: "DAY 03",
    title: "Discover Spiti's Monasteries & Villages",
    distance: "Full Day Sightseeing",
    description:
      "Experience the spiritual heritage of Spiti through its ancient monasteries, traditional villages and spectacular Himalayan viewpoints.",
    places: ["Key Monastery", "Kibber", "Chicham Bridge"],
    details: [
      "Visit the magnificent Key Monastery, known for its rich history.",
      "Explore Kibber Village and experience the local culture.",
      "Drive across the spectacular Chicham Bridge.",
      "Enjoy panoramic views of the surrounding Himalayan mountains.",
      "Return to Kaza for an overnight stay.",
    ],
  },
  {
    day: "DAY 04",
    title: "Explore Pin Valley & Ancient Tabo",
    distance: "Full Day Exploration",
    description:
      "Discover the untouched beauty of Pin Valley, explore its peaceful mountain villages and experience the ancient Buddhist heritage of Tabo.",
    places: [
      "Pin Valley",
      "Mud Village",
      "Dhankar Monastery",
      "Tabo Monastery",
    ],
    details: [
      "Start your day with a scenic drive towards Pin Valley.",
      "Explore its beautiful landscapes and Mud Village.",
      "Visit the historic Dhankar Monastery and Fort.",
      "Continue to Tabo Monastery, known for its ancient heritage.",
      "Enjoy an overnight stay in Tabo.",
    ],
  },
  {
    day: "DAY 05",
    title: "Experience the Beauty of Chandratal Lake",
    distance: "Scenic Mountain Drive",
    description:
      "Experience the magical beauty of Chandratal, also known as the Moon Lake, surrounded by crystal-clear waters and mighty Himalayan peaks.",
    places: ["Chandratal Lake", "Chandratal Campsite"],
    details: [
      "After breakfast, begin your scenic drive towards Chandratal.",
      "Explore the beautiful high-altitude lake and its surroundings.",
      "Spend peaceful moments enjoying the spectacular mountain views.",
      "Stay overnight at a campsite near Chandratal.",
    ],
  },
  {
    day: "DAY 06",
    title: "A Memorable Farewell to the Himalayas",
    distance: "Approx. 7–8 Hours",
    description:
      "Conclude your unforgettable Spiti expedition with a spectacular mountain drive back, carrying memories of ancient monasteries, remote villages and breathtaking landscapes.",
    places: ["Kunzum Pass", "Mountain Landscapes", "Manali"],
    details: [
      "Enjoy breakfast at the campsite.",
      "Begin your return journey through the Himalayan mountain roads.",
      "Cross Kunzum Pass and enjoy the beautiful scenery.",
      "Reach Manali with wonderful memories of your Spiti expedition.",
    ],
  },
];

const inclusions = [
  "Pickup and drop as per the itinerary",
  "Sightseeing as mentioned in the itinerary",
  "Breakfasts and dinners",
  "All applicable taxes",
  "Parking and toll charges",
  "Fuel and driver allowances",
];

const exclusions = [
  "Early check-in and late check-out charges",
  "Monument entrance and camera fees",
  "Personal expenses, shopping and laundry",
  "Rohtang Pass permit charges",
  "Airfare or train tickets",
  "Adventure activities like skiing and paragliding",
  "Meals other than those specified",
  "Luggage charges in AC Volvo",
  "Heater charges and gala dinner",
];

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
    title: "Mountain Landscapes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    title: "Himalayan Peaks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85",
    title: "Scenic Mountain Views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
    title: "Mountain Adventure",
  },
];

const SpitiPackage = () => {
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
          src={spitiinner}
          alt="Spiti Valley Himalayan landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#101c2c] via-[#101c2c]/45 to-black/10" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-5 pb-16 md:pb-24 pt-36">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <span>Home</span>
            <span>/</span>
            <span>Packages</span>
            <span>/</span>
            <span className="text-[#a8db69]">Spiti Valley Expedition</span>
          </div>


          <h1 class="fontsylegilda text-white leading-16.5">Discover The Spiti Valley <br />Expedition</h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Explore ancient monasteries, breathtaking mountain passes,
            remote Himalayan villages and the magical beauty of Chandratal Lake.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-8 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays size={19} className="text-[#a8db69]" />
              <span className="text-sm">5 Nights / 6 Days</span>
            </div>

            <span className="hidden sm:block text-white/40">|</span>

            <div className="flex items-center gap-2">
              <MapPin size={19} className="text-[#a8db69]" />
              <span className="text-sm">Spiti Valley, Himachal Pradesh</span>
            </div>

            <span className="hidden sm:block text-white/40">|</span>

            <div className="flex items-center gap-2">
              <Route size={19} className="text-[#a8db69]" />
              <span className="text-sm">Himalayan Road Expedition</span>
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
            { icon: CalendarDays, label: "Duration", value: "5 Nights / 6 Days" },
            { icon: MapPin, label: "Starting Point", value: "Manali" },
            { icon: Mountain, label: "Destination", value: "Spiti Valley" },
            { icon: Clock3, label: "Price", value: "Price on Request" },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`p-5 md:p-7 flex items-center gap-3 md:gap-4 ${index < 2 ? "border-b md:border-b-0" : ""
                  } ${index % 2 === 0 ? "border-r" : ""} ${index === 1 ? "md:border-r" : ""
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
          <div className="flex items-center gap-7 md:gap-10 min-w-max py-5 text-[16px] font-semibold ">
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

            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">Discover The Experience</span>
            <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-5">Experience The Untouched Beauty Of Spiti Valley</h2>

            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">Discover the raw beauty of Spiti Valley with this 5 Nights / 6 Days Himalayan expedition. Journey through dramatic mountain landscapes, ancient monasteries and some of the most beautiful remote villages in the Himalayas.</p>
            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">Explore Langza, Hikkim and Komic, discover the spiritual charm of Key Monastery, cross the iconic Chicham Bridge and experience the peaceful beauty of Pin Valley and Tabo.</p>
            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">The expedition reaches its highlight at Chandratal Lake, a stunning high-altitude lake surrounded by majestic Himalayan peaks. Every day brings a new landscape and a memorable experience.</p>



            <button
              onClick={scrollToEnquiry}
              className="mt-8 inline-flex items-center gap-3 text-[#719f18] font-bold hover:gap-5 transition-all"
            >
              Plan Your Spiti Trip
              <ArrowRight size={19} />
            </button>
          </div>

          <div className="relative">
            <img
              src={spitiinner}
              alt="Beautiful landscape of Spiti Valley"
              className="w-full h-[400px] md:h-[520px] object-cover rounded-[28px]"
            />

            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-[#1d2d50] text-white p-6 md:p-8 rounded-[24px] shadow-xl">
              <p className="text-4xl font-bold text-[#ffffff]">06</p>
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

            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">What Makes It Special</span>
            <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-5">Spiti Trip Highlights</h2>
            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal mb-2">From ancient monasteries to high-altitude villages, discover
              the unforgettable experiences waiting for you in Spiti.</p>


          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Mountain,
                title: "Kunzum Pass",
                text: "Experience the spectacular mountain landscapes of this iconic Himalayan pass.",
              },
              {
                icon: Compass,
                title: "Remote Villages",
                text: "Discover Langza, Hikkim and Komic and experience the unique local culture.",
              },
              {
                icon: Hotel,
                title: "Ancient Monasteries",
                text: "Explore the historic Key, Dhankar and Tabo monasteries.",
              },
              {
                icon: Camera,
                title: "Chicham Bridge",
                text: "Witness spectacular views from one of Spiti's iconic bridges.",
              },
              {
                icon: Route,
                title: "Pin Valley",
                text: "Explore dramatic cold desert landscapes and peaceful Himalayan villages.",
              },
              {
                icon: Mountain,
                title: "Chandratal Lake",
                text: "Experience the magical beauty of the famous Moon Lake.",
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
                  <p className="text-gray-500 leading-7 text-sm">{item.text}</p>
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

        <div class="text-center mb-10 md:mb-14"><span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Your Journey</span>
          <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">6 Days Of Spiti Exploration</h2>
          <p class="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">Explore the journey day by day and discover the incredible landscapes, villages and experiences of Spiti Valley.</p>
        </div>

        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <img
              src={spitiinner}
              alt="Spiti Valley mountain route"
              className="w-full h-[300px] md:h-[420px] object-cover rounded-[28px]"
            />

            <div className="bg-[#1d2d50] text-white rounded-[24px] p-6 mt-5">
              <p className="text-[#a8db69] text-sm font-semibold">
                THE SPITI ROUTE
              </p>

              <p className="text-lg font-bold mt-2 leading-relaxed">
                Kaza → Pin Valley → Tabo → Chandratal
              </p>

              <p className="text-white/60 text-xs mt-3">
                Starting and return point: Manali
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div
                key={item.day}
                className={`border rounded-[22px] overflow-hidden transition-all duration-300 ${activeDay === index
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
                      className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center font-bold ${activeDay === index
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
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${activeDay === index
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

          <div class="text-center mb-10 md:mb-14">
            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Package Details</span>
            <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">What's Included?</h2>
            <p class="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">Know what is covered in your Spiti expedition and plan your journey <br />with complete clarity.

            </p></div>

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

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div class="md:col-span-7">
            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6"> Moments & Memories</span>
            <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">Explore Spiti Valley</h2>
          </div><div class="hidden md:block md:col-span-1"></div>
          <div class="md:col-span-4 max-w-[640px] lg:pt-1">
            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">A glimpse into the breathtaking landscapes, ancient heritage and unforgettable experiences of Spiti.</p>
          </div></div>

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
              <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">Your Spiti Adventure Awaits</span>
              <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#ffffff] mb-3">Ready To Discover Spiti Valley?</h2>
              <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#fdfdfd] font-normal">Explore the extraordinary landscapes of the Himalayas. Get in touch with our team for package details and availability.

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

export default SpitiPackage;
