
import React, { useState } from "react";
import { Link } from "react-router-dom";

import nestroamlogo from "../../assets/nestroamlogo.svg";
import whatsapp from "../../assets/whatsapp.svg";
import arrowright from "../../assets/arrowright.svg";

import TravelEnquiryForm from "../components/TravelEnquiryForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Close Navigation Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDestinationOpen(false);
  };

  // Handle Booking Form Submission
  const handleContact = (e) => {
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    console.log("Booking Enquiry:", data);

    setIsBookingOpen(false);
  };

  // Destinations
  const destinations = [
    { name: "Manali", link: "/destinations/manali" },
    { name: "Shimla", link: "/destinations/shimla" },
    { name: "Kasol", link: "/destinations/kasol" },
    { name: "Spiti", link: "/destinations/spiti" },
  ];

  return (
    <>
      <header>
        <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-3 sm:gap-5 bg-[#f8f8f8] sm:bg-transparent">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center mr-auto"
            >
              <img
                src={nestroamlogo}
                alt="Nest Roam Logo"
                className="w-[100px] sm:w-[118px] h-auto "
              />
            </Link>

            {/* Right Buttons */}
            <div className="flex items-center gap-3 md:order-2">

              {/* Book Now */}
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#1A2A4C] text-white py-3 pl-8 pr-7 rounded-[100px] flex items-center gap-3 cursor-pointer"
              >
                Book Now
                <img src={arrowright} alt="" />
              </button>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center w-10 h-10 text-[#1a2a4c] rounded-lg md:hidden hover:bg-white/10 focus:outline-none border"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                )}
              </button>

            </div>

            {/* Navigation Menu */}
            <div
              id="navbar-sticky"
              className={`w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"
                }`}
            >
              <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-normal md:flex-row md:space-x-8 md:mt-0 bg-[#eaeaea] md:bg-transparent rounded-[20px] " > 

                {/* Home */}
                <li className="w-full md:w-auto">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-[#1A2A4C] sm:text-white block py-3 md:py-2 hover:text-[#e0ff98] duration-200 "
                  >
                    Home
                  </Link>
                </li>

                {/* Destinations Dropdown */}
                <li
                  className="relative w-full md:w-auto"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 768) {
                      setIsDestinationOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 768) {
                      setIsDestinationOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setIsDestinationOpen(!isDestinationOpen)
                    }
                    className="text-[#1A2A4C] sm:text-white flex items-center justify-between gap-2 py-3 md:py-2 w-full hover:text-[#e0ff98] duration-200"
                    aria-expanded={isDestinationOpen}
                  >
                    Destinations

                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isDestinationOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Items */}
                  <div
                    className={`md:absolute md:top-full md:left-0 md:pt-3 z-50 w-full md:w-[220px] ${isDestinationOpen ? "block" : "hidden"
                      }`}
                  >
                    <ul className="bg-white rounded-xl shadow-xl p-3 space-y-1">
                      {destinations.map((destination) => (
                        <li key={destination.name}>
                          <Link
                            to={destination.link}
                            onClick={closeMenu}
                            className="bg-gray-100 block px-4 py-3 rounded-lg text-[#1A2A4C] hover:bg-[#8DB828] hover:text-white transition-all duration-300"
                          >
                            {destination.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Tour Package */}
                <li className="w-full md:w-auto">
                  <Link
                    to="/TourPackagesPage"
                    onClick={closeMenu}
                    className="text-[#1A2A4C] sm:text-white block py-3 md:py-2 hover:text-[#e0ff98] duration-200"
                  >
                    Tour Package
                  </Link>
                </li>

                {/* Adventures */}
                <li className="w-full md:w-auto">
                  <Link
                    to="#adventures"
                    onClick={closeMenu}
                    className="text-[#1A2A4C] sm:text-white block py-3 md:py-2 hover:text-[#e0ff98] duration-200"
                  >
                    Adventures
                  </Link>
                </li>

                {/* About Us */}
                <li className="w-full md:w-auto">
                  <Link
                    to="#about"
                    onClick={closeMenu}
                    className="text-[#1A2A4C] sm:text-white block py-3 md:py-2 hover:text-[#e0ff98] duration-200"
                  >
                    About Us
                  </Link>
                </li>

                {/* Contact Us */}
                <li className="w-full md:w-auto">
                  <Link
                    to="/Contact"
                    onClick={closeMenu}
                    className="text-[#1A2A4C] sm:text-white block py-3 md:py-2 hover:text-[#e0ff98] duration-200"
                  >
                    Contact Us
                  </Link>
                </li>

                {/* WhatsApp */}
                <li className="relative mt-3 md:mt-0">
                  <a
                    href="https://wa.me/919988775566"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-6 py-3 rounded-[100px] flex items-center gap-3 text-[#1A2A4C] whitespace-nowrap w-90 md:w-auto"
                  >
                    <img src={whatsapp} alt="WhatsApp" />
                    +91-9988775566
                  </a>

                  <div className="relative">
                    <span className="quicky bg-[#8DB828] absolute right-8 px-3 py-1 rounded-b-[8px] text-white text-[12px]">
                      Quick Call
                    </span>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="relative bg-white w-full max-w-[750px] max-h-[90vh] overflow-y-auto rounded-[25px] p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 text-[#1A2A4C] text-3xl leading-none hover:text-[#8DB828] transition-colors"
              aria-label="Close booking form"
            >
              &times;
            </button>

            {/* Heading */}
            <span className="inline-flex bg-[#8fc31f] text-[#1d2d50] text-sm font-semibold px-6 py-2 rounded-full mb-4">
              Book Your Trip
            </span>

            <h2 className="text-[30px] font-bold text-[#1d2d50] mb-3">
              Let's Plan Your Trip
            </h2>

            <p className="text-[#414141] text-[15px] mb-7">
              Share your travel details and we'll help you plan your perfect getaway.
            </p>

            {/* Reusable Travel Enquiry Form */}
            <TravelEnquiryForm
              onSubmit={handleContact}
              buttonText="Submit Enquiry"
            />

          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;
