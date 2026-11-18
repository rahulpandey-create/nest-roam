import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../seo/Breadcrumbs";
import SectionScrollButton from "../components/SectionScrollButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import shimlainner from '../../assets/shimlainner.webp';
import mountain from '../../assets/mountain.svg';
import train from '../../assets/train.svg';
import nature from '../../assets/nature.svg';
import cafe from '../../assets/cafe.svg';
import Theridge from '../../assets/Theridge.webp';
import Jakhootemple from '../../assets/Jakhootemple.webp';
import kufri from '../../assets/kufri.webp';
import shimlawinter from '../../assets/shimlawinter.webp';
import Mallroad from '../../assets/Mallroad.webp';
import shimlaabout from '../../assets/shimlaabout.webp';
import Christchurch from '../../assets/Christchurch.webp';
import Greenvalley from '../../assets/Greenvalley.webp';

import TravelEnquiry from "../TravelEnquiry";

const attractions = [
    {
        name: "The Ridge",
        category: "Culture & Heritage",
        distance: "1 km from Shimla",
        image:
            Theridge,
        description:
            "Enjoy panoramic mountain views, colonial architecture and the lively atmosphere of Shimla's iconic open space.",
    },
    {
        name: "Kufri",
        category: "Adventure & Nature",
        distance: "16 km from Shimla",
        image:
            kufri,
        description:
            "Experience beautiful snow-covered landscapes, scenic mountain trails and exciting outdoor activities.",
    },
    {
        name: "Jakhoo Temple",
        category: "Spiritual & Heritage",
        distance: "2 km from Shimla",
        image:
            Jakhootemple,
        description:
            "Visit the famous hilltop temple surrounded by peaceful forests and breathtaking views of the Himalayas.",
    },
    {
        name: "Mall Road",
        category: "Shopping & Local Experience",
        distance: "0.5 km from Shimla",
        image:
            Mallroad,
        description:
            "Explore charming shops, local cafes, colonial buildings and the vibrant heart of Shimla.",
    },
    {
        name: "Christ Church",
        category: "Architecture & Heritage",
        distance: "1 km from Shimla",
        image:
            Christchurch,
        description:
            "Discover one of North India's oldest churches, known for its beautiful neo-Gothic architecture.",
    },
    {
        name: "Green Valley",
        category: "Scenic Landscapes",
        distance: "8 km from Shimla",
        image:
            Greenvalley,
        description:
            "Take in stunning views of dense deodar forests and the peaceful natural beauty surrounding Shimla.",
    },
];

const experiences = [
    {
        icon: mountain,
        title: "Mountain Adventures",
        description: "Discover scenic mountain trails and beautiful Himalayan landscapes.",
    },
    {
        icon: train,
        title: "Toy Train Rides",
        description: "Experience the charm of the iconic Kalka-Shimla heritage railway.",
    },
    {
        icon: nature,
        title: "Nature Walks",
        description: "Enjoy peaceful walks through pine forests and beautiful valleys.",
    },
    {
        icon: cafe,
        title: "Cafe & Shopping",
        description: "Explore cosy cafes, local markets and the charm of Mall Road.",
    },
];

const itinerary = [
    {
        day: "DAY 01",
        title: "Arrival & Local Exploration",
        places: "The Ridge · Mall Road · Christ Church",
        description:
            "Arrive in Shimla, settle into your stay and explore the beautiful colonial streets and local attractions.",
    },
    {
        day: "DAY 02",
        title: "Adventure & Mountain Views",
        places: "Kufri · Green Valley · Jakhoo Temple",
        description:
            "Discover breathtaking mountain views, explore Kufri and enjoy the peaceful surroundings of Shimla.",
    },
    {
        day: "DAY 03",
        title: "Nature & Departure",
        places: "Mashobra · Naldehra · Local Market",
        description:
            "Enjoy a relaxed morning surrounded by nature, explore nearby attractions and prepare for departure.",
    },
];

const faqs = [
    {
        question: "What is the best time to visit Shimla?",
        answer:
            "March to June is ideal for pleasant weather and sightseeing. September to November offers beautiful autumn scenery, while December to February is perfect for experiencing winter and possible snowfall.",
    },
    {
        question: "How many days are enough for Shimla?",
        answer:
            "A 3 to 5 day trip is ideal for exploring Shimla, Kufri, Mashobra, Naldehra and nearby attractions at a comfortable pace.",
    },
    {
        question: "How can I reach Shimla?",
        answer:
            "Shimla is accessible by road from Chandigarh and Delhi. The nearest major airport is Chandigarh Airport. You can also experience the famous Kalka-Shimla toy train.",
    },
    {
        question: "Is Shimla suitable for families and couples?",
        answer:
            "Absolutely. Shimla offers beautiful mountain stays, sightseeing, heritage attractions, shopping and nature experiences for families, couples and solo travellers.",
    },
];

