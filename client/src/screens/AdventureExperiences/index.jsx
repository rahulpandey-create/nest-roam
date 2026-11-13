
import React from "react";

import trekking from "../../assets/trekking.png";
import rafting from "../../assets/rafting.png";
import paragliding from "../../assets/paragliding.png";
import camping from "../../assets/camping.png";
import snowactivities from "../../assets/snowactivities.png";

// Custom SVG Icons
import trekkingIcon from "../../assets/trekking.svg";
import raftingIcon from "../../assets/rafting.svg";
import paraglidingIcon from "../../assets/paragliding.svg";
import campingIcon from "../../assets/camping.svg";
import snowIcon from "../../assets/snowactivity.svg";
import adventurebg from "../../assets/adventurebg.png";


const experiences = [
  {
    id: 1,
    title: "Trekking",
    image: trekking,
    type: "trekking",
    large: true,
  },
  {
    id: 2,
    title: "River Rafting",
    image: rafting,
    type: "rafting",
  },
  {
    id: 3,
    title: "Paragliding",
    image: paragliding,
    type: "paragliding",
  },
  {
    id: 4,
    title: "Camping",
    image: camping,
    type: "camping",
  },
  {
    id: 5,
    title: "Snow Activities",
    subtitle: "(Seasonal)",
    image: snowactivities,
    type: "snow",
  },
];

// Experience Icon Component
const ExperienceIcon = ({ type }) => {
  const icons = {
    trekking: trekkingIcon,
    rafting: raftingIcon,
    paragliding: paraglidingIcon,
    camping: campingIcon,
    snow: snowIcon,
  };

  return (
    <img
      src={icons[type]}
      alt={`${type} icon`}
      className="w-7 h-7 md:w-7 md:h-7 shrink-0 object-contain"
    />
  );
};

const AdventureExperiences = () => {
  return (
    <section className="w-full bg-white py-6 md:py-6 px-4 md:px-6 object-cover bg-no-repeat" style={{
              backgroundImage: `url(${adventurebg})`,
            }}>
      <div className="max-w-[1280px] mx-auto p-4">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">

          <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">
            Unforgettable Experiences
          </span>

          <h2 className="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">
            Add-on Adventure Experiences
          </h2>

          <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">
            Add more excitement to your journey with thrilling activities
            <br className="hidden md:block" />
            and unforgettable experiences at every destination.
          </p>

        </div>

        {/* Adventure Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[220px_170px_170px] md:grid-rows-[240px_190px_190px] lg:grid-rows-[250px_250px] gap-3 md:gap-4 lg:gap-5">

          {experiences.map((item) => (

            <div
              key={item.id}
              className={`
                group relative overflow-hidden rounded-[22px] md:rounded-[28px]
                cursor-pointer isolate
                ${
                  item.large
                    ? "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2"
                    : "col-span-1 row-span-1"
                }
              `}
            >

              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center -z-20 transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Card Content */}
              <div
                className={`absolute flex items-center gap-2 md:gap-3 text-white ${
                  item.large
                    ? "left-5 bottom-5 md:left-8 md:bottom-8"
                    : "left-3 bottom-3 md:left-5 md:bottom-5"
                }`}
              >

                {/* Custom SVG Icon */}
                <ExperienceIcon type={item.type} />

                <div>
                  <h3
                    className={`font-bold leading-tight ${
                      item.large
                        ? "text-[19px] md:text-[23px]"
                        : "text-[15px] md:text-[20px]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <span className="block text-[12px] md:text-[14px] font-medium mt-0.5">
                      {item.subtitle}
                    </span>
                  )}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default AdventureExperiences;
