
import React from "react";

// Reusable Input Icon
const FieldIcon = ({ type }) => {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <path d="m2 6 10 8 10-8" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    travellers: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[22px] h-[22px] shrink-0 text-[#8fc31f]"
    >
      {paths[type]}
    </svg>
  );
};

const TravelEnquiryForm = ({
  onSubmit,
  buttonText = "Send Enquiry",
  className = "",
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  };

  const inputStyle =
    "w-full bg-transparent outline-none text-[16px] text-[#333] placeholder:text-[#808080]";

  const fieldStyle =
    "flex items-center gap-3 border-b border-[#d6d6d6] pb-2 focus-within:border-[#8fc31f] transition-colors";

  return (
    <form onSubmit={handleSubmit} className={className}>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-7 form-style-font">

        {/* Full Name */}
        <div className={fieldStyle}>
          <FieldIcon type="user" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name*"
            required
            className={inputStyle}
          />
        </div>

        {/* Email */}
        <div className={fieldStyle}>
          <FieldIcon type="email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={inputStyle}
          />
        </div>

        {/* Phone */}
        <div className={fieldStyle}>
          <FieldIcon type="phone" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone*"
            required
            className={inputStyle}
          />
        </div>

        {/* Destination */}
        <div className={fieldStyle}>
          <FieldIcon type="location" />

          <select
            name="destination"
            defaultValue=""
            required
            className={`${inputStyle} cursor-pointer text-[#808080]`}
          >
            <option value="" disabled>
              Preferred Destination
            </option>
            <option value="Manali">Manali</option>
            <option value="Shimla">Shimla</option>
            <option value="Kasol">Kasol</option>
            <option value="Spiti">Spiti Valley</option>
            {/* <option value="Dharamshala">Dharamshala</option>
            <option value="Other">Other</option> */}
          </select>
        </div>

        {/* Travel Date */}
        <div className={fieldStyle}>
          <FieldIcon type="calendar" />
          <input
            type="date"
            name="travelDate"
            required
            className={`${inputStyle} text-[#808080]`}
          />
        </div>

        {/* Travellers */}
        <div className={fieldStyle}>
          <FieldIcon type="travellers" />

          <select
            name="travellers"
            defaultValue=""
            required
            className={`${inputStyle} cursor-pointer text-[#808080]`}
          >
            <option value="" disabled>
              Travellers
            </option>
            <option value="1">1 Traveller</option>
            <option value="2">2 Travellers</option>
            <option value="3-5">3-5 Travellers</option>
            <option value="6-10">6-10 Travellers</option>
            <option value="10+">10+ Travellers</option>
          </select>
        </div>

      </div>

      {/* Message */}
      <div className="mt-8">
        <textarea
          name="message"
          rows="3"
          placeholder="Tell us about your plan, budget or any specific requirement..."
          className="w-full resize-none bg-[#f5f5f5] rounded-[18px] px-5 py-4 text-[15px] md:text-[16px] text-[#333] placeholder:text-[#888] outline-none focus:ring-1 focus:ring-[#8fc31f] transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className=" cursor-pointer submitted mt-7 inline-flex items-center gap-3 bg-[#1d2d50] text-white text-[17px] font-semibold px-9 py-4 rounded-full transition-all duration-300 hover:bg-[#8fc31f] hover:text-[#1d2d50]"
      >
        {buttonText}

        <span className="text-[22px] leading-none">
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
      </button>

    </form>
  );
};

export default TravelEnquiryForm;
