import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarDays, ArrowUpRight } from "lucide-react";

import manalip from "../../assets/manalip.webp";
import shimlap from "../../assets/shimlap.webp";
import spitip from "../../assets/spitip.webp";
import { API } from "../../admin/adminApi";

const fallbackPackages = [
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
        link: "/tour-packages/manali",
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
        link: "/tour-packages/shimla",
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
        link: "/tour-packages/spiti",
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
        link: "/tour-packages/kasol",
    },
    {
        id: 5,
        title: "Shimla Kufri Kullu Manali Kasol",
        image: shimlap,
        badge: "6N / 7D Special",
        duration: "6 Nights | 7 Days",
        location: "Shimla, Kufri, Kullu, Manali & Kasol",
        price: "₹13,900",
        description:
            "Explore Shimla, Kufri, Kullu, Manali and Kasol on a 7-day Himalayan journey featuring scenic valleys and mountain sightseeing.",
        link: "/tour-packages/kasol",
    },
];

const TourPackages = () => {
    const [packages, setPackages] = useState(fallbackPackages);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let active = true;
        fetch(`${API}/api/packages`)
            .then((response) => response.ok ? response.json() : Promise.reject(new Error("Package API unavailable")))
            .then((data) => {
                if (!active || !Array.isArray(data.packages) || data.packages.length === 0) return;
                const managedPackages = data.packages.map((item) => ({
                    id: `managed-${item.id}`,
                    slug: item.slug,
                    title: item.title,
                    image: item.cover_image?.startsWith("http") ? item.cover_image : `${API}${item.cover_image}`,
                    badge: item.is_featured ? "Featured" : "",
                    duration: item.duration || "Flexible duration",
                    location: item.destination || "",
                    price: item.price !== null && item.price !== undefined && item.price !== ""
                        ? `₹${Number(item.price).toLocaleString("en-IN")}`
                        : null,
                    priceLabel: item.price_label || "per person",
                    description: item.short_description || item.description || "",
                    link: `/tour-packages/${item.slug}`,
                }));
                const managedSlugs = new Set(managedPackages.map((item) => item.slug));
                setPackages([
                    ...fallbackPackages.filter((item) => !managedSlugs.has(item.link.split("/").pop())),
                    ...managedPackages,
                ]);
            })
            .catch(() => {});
        return () => { active = false; };
    }, []);

    const selectedDestination = searchParams.get("destination") || "";
    const selectedDate = searchParams.get("date") || "";
    const selectedTravellers = searchParams.get("travellers") || "";

    const hasFilters = Boolean(
        selectedDestination || selectedDate || selectedTravellers
    );

    const filteredPackages = packages.filter((item) => {
        if (!selectedDestination) return true;
        const query = selectedDestination.toLowerCase();
        return (
            item.location.toLowerCase().includes(query) ||
            item.title.toLowerCase().includes(query)
        );
    });

    useEffect(() => {
        if (hasFilters) {
            document.getElementById("all-packages")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [hasFilters, selectedDestination, selectedDate, selectedTravellers]);

    const scrollToPackages = () => {
        document.getElementById("all-packages")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <main className="bg-white">

            {/* Hero Section */}
            <section className="relative min-h-[350px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[0px] md:mt-[-150px] pb-[50px] md:pb-[0px]">

                <img
                    src={manalip}
                    alt="Himachal Pradesh mountains"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-[#101d32]/65"></div>

                <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto">

                    <p className="text-[20px] font-light mb-3 md:mb-1 text-white mt-12 md:mt-20">
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
                            className="btn-font group inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-white px-8 py-4 text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-[16px] font-medium"
                        >
                            Explore Packages

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

            {/* Package Listing Section */}
            <section
                id="all-packages"
                className="py-12 md:py-14 px-5 md:px-10 bg-[#f5f6f7] scroll-mt-20"
            >

                <div className="max-w-[1280px] mx-auto px-0 md:px-4">

                    {/* Section Heading */}
                    <div className="text-center mb-10 md:mb-14">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
                            Popular Package
                        </span>

                        <h2 className="text-[30px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            Our Exclusive Tour Packages
                        </h2>

                        <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Explore handpicked travel packages for unforgettable journeys and lasting memories.
                        </p>

                    </div>

                    {/* Active Search Summary */}
                    {hasFilters && (
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 border border-gray-200">
                            <div className="flex flex-wrap items-center gap-3 text-[15px] text-[#1d2d50]">
                                <span className="font-semibold">
                                    Showing {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"}
                                </span>
                                {selectedDestination && (
                                    <span className="bg-[#f3f4f6] px-3 py-1 rounded-full">
                                        Destination: {selectedDestination}
                                    </span>
                                )}
                                {selectedDate && (
                                    <span className="bg-[#f3f4f6] px-3 py-1 rounded-full">
                                        Date: {selectedDate}
                                    </span>
                                )}
                                {selectedTravellers && (
                                    <span className="bg-[#f3f4f6] px-3 py-1 rounded-full">
                                        Travellers: {selectedTravellers}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setSearchParams({})}
                                className="text-[14px] font-semibold text-[#1d2d50] underline hover:text-[#719d18] transition cursor-pointer"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Package Grid */}
                    {filteredPackages.length === 0 ? (
                        <div className="bg-white rounded-[32px] p-10 text-center">
                            <p className="text-[18px] text-[#1d2d50] font-semibold mb-3">
                                No packages found for "{selectedDestination}".
                            </p>
                            <button
                                type="button"
                                onClick={() => setSearchParams({})}
                                className="bg-[#1d2d50] text-white px-6 py-2.5 rounded-full text-[15px] font-medium hover:opacity-90 transition cursor-pointer"
                            >
                                Show All Packages
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                            {filteredPackages.map((item) => (

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
                                            <span className="absolute top-[20px] md:top-[50px] left-0 bg-white text-[#1d2d50] text-[16px] md:text-[18px] font-semibold px-8 py-2 md:py-4 rounded-r-full">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>

                                    {/* Card Content */}
                                    <div className="px-2 pt-7 pb-4">

                                        {/* Title */}
                                        <h3
                                            className="text-[#1d2d50] text-[22px] md:text-[25px] font-bold leading-tight mb-5 group-hover:text-[#719d18] transition-colors"
                                            style={{ fontSize: "24px", fontWeight: 600 }}
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Duration */}
                                        <div className="flex items-center gap-3 text-[#888888] text-[16px] md:text-[17px] mb-6 md:mb-10">

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

                                                    {item.price !== null && item.price !== undefined && item.price !== "" ? (
                                                        <>
                                                            <span className="text-[#8fc31f] text-[23px] md:text-[27px] font-bold whitespace-nowrap">
                                                                {item.price}
                                                            </span>
                                                            <span className="text-[#999999] text-[15px] md:text-[16px] whitespace-nowrap">
                                                                /{(item.priceLabel || "per person").replace(/^per\s*/i, "")}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-[#8fc31f] text-[20px] md:text-[23px] font-bold">
                                                            Price on request
                                                        </span>
                                                    )}

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
                    )}

                </div>

            </section>

        </main>
    );
};

export default TourPackages;