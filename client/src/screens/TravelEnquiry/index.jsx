
import React from "react";

import contactImage from "../../assets/contact.jpg";
import TravelEnquiryForm from "../components/TravelEnquiryForm";

const TravelEnquiry = () => {

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);

    const enquiryData = Object.fromEntries(formData.entries());

    console.log("Travel Enquiry:", enquiryData);

    // Connect your enquiry API here.
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">

      <div className="max-w-[1280px] mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11 items-center">

          {/* Left Image */}
          <div className="w-full h-[350px] sm:h-[450px] lg:h-[640px] overflow-hidden rounded-[25px] md:rounded-[32px]">

            <img
              src={contactImage}
              alt="Beautiful Himalayan mountain landscape"
              className="w-full h-full object-cover object-left"
            />

          </div>

          {/* Right Content */}
          <div className="w-full">

            {/* Badge */}
            <span className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[15px] md:text-[16px] font-semibold px-9 py-2 rounded-full mb-5">
              Get In Touch
            </span>

            {/* Heading */}
            <h2 className="text-[36px] sm:text-[36px] md:text-[36px] font-bold leading-tight text-[#1d2d50] mb-3">
              Let’s Plan Your Trip
            </h2>

            {/* Description */}
            <p className="text-[16px] leading-[1.55] text-[#414141] max-w-[600px] mb-7">
              Tell us your travel plans and we’ll get back with the best
              options <br /> for your himachal getaway
            </p>

            {/* Reusable Form */}
            <TravelEnquiryForm
              onSubmit={handleSubmit}
              buttonText="Send Enquiry"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default TravelEnquiry;
