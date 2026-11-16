
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import reviewer from "../../assets/john.svg";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    location: "Chandigarh",
    rating: 4.5,
    review:
      "An absolutely amazing experience! Everything was perfectly planned, from the beautiful destinations to the comfortable stay. The team made our trip smooth, memorable, and stress-free. Can't wait to travel with them again!",
    image: reviewer,
  },
  {
    id: 2,
    name: "Sarah Smith",
    location: "Delhi",
    rating: 5,
    review:
      "A wonderful travel experience! The arrangements were excellent, the destinations were beautiful, and the entire journey was smooth. Highly recommended for anyone planning a Himachal trip!",
    image: reviewer,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    location: "Mumbai",
    rating: 4.5,
    review:
      "Everything was perfectly organised. From the hotel to sightseeing, every detail was taken care of. The team was supportive throughout our journey. Would definitely book again!",
    image: reviewer,
  },
  {
    id: 4,
    name: "Priya Verma",
    location: "Pune",
    rating: 5,
    review:
      "One of the best trips we have ever experienced! Beautiful locations, amazing hospitality, and a very helpful team. Every moment was worth remembering.",
    image: reviewer,
  },
  {
    id: 5,
    name: "Aman Gupta",
    location: "Jaipur",
    rating: 4,
    review:
      "Had an amazing time exploring Himachal. The itinerary was flexible, the stays were comfortable, and the overall experience was fantastic.",
    image: reviewer,
  },
  {
    id: 6,
    name: "Neha Kapoor",
    location: "Bangalore",
    rating: 5,
    review:
      "Everything was seamless from planning to the final day. The team made sure we enjoyed every moment without worrying about anything.",
    image: reviewer,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[12px] md:text-[24px] leading-none ${
            star <= Math.floor(rating)
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

      <div className="relative w-full overflow-hidden bg-[#F6F7F8] rounded-[30px] md:rounded-[40px] py-16 md:py-20 lg:py-[65px]">

        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-4">

          {/* Section Header */}
          <div className="text-center mb-12 md:mb-[60px]">

            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-9 py-2 rounded-full mb-5">
              Reviews
            </span>

            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] font-bold leading-tight text-[#1d2d50] mb-4">
              What Our Travellers Say
            </h2>

            <p className="text-[16px] leading-[1.55] text-[#333333] max-w-[650px] mx-auto">
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
                className={`h-[7px] rounded-full transition-all duration-500 ${
                  Math.floor(activeIndex / 2) === index
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
