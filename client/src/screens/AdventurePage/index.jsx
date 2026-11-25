
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
  Camera,
  Compass,
  CheckCircle2,
} from "lucide-react";

import trekking from "../../assets/trekking.webp";
import rafting from "../../assets/rafting.webp";
import paragliding from "../../assets/paragliding.webp";
import camping from "../../assets/camping.webp";
import snowactivities from "../../assets/snowactivities.webp";

import trekkingIcon from "../../assets/trekking.svg";
import raftingIcon from "../../assets/rafting.svg";
import paraglidingIcon from "../../assets/paragliding.svg";
import campingIcon from "../../assets/camping.svg";
import snowIcon from "../../assets/snowactivity.svg";

import adventurebg from "../../assets/adventurebg.webp";
import adventurebgg from "../../assets/adventurebgg.webp";

const adventures = [
  {
    id: 1,
    title: "Trekking",
    subtitle: "Explore Beyond the Trails",
    image: trekking,
    icon: trekkingIcon,
    description:
      "Discover the breathtaking beauty of the Himalayas on foot. From peaceful forest trails to challenging mountain routes, experience nature like never before.",
    location: "Manali, Kasol & Spiti",
    season: "March – October",
    duration: "1 – 7 Days",
    highlights: [
      "Scenic Himalayan trails",
      "Mountain camping experiences",
      "Beautiful valley viewpoints",
      "Experienced trek leaders",
    ],
  },
  {
    id: 2,
    title: "River Rafting",
    subtitle: "Ride the Rapids",
    image: rafting,
    icon: raftingIcon,
    description:
      "Feel the adrenaline rush as you navigate exciting river rapids surrounded by stunning Himalayan landscapes. An unforgettable experience for adventure lovers.",
    location: "Kullu & Manali",
    season: "March – June",
    duration: "1 – 3 Hours",
    highlights: [
      "Exciting river rapids",
      "Professional rafting guides",
      "Safety equipment included",
      "Amazing riverside scenery",
    ],
  },
  {
    id: 3,
    title: "Paragliding",
    subtitle: "Fly Above the Mountains",
    image: paragliding,
    icon: paraglidingIcon,
    description:
      "Experience the freedom of flying high above the beautiful valleys of Himachal. Enjoy spectacular mountain views with trained tandem paragliding pilots.",
    location: "Solang Valley & Bir Billing",
    season: "March – June",
    duration: "15 – 30 Minutes",
    highlights: [
      "Bird's-eye mountain views",
      "Certified tandem pilots",
      "Memorable flying experience",
      "Safety-first arrangements",
    ],
  },
  {
    id: 4,
    title: "Camping",
    subtitle: "Stay Close to Nature",
    image: camping,
    icon: campingIcon,
    description:
      "Escape the busy city life and spend peaceful nights under a sky full of stars. Enjoy mountain camping with bonfires, beautiful surroundings and memorable moments.",
    location: "Kasol, Manali & Jibhi",
    season: "March – November",
    duration: "1 – 3 Nights",
    highlights: [
      "Beautiful mountain campsites",
      "Bonfire and evening vibes",
      "Stargazing experiences",
      "Nature and riverside stays",
    ],
  },
  {
    id: 5,
    title: "Snow Activities",
    subtitle: "Experience the Winter Magic",
    image: snowactivities,
    icon: snowIcon,
    description:
      "Make your winter holidays more exciting with thrilling snow adventures. Enjoy the magic of snow-covered mountains and exciting seasonal activities.",
    location: "Solang Valley & Gulaba",
    season: "December – February",
    duration: "As per Activity",
    highlights: [
      "Snow adventure experiences",
      "Seasonal winter activities",
      "Beautiful snow landscapes",
      "Fun for friends and families",
    ],
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Enjoy your adventures with proper safety equipment and experienced activity professionals.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our experienced local team helps make every adventure comfortable and memorable.",
  },
  {
    icon: Compass,
    title: "Handpicked Experiences",
    description:
      "Explore carefully selected activities across the beautiful destinations of Himachal.",
  },
  {
    icon: Camera,
    title: "Memorable Moments",
    description:
      "Create unforgettable memories surrounded by breathtaking Himalayan landscapes.",
  },
];

