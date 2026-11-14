
import React from "react";
import { Link } from "react-router-dom";
import {
    CalendarDays,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";

import manalip from "../../assets/manalip.png";
import shimlap from "../../assets/shimlap.png";
import spitip from "../../assets/spitip.png";

const packages = [
    {
        id: 1,
        title: "Manali Mountain Escape",
        image: manalip,
        badge: "Most Popular",
        duration: "5 Nights | 6 Days",
        location: "Manali, Himachal Pradesh",
        price: "₹16,999",
        description:
            "Experience the beauty of Manali with breathtaking mountain views and unforgettable adventures.",
        link: "/TourPackagesPage/ManaliPackage",
    },
    {
        id: 2,
        title: "Shimla & Kufri Retreat",
        image: shimlap,
        badge: "Explore Shimla",
        duration: "3 Nights | 4 Days",
        location: "Shimla, Himachal Pradesh",
        price: "₹12,999",
        description:
            "Discover the charm of Shimla, scenic valleys, beautiful landscapes and the magic of Kufri.",
        link: "/TourPackagesPage/ShimlaPackage",
    },
    {
        id: 3,
        title: "Spiti Valley Expedition",
        image: spitip,
        badge: "Adventure Trip",
        duration: "7 Nights | 8 Days",
        location: "Spiti Valley, Himachal Pradesh",
        price: "₹16,999",
        description:
            "Explore the rugged mountains, ancient monasteries and stunning landscapes of Spiti Valley.",
        link: "/TourPackagesPage/SpitiPackage",
    },
    {
        id: 4,
        title: "Kasol Valley Getaway",
        image: shimlap,
        badge: "Trending",
        duration: "3 Nights | 4 Days",
        location: "Kasol, Himachal Pradesh",
        price: "₹9,999",
        description:
            "Enjoy peaceful riverside views, mountain trails and the relaxing vibes of Kasol.",
        link: "/TourPackagesPage/KasolPackage",
    },
];

const TourPackagesPage = () => {

    const scrollToPackages = () => {
        document.getElementById("all-packages")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <main className="bg-white">

                {/* Hero Section */}
                <section className="relative min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[-150px]">

                    <img
                        src={manalip}
                        alt="Himachal Pradesh mountains"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#101d32]/65"></div>

                    <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto">

                        <p className="text-[20px] font-light mb-3 md:mb-1 text-white mt-20">
                            Explore With Nestroam
                        </p>

                        <h1 className="fontsylegilda leading-12.5 sm:leading-normal text-white">
                            Explore Our Tour Packages
                        </h1>

                        <p className="mt-3 md:mt-1 max-w-xl mx-auto text-[16px] font-light leading-relaxed text-white/90 text-center">
                            Discover beautiful destinations, exciting adventures and
                            unforgettable journeys with our exclusive travel experiences.
                        </p>

                        <div className="flex justify-center mt-7">
                            <button
                                type="button"
                                onClick={scrollToPackages}
                                className="bg-white text-[#1d2d50] px-7 py-3 rounded-full font-semibold hover:bg-[#a8db69] transition duration-300 flex items-center gap-2"
                            >
                                Explore Packages
                                <ArrowRight size={18} />
                            </button>
                        </div>

                    </div>
                </section>


                {/* Package Listing Section */}
                <section
                    id="all-packages"
                    className="py-12 md:py-14 px-5 md:px-10 bg-[#f5f6f7] scroll-mt-20"
                >

                    <div className="max-w-[1280px] mx-auto px-0 md:px-4">

                        {/* Section Heading */}

                        <div className="text-center mb-10 md:mb-14">

                            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
                                Popular Package
                            </span>

                            <h2 className="text-[30px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                                Our Exclusive Tour Packages
                            </h2>

                            <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                                Explore handpicked travel packages for unforgettable journeys and lasting memories.
                            </p>

                        </div>


                        {/* Package Grid */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                            {packages.map((item) => (

                                <div
                                    key={item.id}
                                    className="group bg-white rounded-[40px] p-[18px] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
                                >

                                    {/* Image */}

                                    <div className="tour-card-image relative h-[300px] lg:h-[390px] overflow-hidden rounded-[32px]">

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className=""
                                        />

                                        {/* Badge */}

                                        {item.badge && (
                                            <span className="absolute top-[50px] left-0 bg-white text-[#1d2d50] text-[16px] md:text-[18px] font-semibold px-8 py-4 rounded-r-full">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>


                                    {/* Card Content */}

                                    <div className="px-2 pt-7 pb-4">

                                        {/* Title */}

                                        <h3 className="text-[#1d2d50] text-[22px] md:text-[25px] font-bold leading-tight mb-5 group-hover:text-[#719d18] transition-colors" style={{ fontSize: '24px', fontWeight: 600 }}>
                                            {item.title}
                                        </h3>


                                        {/* Duration */}

                                        <div className="flex items-center gap-3 text-[#888888] text-[16px] md:text-[17px] mb-10">

                                            <CalendarDays
                                                size={21}
                                                strokeWidth={1.8}
                                                className="text-[#8fc31f] shrink-0"
                                            />

                                            <span>{item.duration}</span>

                                        </div>


                                        {/* Divider + Price + Button */}

                                        <div className="border-t border-[#d8d8d8] pt-4">

                                            <div className="flex items-center justify-between gap-3">

                                                {/* Price */}

                                                <div className="flex items-baseline flex-wrap gap-0 min-w-0">

                                                    <span className="text-[#8fc31f] text-[23px] md:text-[27px] font-bold whitespace-nowrap">
                                                        {item.price}
                                                    </span>

                                                    <span className="text-[#999999] text-[15px] md:text-[16px] whitespace-nowrap">
                                                        /person
                                                    </span>

                                                </div>


                                                {/* View More Button */}

                                                <Link
                                                    to={item.link}
                                                    className="tour-book-btn"
                                                >
                                                    View more

                                                    <ArrowUpRight
                                                        size={24}
                                                        strokeWidth={2}
                                                    />

                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                

            </main>
        </>
    );
};

export default TourPackagesPage;
