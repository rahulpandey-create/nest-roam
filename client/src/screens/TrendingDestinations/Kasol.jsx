import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import kasolinner from '../../assets/kasolinner.jpg';
import mountain from '../../assets/mountain.svg';
import train from '../../assets/train.svg';
import nature from '../../assets/nature.svg';
import cafe from '../../assets/cafe.svg';

import TravelEnquiry from "../TravelEnquiry";

const attractions = [
    {
        name: "Chalal Village",
        category: "Village & Nature",
        distance: "2 km from Kasol",
        image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85",
        description:
            "Walk through peaceful mountain trails, traditional wooden houses and beautiful riverside surroundings.",
    },
    {
        name: "Manikaran Sahib",
        category: "Spiritual & Heritage",
        distance: "4 km from Kasol",
        image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=85",
        description:
            "Visit the famous pilgrimage destination known for its natural hot springs and peaceful spiritual atmosphere.",
    },
    {
        name: "Tosh Village",
        category: "Mountain Escape",
        distance: "21 km from Kasol",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
        description:
            "Discover breathtaking Himalayan views, charming mountain cafes and the peaceful beauty of a traditional village.",
    },
    {
        name: "Parvati River",
        category: "Riverside Experience",
        distance: "Near Kasol",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
        description:
            "Relax beside the beautiful Parvati River and enjoy the soothing sounds of flowing water and mountain scenery.",
    },
    {
        name: "Kheerganga",
        category: "Trekking & Adventure",
        distance: "Approx. 22 km trek from Barshaini",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
        description:
            "Experience an unforgettable Himalayan trek through dense forests, waterfalls and breathtaking mountain landscapes.",
    },
    {
        name: "Malana Village",
        category: "Culture & Heritage",
        distance: "Approx. 21 km from Kasol",
        image:
            "https://images.unsplash.com/photo-1511497584788-876760111969?w=900&q=85",
        description:
            "Explore the remote Himalayan village known for its distinctive traditions, architecture and mountain surroundings.",
    },
];

const experiences = [
    {
        icon: mountain,
        title: "Mountain Treks",
        description: "Explore scenic Himalayan trails and unforgettable mountain landscapes.",
    },
    {
        icon: train,
        title: "Adventure Trails",
        description: "Discover beautiful trekking routes and exciting outdoor experiences.",
    },
    {
        icon: nature,
        title: "Riverside Retreats",
        description: "Relax beside the Parvati River surrounded by peaceful mountain scenery.",
    },
    {
        icon: cafe,
        title: "Cafe Hopping",
        description: "Explore cosy mountain cafes and enjoy delicious local flavours.",
    },
];

const itinerary = [
    {
        day: "DAY 01",
        title: "Arrival & Local Exploration",
        places: "Kasol Market · Parvati River · Chalal Village",
        description:
            "Arrive in Kasol, settle into your stay and explore the charming village, riverside trails and local cafes.",
    },
    {
        day: "DAY 02",
        title: "Spiritual & Mountain Experience",
        places: "Manikaran Sahib · Tosh Village",
        description:
            "Visit the famous Manikaran Sahib and discover the beautiful mountain landscapes and village charm of Tosh.",
    },
    {
        day: "DAY 03",
        title: "Nature & Departure",
        places: "Parvati Valley · Local Market · Riverside",
        description:
            "Enjoy a peaceful morning beside the river, explore local markets and prepare for your departure.",
    },
];

const faqs = [
    {
        question: "What is the best time to visit Kasol?",
        answer:
            "March to June is ideal for pleasant weather, trekking and outdoor exploration. September to November offers beautiful autumn scenery. December to February is colder and may bring snowfall in nearby higher-altitude areas.",
    },
    {
        question: "How many days are enough for Kasol?",
        answer:
            "A 3 to 5 day trip is a good starting point to explore Kasol, Chalal, Manikaran and Tosh. Add extra days if you are planning longer treks like Kheerganga.",
    },
    {
        question: "How can I reach Kasol?",
        answer:
            "Kasol is accessible by road from Chandigarh and Delhi via Bhuntar. The nearest airport is Kullu-Manali Airport at Bhuntar, from where you can continue by taxi or bus.",
    },
    {
        question: "Is Kasol suitable for families and couples?",
        answer:
            "Yes. Kasol offers peaceful riverside stays, mountain views, local cafes and sightseeing experiences for couples, families and nature lovers. Trekking routes are better suited to travellers comfortable with hiking.",
    },
];