const AdventuresPage = () => {
  return (
    <main className="w-full overflow-hidden bg-white mt-[-150px]">

      {/* HERO SECTION */}
      
 
         <section className="relative min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[-150px]">
         
                             <img
                                 src={adventurebgg}
                                 alt="Himachal Pradesh mountains"
                                 className="absolute inset-0 w-full h-full object-cover"
                             />
         
                             <div className="absolute inset-0 bg-[#101d32]/65"></div>
         
                             <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto mt-[265px] md:mb-[100px] mb-[48px]">
         
                                 <p className="text-[20px] font-light mb-3 md:mb-1 text-white mt-20">
                                     Explore With Nestroam
                                 </p>
         
                                 <h1 className="fontsylegilda leading-12.5 sm:leading-normal text-white">
                                     Adventure Experiences in Himachal Pradesh
                                 </h1>
         
                                 <p className="mt-3 md:mt-1 max-w-xl mx-auto text-[16px] font-light leading-relaxed text-white/90 text-center">
                                     Discover beautiful destinations, exciting adventures and
                                     unforgettable journeys with our exclusive travel experiences.
                                 </p>
         
                                 <div className="flex justify-center mt-7">
                                   <button
                    type="button"
                    onClick={() =>
                      document.getElementById("adventure-activities")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    className="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-white px-8 py-4 text-lg font-normal text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore Adventures
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-6 w-6 text-lime-600 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M4 12h16M14 6l6 6-6 6" />
                    </svg>
                  </button>
                                 </div>
         
                             </div>
                         </section>

      {/* INTRODUCTION */}
    

      {/* ADVENTURE ACTIVITIES */}
      <section
        id="adventure-activities"
        className="py-9 md:py-10 px-5 md:px-10"
        style={{
          backgroundImage: `url(${adventurebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-[1280px] mx-auto">

          <div className="text-center mb-10 md:mb-14">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              Explore Activities
            </span>

            <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
              Adventures For Every Explorer
            </h2>
            <p class="text-[#414141] leading-[1.55] mt-3  md:mt-7">Whether you are a thrill seeker or a nature lover,
              find the perfect<br/> adventure for your next getaway.</p>

          

          </div>

          <div className="space-y-8 md:space-y-12">

            {adventures.map((item, index) => (

              <div
                key={item.id}
                id={item.title.toLowerCase().replaceAll(" ", "-")}
                className={`bg-white rounded-[24px] md:rounded-[30px] overflow-hidden shadow-sm border border-[#e9e9e9] grid grid-cols-1 lg:grid-cols-2 ${
                  index % 2 !== 0 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >

                {/* Activity Image */}
                <div className="relative h-[260px] md:h-[380px] lg:h-full min-h-[320px] overflow-hidden group">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                    <div className="bg-[#8fc31f] p-3 rounded-full">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-7 h-7 object-contain"
                      />
                    </div>

                    <span className="text-[22px] font-bold">
                      {item.title}
                    </span>
                  </div>

                </div>

                {/* Activity Details */}
                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">

                  <span className="text-[#719f18] text-sm font-semibold tracking-wider mb-3">
                    {item.subtitle}
                  </span>

                  <h3 className="text-[29px] md:text-[36px] font-bold text-[#1d2d50] mb-4" style={{ fontSize: "24px", fontWeight: "700" }}>
                    {item.title}
                  </h3>

                  <p className="text-[#666] text-[15px] leading-[1.8] mb-7">
                    {item.description}
                  </p>

                  {/* Activity Information */}
                  <div className="grid grid-cols-2 gap-4 mb-7">

                    <div className="flex items-start gap-2">
                      <MapPin className="text-[#8fc31f] shrink-0 mt-1" size={19} />
                      <div>
                        <span className="block text-xs text-gray-400 mb-1">
                          Location
                        </span>
                        <span className="text-sm font-semibold text-[#1d2d50]">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Compass className="text-[#8fc31f] shrink-0 mt-1" size={19} />
                      <div>
                        <span className="block text-xs text-gray-400 mb-1">
                          Duration
                        </span>
                        <span className="text-sm font-semibold text-[#1d2d50]">
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 col-span-2">
                      <Mountain className="text-[#8fc31f] shrink-0 mt-1" size={19} />
                      <div>
                        <span className="block text-xs text-gray-400 mb-1">
                          Best Season
                        </span>
                        <span className="text-sm font-semibold text-[#1d2d50]">
                          {item.season}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Highlights */}
                  <div className="border-t border-gray-100 pt-6">

                    <h4 className="text-[#1d2d50] font-bold text-[17px] mb-4">
                      Experience Highlights
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {item.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2
                            size={17}
                            className="text-[#8fc31f] shrink-0"
                          />
                          <span className="text-[14px] text-[#555]">
                            {highlight}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hi Nestroam Holidays, I am interested in ${item.title}. Please share more details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#1d2d50] hover:bg-[#8fc31f] hover:text-[#1d2d50] text-white font-semibold px-7 py-4 rounded-full mt-8 w-fit transition-all duration-300"
                  >
                    Enquire Now
                    <ArrowUpRight size={19} />
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#F6F7F8] py-10 md:py-16 px-5 md:px-10 m-5 rounded-[28px] md:rounded-[40px]">

        <div className="max-w-[1280px] mx-auto">
            

          <div className="text-center mb-12">
            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">The Nestroam Difference</span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">Adventure With Confidence</h2>
            <p class="text-[#414141] leading-[1.55] mt-3  md:mt-7">We believe every adventure should be exciting,
              <br/>comfortable and memorable.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-[#fff] p-7 rounded-[22px] text-center hover:-translate-y-2 transition-transform duration-300"
                >

                  <div className="w-[65px] h-[65px] bg-[#0000] rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon size={48} className="text-[#1d2d50]" />
                  </div>

                  <h3 className="text-[#1d2d50] font-bold text-[19px] mb-3" style={{ fontSize: "20px", fontWeight: "600" }}>
                    {item.title}
                  </h3>

                  <p className="text-[#666] text-sm leading-[1.7]">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 md:px-10 pb-7 md:pb-7">

        <div className="max-w-[1280px] mx-auto relative rounded-[28px] overflow-hidden bg-[#1d2d50] px-6 py-10 md:py-14 md:py-20 text-center">

          <div
            className=" inset-0 opacity-10"
            style={{
              backgroundImage: `url(${adventurebg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div class="text-center mb-0"><span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">Your Adventure Awaits</span>
          <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] text-[#fff] mb-3">Ready To Make Your Next Trip
Unforgettable?</h2>
          <p class="text-[16px] leading-[1.55] text-[#fff] font-normal max-w-[650px] mx-auto">Let's plan an exciting Himalayan adventure together. Tell us what excites you and we will help you make it happen.</p>
          <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#ffffff] hover:bg-[#a8db69] text-[#1d2d50] px-8 py-4 rounded-full font-bold transition-all duration-300 mt-12"
            >
              Plan Your Adventure
              <ArrowRight size={19} />
            </Link>
          </div>

          

        </div>

      </section>

    </main>
  );
};

export default AdventuresPage;
