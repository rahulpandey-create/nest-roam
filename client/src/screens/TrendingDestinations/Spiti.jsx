import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import spitiinner from '../../assets/spitiinner.jpg';
import mountain from '../../assets/mountain.svg';
import train from '../../assets/train.svg';
import nature from '../../assets/nature.svg';
import cafe from '../../assets/cafe.svg';

import TravelEnquiry from "../TravelEnquiry";

const attractions = [
    {
        name: "Key Monastery",
        category: "Spiritual & Heritage",
        distance: "14 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=85",
        description:
            "Discover the iconic hilltop monastery known for its ancient Buddhist culture, peaceful atmosphere and breathtaking valley views.",
    },
    {
        name: "Chandratal Lake",
        category: "Nature & Adventure",
        distance: "Approx. 90 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
        description:
            "Experience the magical beauty of this high-altitude lake surrounded by dramatic mountains and spectacular landscapes.",
    },
    {
        name: "Kibber Village",
        category: "Mountain Village",
        distance: "19 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
        description:
            "Explore a beautiful Himalayan village surrounded by rugged mountains, traditional houses and incredible natural scenery.",
    },
    {
        name: "Langza Village",
        category: "Culture & Heritage",
        distance: "16 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
        description:
            "Visit the famous Buddha statue, explore traditional village life and enjoy spectacular views of the Spiti mountains.",
    },
    {
        name: "Hikkim Village",
        category: "Unique Experiences",
        distance: "16 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85",
        description:
            "Experience the charm of one of the world's highest post offices and discover the peaceful beauty of remote Himalayan life.",
    },
    {
        name: "Dhankar Monastery",
        category: "Spiritual & Heritage",
        distance: "32 km from Kaza",
        image:
            "https://images.unsplash.com/photo-1511497584788-876760111969?w=900&q=85",
        description:
            "Explore the historic monastery dramatically perched above the confluence of the Spiti and Pin rivers.",
    },
];

const experiences = [
    {
        icon: mountain,
        title: "Mountain Adventures",
        description: "Explore dramatic Himalayan landscapes and breathtaking mountain passes.",
    },
    {
        icon: train,
        title: "Scenic Road Trips",
        description: "Experience unforgettable drives through the rugged Spiti Valley.",
    },
    {
        icon: nature,
        title: "Nature Exploration",
        description: "Discover beautiful high-altitude lakes, valleys and peaceful landscapes.",
    },
    {
        icon: cafe,
        title: "Local Experiences",
        description: "Discover traditional villages, local food and authentic Himalayan culture.",
    },
];

const itinerary = [
    {
        day: "DAY 01",
        title: "Arrival & Acclimatisation",
        places: "Kaza · Local Market · Spiti Valley",
        description:
            "Arrive in Kaza, settle into your stay and spend the day relaxing while getting accustomed to the high altitude.",
    },
    {
        day: "DAY 02",
        title: "Monasteries & Mountain Villages",
        places: "Key Monastery · Kibber · Chicham Bridge",
        description:
            "Discover ancient Buddhist monasteries, traditional mountain villages and spectacular Himalayan views.",
    },
    {
        day: "DAY 03",
        title: "Explore The High-Altitude Villages",
        places: "Langza · Hikkim · Komic",
        description:
            "Explore some of the highest inhabited villages in the region and experience the unique culture of Spiti.",
    },
];

const faqs = [
    {
        question: "What is the best time to visit Spiti Valley?",
        answer:
            "May to October is generally the best period for road trips and sightseeing, depending on road and weather conditions. Winter visits are extremely cold and require careful planning.",
    },
    {
        question: "How many days are enough for Spiti Valley?",
        answer:
            "A minimum of 6 to 8 days is recommended for a short Spiti experience. Around 8 to 10 days is better for exploring Kaza, nearby villages, monasteries and other attractions comfortably.",
    },
    {
        question: "How can I reach Spiti Valley?",
        answer:
            "Spiti can be reached by road through the Shimla-Kinnaur route or via Manali and Kunzum Pass when the route is open. The nearest major airports are in Chandigarh and Bhuntar.",
    },
    {
        question: "Is Spiti Valley suitable for families and couples?",
        answer:
            "Yes, Spiti offers unforgettable experiences for couples, families and adventure lovers. However, its high altitude, remote roads and limited facilities require proper planning and acclimatisation.",
    },
];