export default function Kasol() {
    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <main className="bg-white text-[#172b3a] overflow-hidden mt-[-75px] md:mt-[-150px]">

            {/* HERO SECTION */}
            <section className="relative min-h-[680px] h-[85vh] flex items-center">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${kasolinner})`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#081c2b]/85 via-[#081c2b]/70 to-transparent" />

                <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-4 pt-20">

                    <div className="max-w-[750px]">

                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                            <span>Home</span>
                            <span>/</span>
                            <span>Destinations</span>
                            <span>/</span>
                            <span className="text-white">Kasol</span>
                        </div>

                        <h1 className="fontsylegilda text-white leading-12.5 sm:leading-normal">
                            Discover
                            Kasol
                        </h1>

                        <p className="text-white/85 text-base text-[16px] leading-8 max-w-[580px] mt-1">
                            Where flowing rivers, lush green valleys and peaceful
                            Himalayan villages come together. Your Parvati Valley
                            escape starts here.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-9">

                            <Link
                                to="#attractions"
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
                            </Link>

                            <Link
                                to="#contact"
                                className="backdrop-blur-md border border-white/70 text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#172b3a] transition duration-300"
                            >
                                Plan Your Trip
                            </Link>

                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-8 mt-8 md:mt-14 pt-7 border-t border-white/25 text-white">

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">1,580m</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">Above Sea Level</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">3–5 Days</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">Suggested Stay</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">All Seasons</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">Travel Experiences</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="absolute bottom-8 right-10 hidden md:block text-white/80 text-xs tracking-[4px] [writing-mode:vertical-rl]">
                    YOUR MOUNTAIN ESCAPE AWAITS
                </div>

            </section>

            {/* INTRODUCTION */}
            <section className="py-20 md:py-28">

                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-14 items-center px-4">

                    <div>

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                            The Beauty Of Parvati Valley
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            A little closer to the mountains.
                        </h2>

                        <p className="text-[#414141] leading-[1.55] mt-7">
                            Nestled along the beautiful Parvati River,
                            Kasol is a peaceful Himalayan destination where
                            lush green valleys, towering mountains and
                            charming villages create the perfect getaway.
                        </p>

                        <p className="text-[#414141] leading-[1.55] mt-4">
                            From riverside cafes and scenic nature trails
                            to unforgettable mountain treks, every moment
                            in Kasol brings a new experience.
                        </p>

                        <Link
                            to="#attractions"
                            className="inline-flex items-center gap-3 mt-6 text-[16px] md:text-[16px] font-semibold text-[#1d2d50] group"
                        >
                            Discover Kasol

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

                    </div>

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=85"
                            alt="Beautiful Parvati Valley landscape"
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
            <section className="bg-[#F6F7F8] py-16 px-5 md:px-10 m-5 rounded-[40px]">

                <div className="max-w-[1280px] mx-auto text-center">

                    <div className="text-center mb-10 md:mb-14">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
                            Why Visit Kasol
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            More than just a destination
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Discover the experiences that make Kasol a favourite
                            <br />
                            Himalayan getaway.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

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
            <section id="attractions" className="py-20 md:py-28 px-5 md:px-10">

                <div className="max-w-[1280px] mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">

                        <div className="md:col-span-7">

                            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                                Explore The Region
                            </span>

                            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                                Places to explore
                            </h2>

                        </div>

                        <div className="hidden md:block md:col-span-1"></div>

                        <div className="md:col-span-4 max-w-[640px] lg:pt-1">

                            <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">
                                From peaceful riverside escapes to beautiful
                                Himalayan villages, discover the most loved
                                attractions around Kasol.
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
                        className="places-swiper mt-12"
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

                                    <div className="p-6">

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
            <section className="bg-[#1d2d50] text-white py-16 md:py-28 px-5 md:px-10 m-5 rounded-[40px]">

                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
                            Make Every Moment Count
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#fff] mb-4">
                            Your 3-day Kasol escape
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#fff] font-normal max-w-[650px] mx-auto">
                            A suggested itinerary to make the most of your mountain getaway.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-7 mt-16">

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

                                <p className="text-white/80 leading-7 mt-5 text-sm">
                                    {item.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* BEST TIME TO VISIT */}
            <section className="py-20 px-5 md:px-10 border-b border-[#D9D9D9]">

                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <div>

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
                            Plan Your Journey
                        </span>

                        <h2 className="text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            Every season has its magic.
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal">
                            Kasol offers different experiences throughout the year.
                            Choose your season depending on the kind of mountain
                            escape you are looking for.
                        </p>

                        <div className="space-y-5 mt-8">

                            {[
                                ["March – June", "Pleasant weather & trekking adventures"],
                                ["September – November", "Clear skies & beautiful mountain scenery"],
                                ["December – February", "Winter landscapes & chilly mountain escapes"],
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
                        src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&q=85"
                        alt="Kasol forest and mountain scenery"
                        className="w-full h-[480px] object-cover rounded-[28px]"
                    />

                </div>

            </section>

            {/* GALLERY */}
            <section className="px-5 md:px-10 py-16">

                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center mb-10">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                            Moments That Stay
                        </span>

                        <h2 className="text-[35px] font-bold mb-4">
                            Kasol in pictures
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Explore the breathtaking beauty of Kasol through
                            stunning riverside landscapes, mountain villages
                            and unforgettable adventures.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">

                        {[
                            "photo-1464822759023-fed622ff2c3b",
                            "photo-1500530855697-b586d89ba3ee",
                            "photo-1470770841072-f978cf4d019e",
                            "photo-1519681393784-d120267933ba",
                        ].map((photo, index) => (

                            <div
                                key={photo}
                                className={`overflow-hidden rounded-[28px] ${
                                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                }`}
                            >

                                <img
                                    src={`https://images.unsplash.com/${photo}?w=1000&q=85`}
                                    alt={`Kasol travel gallery ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                                />

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* FAQ */}
            <section className="bg-[#F6F7F8] py-20 px-5 md:px-10 m-5 rounded-[40px]">

                <div className="max-w-[850px] mx-auto">

                    <div className="text-center mb-12">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                            Got Questions
                        </span>

                        <h2 className="text-4xl font-bold mt-0">
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
            <section id="contact" className="">
                <TravelEnquiry />
            </section>

        </main>
    );
}
