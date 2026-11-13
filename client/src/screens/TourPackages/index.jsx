
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import manalip from '../../assets/manalip.png';
import shimlap from "../../assets/shimlap.png";
import spitip from "../../assets/spitip.png";


const packages = [
  {
    id: 1,
    title: "Manali Mountain Escape",
    image: manalip,
    badge: "Most Popular",
    nights: "5 Nights | 6 Days",
    price: "16,999",
    link: "/TourPackages/ManaliPackage",
  },
  {
    id: 2,
    title: "Shimla & Kufri Retreat",
    image: shimlap,
    badge: "",
    nights: "3 Nights | 4 Days",
    price: "12,999",
    link: "/TourPackages/ShimlaPackage",
  },
  {
    id: 3,
    title: "Spiti Valley Expedition",
    image: spitip,
    badge: "Adventure Trip",
    nights: "7 Nights | 8 Days",
    price: "16,999",
    link: "/TourPackages/SpitiPackage",
  },
  {
    id: 4,
    title: "Kasol Valley Getaway",
    image: shimlap,
    badge: "Trending",
    nights: "3 Nights | 4 Days",
    price: "9,999",
    link: "/TourPackages/KasolPackage",
  },
];


const TourPackages = () => {

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeDot, setActiveDot] = useState(0);

    // Exactly 3 navigation positions
    const navigationIndexes = [
        0,
        Math.round((packages.length - 1) / 2),
        packages.length - 1,
    ];

    // Custom pagination click
    const handleNavigation = (index) => {
        if (!swiperInstance) return;

        swiperInstance.slideToLoop(navigationIndexes[index]);
        setActiveDot(index);
    };

    // Update active bar during autoplay/swiping
    const updateActiveDot = (swiper) => {
        const currentIndex = swiper.realIndex;

        const closestIndex = navigationIndexes.reduce(
            (closest, value, index) => {
                return Math.abs(value - currentIndex) <
                    Math.abs(navigationIndexes[closest] - currentIndex)
                    ? index
                    : closest;
            },
            0
        );

        setActiveDot(closestIndex);
    };


    return (
        <section className="tour-packages-section m-4">

            <div className="max-w-[1280px] mx-auto px-4 md:px-4 xl:px-4">

                {/* Section Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">

                    {/* Heading */}
                    <div className="md:col-span-7">
                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-6">
                            Popular Package
                        </span>

                        <h2 className="text-[36px] leading-tight font-bold text-[#1d2d50]">
                            Our Exclusive Tour Packages
                        </h2>
                    </div>

                    {/* Empty Space */}
                    <div className="hidden md:block md:col-span-1"></div>

                    {/* Description */}
                    <div className="md:col-span-4 max-w-[640px] lg:pt-1">
                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal">
                            Explore handpicked travel packages for unforgettable journeys and lasting memories.
                        </p>

                        <Link
                            to="/TourPackages"
                            className="inline-flex items-center gap-3 mt-6 text-[16px] font-semibold text-[#1d2d50] group"
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
                    </div>

                </div>


                {/* Swiper */}
                <div className="tour-swiper-wrapper">

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        speed={800}

                        onSwiper={(swiper) => {
                            setSwiperInstance(swiper);
                            updateActiveDot(swiper);
                        }}

                        onSlideChange={updateActiveDot}

                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}

                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            600: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}

                        className="tour-swiper"
                    >

                        {packages.map((item) => (
                            <SwiperSlide key={item.id}>

                                <div className="tour-card">

                                    {/* Image */}
                                    <div className="tour-card-image">

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />

                                        {item.badge && (
                                            <span className="tour-card-badge">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>

                                    {/* Content */}
                                    <div className="tour-card-content">

                                        <h3>{item.title}</h3>

                                        <div className="tour-card-meta">

                                            <div className="tour-meta-item">
                                                <svg viewBox="0 0 24 24">
                                                    <rect x="3" y="5" width="18" height="16" rx="2" />
                                                    <path d="M16 3v4M8 3v4M3 10h18" />
                                                </svg>
                                                <span>{item.nights}</span>
                                            </div>

                                            {/* <div className="tour-meta-item">
                                                <svg viewBox="0 0 24 24">
                                                    <circle cx="12" cy="8" r="3" />
                                                    <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
                                                    <path d="M19 5c2 1 2 4 0 5M21 15c1 1 1 3 1 4" />
                                                </svg>
                                                <span>{item.travellers}</span>
                                            </div> */}

                                        </div>

                                        <div className="tour-card-bottom">

                                            <div className="tour-price">
                                                <strong>₹{item.price}</strong>
                                                <span>/person</span>
                                            </div>

                                            <Link to={item.link} className="tour-book-btn">
                                                View more

                                                <span>
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
                                                    >
                                                        <path d="M7 7h10v10" />
                                                        <path d="M7 17 17 7" />
                                                    </svg>
                                                </span>
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </SwiperSlide>
                        ))}

                    </Swiper>


                    {/* Exactly 3 Custom Pagination Bars */}
                    <div className="tour-pagination">

                        {navigationIndexes.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`tour-pagination-bullet ${activeDot === index ? "active" : ""
                                    }`}
                                onClick={() => handleNavigation(index)}
                                aria-label={`Go to package position ${index + 1}`}
                            />
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
};

export default TourPackages;