export default function Spiti() {
    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <main className="bg-white text-[#172b3a] overflow-hidden mt-[-75px] md:mt-[-150px]">

            {/* HERO SECTION */}
            <section className="relative min-h-[680px] h-[85vh] flex items-center">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${spitiinner})`,
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
                            <span className="text-white">Spiti Valley</span>
                        </div>

                        <h1 className="fontsylegilda text-white leading-12.5 sm:leading-normal">
                            Discover
                            Spiti Valley
                        </h1>

                        <p className="text-white/85 text-base text-[16px] leading-8 max-w-[580px] mt-1">
                            Where dramatic mountains, ancient monasteries and
                            endless Himalayan landscapes come together.
                            Your extraordinary mountain adventure starts here.
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
                                <p className="text-[16px] md:text-2xl font-bold">3,800m+</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">High Altitude Escape</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">6–10 Days</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">Suggested Stay</p>
                            </div>

                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">May – Oct</p>
                                <p className="text-[12px] md:text-sm text-white/65 mt-1">Popular Travel Season</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="absolute bottom-8 right-10 hidden md:block text-white/80 text-xs tracking-[4px] [writing-mode:vertical-rl]">
                    YOUR HIMALAYAN ADVENTURE AWAITS
                </div>

            </section>

            {/* INTRODUCTION */}
            <section className="py-20 md:py-28">

                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-14 items-center px-4">

                    <div>

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                            The Beauty Of Spiti Valley
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Where mountains tell timeless stories.
                        </h2>

                        <p className="text-[#414141] leading-[1.55] mt-7">
                            Hidden in the Trans-Himalayan region of Himachal Pradesh,
                            Spiti Valley is a breathtaking cold desert where
                            rugged mountains, ancient monasteries and beautiful
                            villages create a truly unforgettable escape.
                        </p>

                        <p className="text-[#414141] leading-[1.55] mt-4">
                            From winding mountain roads to peaceful Buddhist
                            monasteries and high-altitude lakes, every journey
                            through Spiti brings something extraordinary.
                        </p>

                        <Link
                            to="#attractions"
                            className="inline-flex items-center gap-3 mt-6 text-[16px] md:text-[16px] font-semibold text-[#1d2d50] group"
                        >
                            Discover Spiti

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
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85"
                            alt="Beautiful Spiti mountain landscape"
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
                            Why Visit Spiti
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            More than just a mountain escape
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Discover the experiences that make Spiti a truly unique
                            <br />
                            Himalayan destination.
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
                                From ancient monasteries to remote mountain
                                villages, discover the most breathtaking
                                attractions across Spiti Valley.
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
                            Your 3-day Spiti escape
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#fff] font-normal max-w-[650px] mx-auto">
                            A suggested itinerary to discover the highlights of Spiti Valley.
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
                            Spiti offers unique experiences throughout the year.
                            Choose your season depending on the kind of Himalayan
                            adventure you are looking for.
                        </p>

                        <div className="space-y-5 mt-8">

                            {[
                                ["May – June", "Pleasant days & scenic road trips"],
                                ["July – September", "Clearer access & mountain exploration, weather permitting"],
                                ["September – October", "Autumn colours & crisp mountain landscapes"],
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
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85"
                        alt="Spiti mountain and valley scenery"
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
                            Spiti in pictures
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Explore the breathtaking beauty of Spiti through
                            dramatic mountain landscapes, ancient monasteries
                            and unforgettable road trips.
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
                                    alt={`Spiti Valley travel gallery ${index + 1}`}
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