export default function Shimla() {
    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <main className="bg-white text-[#172b3a] overflow-hidden mt-[-75px] md:mt-[-150px]">

            {/* HERO SECTION */}
            <section className="relative min-h-[680px] h-[85vh] flex items-center">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${shimlainner})`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#081c2b]/85 via-[#081c2b]/70 to-transparent" />

                <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-4 pt-20">

                    <div className="max-w-[750px]">

                        <Breadcrumbs pagePath="/destinations/shimla" className="mb-2" />

                        <h1 className="fontsylegilda text-white leading-12.5 sm:leading-normal">
                            Discover
                            Shimla
                        </h1>

                        <p className="text-white/85 text-base text-[16px] leading-8 max-w-[580px] mt-1">
                            Where colonial charm, misty mountains and peaceful
                            pine forests come together. Your unforgettable
                            Himalayan escape starts here.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-9">

                            <SectionScrollButton
                                targetId="attractions"
                                className="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-white px-8 py-3 text-lg font-normal text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Explore Destination

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
                            </SectionScrollButton>

                            <SectionScrollButton
                                targetId="contact"
                                className="backdrop-blur-md border border-white/70 text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#172b3a] transition duration-300"
                            >
                                Plan Your Trip
                            </SectionScrollButton>

                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-8 mt-8 md:mt-14 pt-7 border-t border-white/25 text-white">

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">2,200m</p>
                                <p className="text-sm text-white/65 mt-1">Above Sea Level</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">3–5 Days</p>
                                <p className="text-sm text-white/65 mt-1">Suggested Stay</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">All Seasons</p>
                                <p className="text-sm text-white/65 mt-1">Travel Experiences</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="absolute bottom-8 right-10 hidden md:block text-white/80 text-xs tracking-[4px] [writing-mode:vertical-rl]">
                    YOUR MOUNTAIN ESCAPE AWAITS
                </div>

            </section>

            {/* INTRODUCTION */}
            <section className="py-9 md:py-28">

                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-4 md:gap-14 items-center px-4">

                    <div>

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            The Beauty Of Himachal
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Where nature meets timeless charm.
                        </h2>

                        <p className="text-[#414141] leading-[1.55] mt-3 md:mt-7">
                            Nestled in the beautiful Himalayan foothills,
                            Shimla is a destination where colonial architecture,
                            lush green forests and breathtaking mountain views
                            create the perfect mountain getaway.
                        </p>

                        <p className="text-[#414141] leading-[1.55] mt-4">
                            From exploring charming streets and heritage landmarks
                            to discovering peaceful hill stations, every moment
                            in Shimla brings something special.
                        </p>

                        <p className="mt-5 text-sm text-[#414141]">
                            Looking for trip details? <Link to="/tour-packages/shimla" className="font-semibold text-[#1d2d50] underline underline-offset-4">Explore the Shimla tour package information</Link>.
                        </p>

                        <SectionScrollButton
                            targetId="attractions"
                            className="inline-flex items-center gap-3 mt-6 text-[16px] md:text-[16px] font-semibold text-[#1d2d50] group"
                        >
                            Discover Shimla

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

                        </SectionScrollButton>

                    </div>

                    <div className="relative">

                        <img
                            src={shimlaabout}
                            alt="Beautiful Shimla forest landscape"
                            className="w-full h-[450px] object-cover rounded-[28px]"
                        />

                        <div className="absolute -bottom-6 -left-3 md:-left-8 bg-[#1d2d50] p-6 md:p-8 rounded-2xl shadow-xl">

                            <p className="text-3xl font-bold text-[#fff]">01</p>
                            <p className="text-sm font-medium mt-1 text-white">Unforgettable</p>
                            <p className="text-sm text-white">Mountain Escape</p>

                        </div>

                    </div>

                </div>

            </section>

            {/* HIGHLIGHTS */}
            <section className="bg-[#F6F7F8] py-9 md:py-16 px-5 md:px-10 m-5 rounded-[40px]">

                <div className="max-w-[1280px] mx-auto text-center">

                    <div className="text-center mb-10 md:mb-14">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Why Visit Shimla
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            More than just a hill station
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Discover the experiences that make Shimla a favourite
                            <br />
                            Himalayan getaway.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-12">

                        {experiences.map((item, index) => (

                            <div
                                key={index}
                                className="group relative shadow-[0_20px_20px_0_#00000012] flex flex-col items-center justify-center text-center bg-white border border-[#e5e5e5] rounded-[28px] md:rounded-[28px] px-5 py-8 md:py-9 transition-all duration-500 hover:-translate-y-2"
                            >

                                <div className="w-[65px] h-[65px] flex items-center justify-center mb-5">

                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="w-full h-full object-contain"
                                    />

                                </div>

                                <h3
                                    className="font-bold text-[#1d2d50]"
                                    style={{ fontSize: '20px', fontWeight: 600 }}
                                >
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-[15px] leading-6 mt-3">
                                    {item.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* ATTRACTIONS */}
            <section id="attractions" className="scroll-mt-24 py-5 md:py-28 px-5 md:px-10">

                <div className="max-w-[1280px] mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 mb-5 md:mb-12">

                        <div className="md:col-span-7">

                            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                                Explore The Region
                            </span>

                            <h2 className="text-[32px] md:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                                Places to explore
                            </h2>

                        </div>

                        <div className="hidden md:block md:col-span-1"></div>

                        <div className="md:col-span-4 max-w-[640px] lg:pt-1">

                            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">
                                From scenic hilltops to colonial landmarks,
                                discover the most loved attractions around Shimla.
                            </p>

                        </div>

                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1.15}
                        slidesPerGroup={1}
                        navigation
                        pagination={{ clickable: true }}
                        grabCursor={true}
                        watchOverflow={false}
                        loop={attractions.length > 3}
                        className="places-swiper mt-6 md:mt-12"
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 2.5, spaceBetween: 24 },
                            1280: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                    >

                        {attractions.map((place, index) => (

                            <SwiperSlide key={place.name}>

                                <article className="group rounded-[22px] overflow-hidden bg-[#F6F7F8] h-full">

                                    <div className="relative h-[290px] overflow-hidden">

                                        <img
                                            src={place.image}
                                            alt={place.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />

                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#172b3a] px-3 py-2 rounded-full text-xs font-semibold">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                    </div>

                                    <div className="p-6 h-68 md:h-auto">

                                        <p className="text-[#719c40] text-[14px] font-semibold uppercase tracking-wider">
                                            {place.category}
                                        </p>

                                        <h3
                                            className="text-xl font-bold mt-3"
                                            style={{ fontSize: '24px', fontWeight: 600 }}
                                        >
                                            {place.name}
                                        </h3>

                                        <p className="text-xs text-gray-700 mt-2">
                                            📍 {place.distance}
                                        </p>

                                        <p className="text-gray-800 text-sm leading-6 mt-4">
                                            {place.description}
                                        </p>

                                    </div>

                                </article>

                            </SwiperSlide>

                        ))}

                    </Swiper>

                    <style>{`
                        .places-swiper { padding-bottom: 55px !important; }

                        .places-swiper .swiper-button-next,
                        .places-swiper .swiper-button-prev {
                            width: 42px;
                            height: 42px;
                            background: #1d2d50;
                            border-radius: 50%;
                            color: #fff;
                            top: 42%;
                            transition: all .3s ease;
                            z-index: 10;
                            padding: 10px;
                        }

                        .places-swiper .swiper-button-prev { left: 10px; }
                        .places-swiper .swiper-button-next { right: 10px; }

                        .places-swiper .swiper-button-disabled {
                            opacity: .35;
                            pointer-events: none;
                        }

                        .places-swiper .swiper-button-next:hover,
                        .places-swiper .swiper-button-prev:hover {
                            background: #8fc31f;
                            color: #1d2d50;
                        }

                        .places-swiper .swiper-button-next::after,
                        .places-swiper .swiper-button-prev::after {
                            font-size: 15px;
                            font-weight: 700;
                        }

                        .places-swiper .swiper-pagination {
                            bottom: 5px !important;
                        }

                        .places-swiper .swiper-pagination-bullet {
                            width: 8px;
                            height: 8px;
                            background: #1d2d50;
                            opacity: .3;
                            transition: all .3s ease;
                        }

                        .places-swiper .swiper-pagination-bullet-active {
                            width: 25px;
                            border-radius: 20px;
                            background: #8fc31f;
                            opacity: 1;
                        }

                        @media (max-width: 640px) {
                            .places-swiper .swiper-button-next,
                            .places-swiper .swiper-button-prev {
                                display: none;
                            }
                        }
                    `}</style>

                </div>

            </section>

            {/* ITINERARY */}
            <section className="bg-[#1d2d50] text-white py-9 md:py-28 px-5 md:px-10 m-5 rounded-[20px] md:rounded-[40px]">

                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Make Every Moment Count
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#ffffff]">
                            Your 3-day Shimla escape
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#ffffff] font-normal max-w-[650px] mx-auto mt-3 md:mt-4">
                            A suggested itinerary to make the most of your mountain getaway.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-7 mt-8 md:mt-16">

                        {itinerary.map((item, index) => (

                            <div
                                key={item.day}
                                className="border border-white/15 rounded-2xl p-7 md:p-9 hover:bg-white/5 transition"
                            >

                                <span className="text-[#a8db69] font-bold text-sm tracking-widest">
                                    {item.day}
                                </span>

                                <div className="w-10 h-10 rounded-full border border-[#a8db69] flex items-center justify-center text-[#a8db69] mt-7">
                                    0{index + 1}
                                </div>

                                <h3
                                    className="text-2xl font-bold mt-6"
                                    style={{ fontSize: '20px', fontWeight: 600 }}
                                >
                                    {item.title}
                                </h3>

                                <p className="text-[#a8db69] text-[15px] mt-4">
                                    {item.places}
                                </p>

                                <p className="text-white/80 leading-7 mt-1 md:mt-5 text-sm">
                                    {item.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* BEST TIME TO VISIT */}
            <section className="py-6 md:py-20 px-5 md:px-10 border-b border-[#D9D9D9]">

                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-6 md:gap-12  items-center">

                    <div>

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Plan Your Journey
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Every season has its magic.
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto mt-3 md:mt-4">
                            Shimla offers different experiences throughout the year.
                            Choose your season depending on the kind of mountain
                            escape you are looking for.
                        </p>

                        <div className="space-y-5 mt-8">

                            {[
                                ["March – June", "Pleasant weather & outdoor exploration"],
                                ["September – November", "Autumn colours & beautiful mountain scenery"],
                                ["December – February", "Winter landscapes & snowfall opportunities"],
                            ].map(([season, detail]) => (

                                <div key={season} className="flex gap-4 items-start">

                                    <div className="w-3 h-3 rounded-full bg-[#a8db69] mt-2 shrink-0" />

                                    <div>
                                        <h3 className="font-bold text-[#1d2d50]">
                                            {season}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            {detail}
                                        </p>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    <img
                        src={shimlawinter}
                        alt="Shimla forest and mountain scenery"
                        className="w-full h-[480px] object-cover rounded-[28px]"
                    />

                </div>

            </section>

            {/* GALLERY */}
            <section className="px-5 md:px-10 py-8 md:py-16">

                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center mb-10">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Moments That Stay
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Shimla in pictures
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto mt-3 md:mt-4">
                            Explore the breathtaking beauty of Shimla through stunning landscapes, charming streets and unforgettable
                            mountain moments.
                        </p>

                    </div>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
                                           {[
                                               Mallroad,
                                               Theridge,
                                               shimlawinter,
                                               Jakhootemple,
                                               shimlaabout,
                                           ].map((photo, index) => (
                                               <div
                                                   key={index}
                                                   className={`overflow-hidden rounded-[20px] md:rounded-[28px] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                                       }`}
                                               >
                                                   <img
                                                       src={photo}
                                                       alt={`Manali travel gallery ${index + 1}`}
                                                       className="w-full h-full object-cover hover:scale-110 transition duration-700"
                                                   />
                                               </div>
                                           ))}
                                       </div>

                </div>

            </section>

            {/* FAQ */}
            <section className="bg-[#F6F7F8] md:py-20 py-9 px-5 md:px-10 mt-0 md:mt-5 m-5 md:m-5 rounded-[20px] md:rounded-[40px]">

                <div className="max-w-[850px] mx-auto">

                    <div className="text-center mb-12">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Got Questions
                        </span>

                        <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Frequently asked questions
                        </h2>

                    </div>

                    <div className="space-y-4">

                        {faqs.map((faq, index) => (

                            <div
                                key={faq.question}
                                className="bg-white rounded-xl px-6 py-5 border border-gray-300"
                            >

                                <button
                                    onClick={() =>
                                        setActiveFaq(activeFaq === index ? -1 : index)
                                    }
                                    className="w-full flex items-center justify-between gap-4 text-left font-semibold"
                                >

                                    {faq.question}

                                    <span className="text-2xl text-[#719c40]">
                                        {activeFaq === index ? "−" : "+"}
                                    </span>

                                </button>

                                {activeFaq === index && (

                                    <p className="text-gray-500 leading-7 text-sm mt-4">
                                        {faq.answer}
                                    </p>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section id="contact" className="scroll-mt-24">
                <TravelEnquiry />
            </section>

        </main>
    );
}