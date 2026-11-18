
import React from "react";
import { Link } from "react-router-dom";

import manalip from "../../assets/manalip.webp";
import adventurebgg from "../../assets/adventurebgg.webp";

import {
  Mountain,
  Compass,
  Heart,
  ShieldCheck,
  Headset,
  MapPin,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Camera,
  Route,
} from "lucide-react";

const About = () => {

  const features = [
    {
      icon: <Compass size={28} />,
      title: "Personalised Experiences",
      description:
        "Every traveller is different. We help create journeys that match your interests, preferences and travel style.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Reliable Travel Support",
      description:
        "From planning to your journey, our team is here to make your travel experience smooth and comfortable.",
    },
    {
      icon: <Heart size={28} />,
      title: "Memorable Journeys",
      description:
        "We focus on meaningful experiences, beautiful destinations and memories that stay with you forever.",
    },
    {
      icon: <Headset size={28} />,
      title: "Dedicated Assistance",
      description:
        "Our team helps you with travel guidance, package details and the support you need along the way.",
    },
  ];

  const values = [
    {
      icon: <Heart size={27} />,
      title: "Passion for Travel",
      description:
        "We believe travel is about discovering new places and creating unforgettable memories.",
    },
    {
      icon: <Users size={27} />,
      title: "Traveller First",
      description:
        "Your comfort, preferences and experience always remain at the heart of our planning.",
    },
    {
      icon: <ShieldCheck size={27} />,
      title: "Trust & Transparency",
      description:
        "We believe in clear communication and helping travellers make informed decisions.",
    },
  ];

  const highlights = [
    "Personalised tour planning",
    "Carefully selected destinations",
    "Comfortable travel experiences",
    "Dedicated travel assistance",
  ];

  const steps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Tell us about your dream destination and the kind of experience you are looking for.",
    },
    {
      number: "02",
      title: "Plan",
      description:
        "We help you explore suitable destinations, itineraries and travel packages.",
    },
    {
      number: "03",
      title: "Explore",
      description:
        "Get ready to experience new places and make memories worth remembering.",
    },
  ];

  return (
    <main className="w-full bg-white overflow-hidden mt-[-150px]">

      {/* ================= HERO BANNER ================= */}
      <section className="relative min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[-150px]">
               
                                   <img
                                       src={adventurebgg}
                                       alt="Himachal Pradesh mountains"
                                       className="absolute inset-0 w-full h-full object-cover object-right"
                                   />
               
                                   <div className="absolute inset-0 bg-[#101d32]/65"></div>
               
                                   <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto mt-[265px] mb-[100px]">
               
                                       <p className="text-[20px] font-light mb-3 md:mb-5 text-white mt-20">
                                           Welcome To Nestroam Holidays
                                       </p>
               
                                       <h1 className="fontsylegilda leading-12.5 sm:leading-18.5 text-white mb-5">
                                           Travel Beyond Destinations, Create Memories
                                       </h1>
               
                                       <p className="mt-3 md:mt-1 max-w-xl mx-auto text-[16px] font-light leading-relaxed text-white/90 text-center">
                                           We believe every journey has a story. Discover beautiful destinations, meaningful experiences and unforgettable moments with Nestroam Holidays.
                                       </p>
               
                                       <div className="flex justify-center mt-7">
                                         <button
                    type="button"
                    onClick={() =>
                      document.getElementById("our-story")?.scrollIntoView({
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




      {/* ================= ABOUT INTRODUCTION ================= */}

      <section id="our-story" className="py-9 md:py-24 px-5 md:px-10">

        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          <div className="relative">

            <img
              src={manalip}
              alt="Explore the beauty of the Himalayas"
              loading="lazy"
              className="w-full h-[320px] md:h-[490px] object-cover rounded-[25px]"
            />

            <div className="absolute -bottom-5 right-4 md:right-[-20px] bg-[#1d2d50] text-[#ffffff] p-5 md:p-7 rounded-2xl max-w-[230px] shadow-xl">

              <Mountain size={30} className="mb-3" />

              <p className="text-[21px] font-bold">
                Explore More. Experience More.
              </p>

              <p className="text-sm mt-2 leading-relaxed">
                Every journey brings a new story to tell.
              </p>

            </div>

          </div>

          <div className="pt-5 md:pt-0">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              About Nestroam
            </span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">We Make Every Journey Worth Remembering</h2>
            <p class="text-[#414141] leading-[1.55] mt-3  md:mt-7">Nestroam Holidays is a travel company built around the idea
              that travelling should be more than just visiting places.
              It should be about experiences, connections and memories
              that last a lifetime.</p>




            <div className="space-y-4 mt-5 md:mt-0 mb-8 about-nest">

              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 ">

                  <CheckCircle2
                    size={21}
                    className="text-[#719d18] shrink-0"
                  />

                  <p className="text-[#303030] text-[15px] font-medium">
                    {item}
                  </p>

                </div>
              ))}

            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1d2d50] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#e6e6e6] hover:text-[#1d2d50] transition duration-300"
            >
              Book Now
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

      {/* ================= BRAND HIGHLIGHTS ================= */}

      <section className="bg-[#fff] py-12 pt-0 md:pt-12 md:py-10 px-5 md:px-10">

        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ">

          {[
            {
              icon: <Mountain size={32} />,
              title: "Beautiful Destinations",
              subtitle: "Explore new places",
            },
            {
              icon: <Compass size={32} />,
              title: "Tailored Journeys",
              subtitle: "Made around you",
            },
            {
              icon: <Camera size={32} />,
              title: "Unique Experiences",
              subtitle: "Memories that last",
            },
            {
              icon: <Headset size={32} />,
              title: "Travel Assistance",
              subtitle: "Here to help you",
            },
          ].map((item, index) => (
            <div key={index} className="text-center text-white bg-[#F6F7F8] py-10 rounded-[28px]">

              <div className="flex justify-center text-[#1d2d50] mb-4 ">
                {item.icon}
              </div>

              <h3 className="font-semibold text-[#1d2d50]" style={{ fontSize: '20px', fontWeight: 600 }}>
                {item.title}
              </h3>

              <p className=" text-xs md:text-sm mt-2 text-[#1d2d50]">
                {item.subtitle}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-9 md:py-24 px-5 md:px-10 bg-[#F6F7F8] rounded-[28px] md:rounded-[40px] m-5 md:m-5 md:mt-5 mt-0">

        <div className="max-w-[1280px] mx-auto">

          <div className="text-center max-w-[720px] mx-auto mb-12">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              Why Choose Us
            </span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">Your Journey, Our Commitment</h2>
            <p class="text-[#414141] leading-[1.55] mt-3  md:mt-3">We want to make every part of your travel experience
              convenient, <br/>enjoyable and memorable.</p>


          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-7 rounded-[22px] border border-[#eeeeee] hover:shadow-xl hover:-translate-y-2 transition duration-300 group"
              >

                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#eff6e3] text-[#719d18] group-hover:bg-[#8fc31f] group-hover:text-[#1d2d50] transition duration-300 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-[#1d2d50] text-[19px] font-semibold mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {item.title}
                </h3>

                <p className="text-[#777] text-sm leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= OUR VALUES ================= */}

      <section className="py-6 md:py-24 px-5 md:px-10">

        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-6 md:gap-12 items-center">

          <div>

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              What We Believe
            </span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-3">The Values Behind <br />Every Journey</h2>
            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">Great travel experiences begin with understanding what
              travellers truly want. Our values guide the way we plan,
              communicate and create journeys.</p>



          </div>

          <div className="space-y-5">

            {values.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-start p-6 rounded-2xl bg-[#F6F7F8] hover:bg-[#fcfcfc] transition duration-300"
              >

                <div className="w-14 h-14 shrink-0 rounded-xl bg-white flex items-center justify-center text-[#1d2d50]">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-[#1d2d50] font-semibold text-[19px] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                    {item.title}
                  </h3>

                  <p className="text-[#777] text-sm leading-7">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}

      <section className="bg-[#F6F7F8] py-9 md:py-24 px-5 md:px-10 rounded-[28px] md:rounded-[40px] m-5 md:m-5 md:mt-5 mt-0">

        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-12">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              Your Travel Journey
            </span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">From Dreaming To Exploring</h2>


          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[22px] text-center relative"
              >

                <span className="text-[42px] font-bold text-[#8fc31f]">
                  {step.number}
                </span>

                <h3 className="text-[#1d2d50] text-[22px] font-semibold mt-3 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {step.title}
                </h3>

                <p className="text-[#777] text-sm leading-7">
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="px-5 md:px-10 py-5 md:py-24">

        <div className="relative max-w-[1280px] mx-auto overflow-hidden rounded-[30px] min-h-[350px] flex items-center justify-center">

          <img
            src={manalip}
            alt="Explore the mountains with Nestroam Holidays"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover "
          />

          <div className="absolute inset-0 bg-[#101d32]/80" />

          <div className="relative z-10 text-center max-w-[750px] px-5 py-14">
            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">Your Next Adventure Starts Here</span>
            <h2 class="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#ffffff]">Let's Create Your Next Travel Story</h2>
            <p className="text-white/80 text-[15px] md:text-[16px] leading-relaxed mt-3 md:mt-5">
              Tell us where you want to go. We'll help you plan a journey
              filled with beautiful places and unforgettable experiences.
            </p>

            <div className="flex justify-center mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#ffffff] text-[#1d2d50] px-8 py-3.5 rounded-full font-semibold hover:bg-white transition duration-300"
              >
                Plan Your Trip
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
