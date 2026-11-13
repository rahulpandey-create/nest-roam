
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import manaliinner from '../../assets/manaliinner.jpg';
import mountain from '../../assets/mountain.svg';
import train from '../../assets/train.svg';
import nature from '../../assets/nature.svg';
import cafe from '../../assets/cafe.svg';
import TravelEnquiry from "../TravelEnquiry";

const attractions = [
    {
        name: "Solang Valley",
        category: "Adventure & Nature",
        distance: "13 km from Manali",
        image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
        description:
            "Experience breathtaking mountain views, adventure activities and beautiful alpine landscapes.",
    },
    {
        name: "Hadimba Devi Temple",
        category: "Culture & Heritage",
        distance: "2.5 km from Manali",
        image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=85",
        description:
            "Discover the beautiful wooden architecture of this historic temple surrounded by cedar forests.",
    },
    {
        name: "Old Manali",
        category: "Local Experience",
        distance: "3 km from Manali",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
        description:
            "Explore charming cafes, mountain views, local markets and the relaxed Himalayan atmosphere.",
    },
    {
        name: "Rohtang Pass",
        category: "Mountain Escape",
        distance: "51 km from Manali",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
        description:
            "Witness dramatic Himalayan landscapes and snow-covered mountain scenery.",
    },
];

const experiences = [
    {
        icon: mountain,
        title: "Mountain Adventures",
        description: "Explore scenic trails and enjoy the beauty of the Himalayas.",
    },
    {
        icon: train,
        title: "Solang Activities",
        description: "Discover exciting outdoor experiences in Solang Valley.",
    },
    {
        icon: nature,
        title: "Nature Walks",
        description: "Relax among peaceful cedar forests and mountain streams.",
    },
    {
        icon: cafe,
        title: "Cafe Hopping",
        description: "Enjoy cosy cafes and local flavours in Old Manali.",
    },
];

const itinerary = [
    {
        day: "DAY 01",
        title: "Arrival & Local Exploration",
        places: "Mall Road · Hadimba Temple · Old Manali",
        description:
            "Arrive in Manali, settle into your stay and explore the beautiful local surroundings.",
    },
    {
        day: "DAY 02",
        title: "Adventure & Mountain Views",
        places: "Solang Valley · Atal Tunnel",
        description:
            "Spend the day discovering scenic mountain landscapes and outdoor adventures.",
    },
    {
        day: "DAY 03",
        title: "Nature & Departure",
        places: "Vashisht · Beas River · Local Market",
        description:
            "Enjoy a relaxed morning, explore local experiences and prepare for departure.",
    },
];

const faqs = [
    {
        question: "What is the best time to visit Manali?",
        answer:
            "April to July is popular for pleasant weather and outdoor exploration. October to December is another beautiful period for mountain scenery. Winter visits are ideal for those seeking snow, subject to weather conditions.",
    },
    {
        question: "How many days are enough for Manali?",
        answer:
            "A 3 to 5 day trip is a good starting point to explore Manali, Solang Valley and nearby attractions.",
    },
    {
        question: "How can I reach Manali?",
        answer:
            "Manali is accessible by road from Chandigarh and Delhi. The nearest airport is Kullu-Manali Airport at Bhuntar.",
    },
    {
        question: "Is Manali suitable for families and couples?",
        answer:
            "Yes. Manali offers scenic stays, nature experiences, sightseeing and adventure activities suitable for different types of travellers.",
    },
];

