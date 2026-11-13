
import React from "react";

// Feature Icons - Replace with your own PNG / SVG images
import teamIcon from "../../assets/team.svg";
import safetyIcon from "../../assets/safety.svg";
import flexibleIcon from "../../assets/flexible.svg";
import supportIcon from "../../assets/support.svg";

const features = [
    {
        id: 1,
        title: "Experienced Team",
        description: "Local experts for a smooth trip",
        image: teamIcon,
    },
    {
        id: 2,
        title: "Safety First",
        description: (
            <>
                Trusted partners & verified <br />operators
            </>
        ),
        image: safetyIcon,
    },
    {
        id: 3,
        title: "Flexible Plans",
        description: (
            <>
                Customisable itineraries <br />for every traveller
            </>
        ),
        image: flexibleIcon,
    },
    {
        id: 4,
        title: "End-to-End Support",
        description:
            (
                <>
                    From planning to your return, <br />we’re with you
                </>
            ),
        image: supportIcon,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="w-full px-3 md:px-5">
            <div className="relative overflow-hidden bg-[#F6F7F8] rounded-[30px] md:rounded-[40px] pt-9 pb-15 ">

                {/* Decorative Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#ffffff 0.7px, transparent 0.7px)",
                        backgroundSize: "12px 12px",
                        maskImage:
                            "linear-gradient(to bottom, transparent 35%, black 100%)",
                    }}
                />

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-4">

                    {/* Section Header */}
                    <div className="text-center mb-10 md:mb-10">

                        <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] md:text-[14px] font-semibold px-8 py-2 rounded-full mb-5">
                            Why Choose Us
                        </span>

                        <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
                            Making Every Journey Special
                        </h2>

                        <p className="text-[16px] md:text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
                            Explore handpicked travel packages for unforgettable
                            <br className="hidden md:block" />
                            journeys and lasting memories.
                        </p>

                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

                        {features.map((item) => (
                            <div
                                key={item.id}
                                className="group relative shadow-[0_20px_20px_0_#00000012] flex flex-col items-center justify-center text-center bg-white border border-[#e5e5e5] rounded-[28px] md:rounded-[28px] px-5 py-8 md:py-9 transition-all duration-500 hover:-translate-y-2"
                            >

                                {/* Custom Image Icon */}
                                <div className="mb-5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-[52px] h-[52px] object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-[20px] md:text-[22px] font-semibold leading-tight text-[#1d2d50] mb-3"
                                    style={{ fontWeight: 600 }}
                                >
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[15px] md:text-[15px] leading-[1.5] text-[#414141] max-w-[300px]">
                                    {item.description}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
