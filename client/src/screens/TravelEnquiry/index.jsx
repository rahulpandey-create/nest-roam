
import React, { useState } from "react";

import contactImage from "../../assets/contact.webp";
import TravelEnquiryForm from "../components/TravelEnquiryForm";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const TravelEnquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (isSubmitting) return;

    if (!API_URL) {
      setStatus({
        type: "error",
        message: "API configuration is missing. Please contact us directly.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const formData = new FormData(form);

      const travelDate = formData.get("travelDate");
      const [year, month, day] = travelDate.split("-");

      // Convert frontend date YYYY-MM-DD to backend DD/MM/YYYY
      const formattedDate = `${day}/${month}/${year}`;

      // Map frontend field names to backend field names
      const enquiryData = {
        name: formData.get("fullName").trim(),
        phone: formData.get("phone").trim(),
        email: formData.get("email").trim(),
        destination: formData.get("destination"),
        travelDate: formattedDate,
        travellers: formData.get("travellers"),
        message: formData.get("message").trim(),
      };

      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your enquiry."
        );
      }

      // Reset form only after successful submission
      form.reset();

      setStatus({
        type: "success",
        message: "Your enquiry has been submitted successfully! Our team will contact you soon.",
      });

    } catch (error) {
      console.error("Travel enquiry submission failed:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again later.",
      });

    } finally {
      setIsSubmitting(false);
    }
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
              loading="lazy"
              decoding="async"
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
              isSubmitting={isSubmitting}
              status={status}
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelEnquiry;