export default function Manali() {
    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <main className="bg-white text-[#172b3a] overflow-hidden mt-[-75px] md:mt-[-150px]">

            {/* HERO SECTION */}
            <section className="relative min-h-[680px] h-[85vh] flex items-center">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${manaliinner})`,
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
                            <span className="text-white">Manali</span>
                        </div>

                        {/* <span className="text-[20px] text-white text-sm mb-6">
              
              Explore Himachal Pardesh
            </span> */}

                        <h1 className="fontsylegilda text-white leading-12.5 sm:leading-normal">
                            Discover
                            Manali
                        </h1>

                        <p className="text-white/85 text-base text-[16px] leading-8 max-w-[580px] mt-1">
                            Where snow-capped peaks, peaceful valleys and unforgettable
                            mountain adventures come together. Your Himalayan escape starts here.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-9">
                            <Link to="#attractions" class="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-white px-8 py-3 text-lg font-normal text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore Destination<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-6 w-6 text-lime-600 transition-transform group-hover:translate-x-1"><path d="M4 12h16M14 6l6 6-6 6"></path></svg></Link>


                            <Link
                                to="#contact"
                                className="backdrop-blur-md border border-white/70 text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#172b3a] transition duration-300"
                            >
                                Plan Your Trip
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-8 mt-8 md:mt-14 pt-7 border-t border-white/25 text-white">
                            <div>
                                <p className="text-[16px] md:text-2xl font-bold">5,000+</p>
                                <p className="text-sm text-white/65 mt-1">Mountain Views</p>
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
            <section className="py-20 md:py-28">
                <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-14 items-center px-4">

                    <div>

                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">The Beauty Of Himachal</span>
                        <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">A little closer to nature.</h2>


                        <p className="text-[#414141] leading-[1.55] mt-7">
                            Nestled in the beautiful Beas River Valley, Manali is a
                            destination where majestic mountains, lush green forests and
                            peaceful surroundings create the perfect mountain getaway.
                        </p>

                        <p className="text-[#414141] leading-[1.55] mt-4">
                            From exploring charming mountain villages to discovering
                            breathtaking landscapes, every moment in Manali brings
                            something special.
                        </p>


                        <Link to="#attractions" class="inline-flex items-center gap-3 mt-6 text-[16px] md:text-[16px] font-semibold text-[#1d2d50] group">Discover Manali<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-[#8fc31f] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></Link>
                    </div>

                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&q=85"
                            alt="Beautiful mountain landscape"
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

                    <div class="text-center mb-10 md:mb-14">
                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Why Visit Manali</span>
                        <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">More than just a destination</h2>
                        <p class="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">Discover the experiences that make Manali a favourite <br />Himalayan getaway.</p></div>

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
                                <h3 className="font-bold text-[#1d2d50]" style={{ fontSize: '20px', fontWeight: 600 }}>{item.title}</h3>
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

                    
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12"><div class="md:col-span-7">
                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">Explore The Region</span>
                        <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">Places to explore</h2>
                        </div>
                        <div class="hidden md:block md:col-span-1"></div>
                        <div class="md:col-span-4 max-w-[640px] lg:pt-1">
                            <p class="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal">From beautiful valleys to cultural landmarks, discover the most loved attractions around Manali.</p>
                            </div></div>

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
                                        <h3 className="text-xl font-bold mt-3" style={{ fontSize: '24px', fontWeight: 600 }}>
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
                            width: 42px; height: 42px; background: #1d2d50;
                            border-radius: 50%; color: #fff; top: 42%;
                            transition: all .3s ease;
                            z-index: 10;     padding: 10px;
                        }
                        .places-swiper .swiper-button-prev { left: 10px; }
                        .places-swiper .swiper-button-next { right: 10px; }
                        .places-swiper .swiper-button-disabled {
                            opacity: .35;
                            pointer-events: none;
                        }
                        .places-swiper .swiper-button-next:hover,
                        .places-swiper .swiper-button-prev:hover {
                            background: #8fc31f; color: #1d2d50;
                        }
                        .places-swiper .swiper-button-next::after,
                        .places-swiper .swiper-button-prev::after {
                            font-size: 15px; font-weight: 700;
                        }
                        .places-swiper .swiper-pagination { bottom: 5px !important; }
                        .places-swiper .swiper-pagination-bullet {
                            width: 8px; height: 8px; background: #1d2d50;
                            opacity: .3; transition: all .3s ease;
                        }
                        .places-swiper .swiper-pagination-bullet-active {
                            width: 25px; border-radius: 20px;
                            background: #8fc31f; opacity: 1;
                        }
                        @media (max-width: 640px) {
                            .places-swiper .swiper-button-next,
                            .places-swiper .swiper-button-prev { display: none; }
                        }
                    `}</style>

                </div>
            </section>

            {/* ITINERARY */}
            <section className="bg-[#1d2d50] text-white py-16 md:py-28 px-5 md:px-10 m-5 rounded-[40px]">
                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center">

                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Make Every Moment Count</span>

                        <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#fff] mb-4">Your 3-day Manali escape</h2>
                        <p class="text-[16px] leading-[1.55] text-[#fff] font-normal max-w-[650px] mx-auto">A suggested itinerary to make the most of your mountain getaway.</p>
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

                                <h3 className="text-2xl font-bold mt-6 " style={{ fontSize: '20px', fontWeight: 600 }}>
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
                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">Plan Your Journey</span>

                        <h2 class="text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">Every season has its magic.</h2>

                        <p class="text-[16px] leading-[1.55] text-[#414141] font-normal">Manali offers different experiences throughout the year.
                            Choose your season depending on the kind of mountain
                            escape you are looking for.</p>


                        <div className="space-y-5 mt-8">
                            {[
                                ["April – July", "Pleasant weather & outdoor exploration"],
                                ["October – December", "Autumn colours & mountain scenery"],
                                ["December – February", "Winter landscapes & snowfall opportunities"],
                            ].map(([season, detail]) => (
                                <div key={season} className="flex gap-4 items-start">
                                    <div className="w-3 h-3 rounded-full bg-[#a8db69] mt-2 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-[#1d2d50]">{season}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&q=85"
                        alt="Forest and mountain scenery"
                        className="w-full h-[480px] object-cover rounded-[28px]"
                    />

                </div>
            </section>

            {/* GALLERY */}
            <section className="px-5 md:px-10 py-16">
                <div className="max-w-[1280px] mx-auto">

                    <div className="text-center mb-10">
                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">Moment That Stay</span>
                        
                        <h2 className="text-[35px] font-bold mb-4">Manali in pictures</h2>
                        <p class="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">Explore the breathtaking beauty of Manali through stunning landscapes, unforgettable moments, and mountain adventures.</p>
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
                                className={`overflow-hidden rounded-[28px] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                            >
                                <img
                                    src={`https://images.unsplash.com/${photo}?w=1000&q=85`}
                                    alt={`Manali travel gallery ${index + 1}`}
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
                        <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-5">Got Questions</span>
                        
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
                <TravelEnquiry/>
            </section>

        </main>
    );
}
