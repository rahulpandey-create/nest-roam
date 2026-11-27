
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import amit from "../../assets/amit.webp";
import sunita from "../../assets/sunita.webp";
import rahul from "../../assets/rahul.webp";
import priya from "../../assets/priya.webp";
import aman from "../../assets/aman.webp";
import neha from "../../assets/neha.webp";

const reviews = [
  {
    id: 1,
    name: "Amit Kumar",
    location: "Chandigarh",
    rating: 4.5,
    review:
      "Superb trip! Everything was planed perfect, from hotels to sightseen. The team make our journey so smooth and memrable. We will traveling again soon. Thank so much!",
    image: amit,
  },
  {
    id: 2,
    name: "Sunita Reddy",
    location: "Delhi",
    rating: 5,
    review:
      "Wonderful experince! The booking was excelent, places were beautifull, and our journey was very smooth. Highly recomended to anyone planing Himachal trip!",
    image: sunita,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    location: "Mumbai",
    rating: 4.5,
    review:
      "Everything was perfectly organized. From hotel to site seeing, every detail was took care. The team was very supportif throught our jurney. would defnitly book again!",
    image: rahul,
  },
  {
    id: 4,
    name: "Priya Verma",
    location: "Pune",
    rating: 5,
    review:
      "One of the best trip we ever had! Beutiful location, amazingg hospitaltiy, and very helpfull team. Everything was worth to remember.",
    image: priya,
  },
  {
    id: 5,
    name: "Aman Gupta",
    location: "Jaipur",
    rating: 4,
    review:
      "Had amazing time exploring Himachal. The plan was flexible, the stays were confortable, and experince was fantstic.",
    image: aman,
  },
  {
    id: 6,
    name: "Neha Kapoor",
    location: "Bangalore",
    rating: 5,
    review:
      "Everything was seamless from planing to final day. The team made sure we enjoyed every moment without worry about anythings.",
    image: neha,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[12px] md:text-[24px] leading-none ${star <= Math.floor(rating)
              ? "text-[#ffb400]"
              : "text-[#b8b8b8]"
            }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="w-full px-3 md:px-5 pb-5">

      <div className="relative w-full overflow-hidden bg-[#F6F7F8] rounded-[30px] md:rounded-[40px] py-9 md:py-20 lg:py-[65px]">

        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-4">

          {/* Section Header */}
          <div className="text-center mb-6 md:mb-[60px]">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-6">
              Reviews
            </span>

            <h2 className="text-[32px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50]">
              What Our Travellers Say
            </h2>

            <p className="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto mt-3 md:mt-4">
              Hear from our happy travellers and discover the unforgettable
              <br className="hidden md:block" />
              experiences that make every journey special.
            </p>

          </div>

          {/* Reviews Swiper */}
          <div className="w-full min-w-0 overflow-hidden rounded-[28px]">

            <Swiper
              modules={[Autoplay]}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides={false}
              spaceBetween={20}
              loop={true}
              speed={700}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 22,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 28,
                },
              }}
              className="reviews-swiper !w-full !overflow-hidden"
            >

              {reviews.map((item) => (

                <SwiperSlide key={item.id} className="!h-auto">

                  <div className="group h-full flex flex-col justify-between rounded-[25px] md:rounded-[35px] border px-6 md:px-8 py-7 md:py-8 transition-colors duration-500 bg-white border-[#e5e5e5] text-[#383838] hover:bg-[#1d2d50] hover:border-white/80 hover:text-white">

                    {/* Review Text */}
                    <p className="text-[14px] md:text-[14px] leading-[1.8] italic font-normal mb-5 text-[#444444] group-hover:text-white/90 transition-colors duration-500">
                      “{item.review}”
                    </p>

                    {/* Divider */}
                    <div className="w-full border-t mb-5 border-[#d6d6d6] group-hover:border-white/70 transition-colors duration-500" />

                    {/* Reviewer Details */}
                    <div className="flex items-center justify-between gap-3">

                      {/* Profile */}
                      <div className="flex items-center gap-3 min-w-0">

                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-[50px] h-[50px] rounded-full border border-[#dddddd] object-cover shrink-0"
                        />

                        <div className="min-w-0">

                          <h3 className="text-[14px] md:text-[20px] font-bold leading-tight whitespace-nowrap text-[#303030] group-hover:text-white transition-colors duration-500">
                            {item.name}
                          </h3>

                          <p className="text-[14px] md:text-[16px] mt-1 text-[#777777] group-hover:text-white/85 transition-colors duration-500">
                            {item.location}
                          </p>

                        </div>

                      </div>

                      {/* Rating */}
                      <div className="border-l pl-4 md:pl-6 shrink-0 border-[#d6d6d6] group-hover:border-white/70 transition-colors duration-500">

                        <StarRating rating={item.rating} />

                        <p className="text-[14px] md:text-[16px] mt-2 text-[#666666] group-hover:text-white transition-colors duration-500">
                          Ratings {item.rating}
                        </p>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          </div>

          {/* Custom Pagination - 3 Bars */}
          <div className="flex items-center justify-center gap-2 mt-10">

            {[0, 1, 2].map((index) => (

              <button
                key={index}
                onClick={() => swiperInstance?.slideToLoop(index * 2)}
                aria-label={`Go to review group ${index + 1}`}
                className={`h-[7px] rounded-full transition-all duration-500 ${Math.floor(activeIndex / 2) === index
                    ? "w-[50px] bg-[#1d2d50]"
                    : "w-[50px] bg-[#d9d9d9] hover:bg-[#1d2d50]"
                  }`}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ReviewsSection;
