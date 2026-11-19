import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";

const destinations = [
  "Manali",
  "Shimla",
  "Kasol",
  "Spiti Valley",
];

const FindPlace = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showTravellers, setShowTravellers] = useState(false);

  const dateInputRef = useRef(null);
  const destinationRef = useRef(null);
  const travellersRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setShowDestinations(false);
      }

      if (
        travellersRef.current &&
        !travellersRef.current.contains(event.target)
      ) {
        setShowTravellers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenDatePicker = () => {
    setShowDestinations(false);
    setShowTravellers(false);

    const input = dateInputRef.current;
    if (!input) return;

    try {
      input.showPicker();
    } catch {
      input.focus();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (travelDate) params.set("date", travelDate);
    if (travellers) params.set("travellers", String(travellers));

    const query = params.toString();
    navigate(query ? `/tour-packages?${query}` : "/tour-packages");
  };

  return (
    <section className="w-full bg-white py-8 md:py-10 form-style border-b-1 border-[#D9D9D9]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 xl:px-4">

        {/* Heading */}
        <h2 className="text-[32px] md:text-[32px] font-bold text-[#1d2d50] mb-5 md:mb-8">
          Find Your Place
        </h2>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {/* Destination */}
          <div ref={destinationRef} className="relative">
            <button
              onClick={() => {
                setShowDestinations(!showDestinations);
                setShowTravellers(false);
              }}
              className="w-full h-[54px] md:h-[64px] bg-[#f3f4f6] rounded-full px-8 flex items-center gap-3 text-left hover:bg-[#ebedf0] transition"
            >
              <MapPin size={28} strokeWidth={1.5} className="text-[#1d2d50] shrink-0" />

              <span className="flex-1 text-[16px] text-[#333] truncate">
                {destination || "Select Destination"}
              </span>

              <ChevronDown size={22} className="text-[#1d2d50] shrink-0" />
            </button>

            {showDestinations && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-xl rounded-2xl z-20 py-2 border border-gray-100">
                {destinations.map((place) => (
                  <button
                    key={place}
                    onClick={() => {
                      setDestination(place);
                      setShowDestinations(false);
                    }}
                    className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 transition border-b-1 border-[#D9D9D9] border-dashed"
                  >
                    {place}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Travel Date */}
          <div
            onClick={handleOpenDatePicker}
            className="relative h-[54px] md:h-[64px] bg-[#f3f4f6] rounded-full px-8 flex items-center gap-3 cursor-pointer hover:bg-[#ebedf0] transition"
          >
            <CalendarDays
              size={28}
              strokeWidth={1.5}
              className="text-[#1d2d50] shrink-0"
            />

            <input
              ref={dateInputRef}
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full min-w-0 bg-transparent text-[16px] text-[#333] outline-none cursor-pointer"
              aria-label="Travel Date"
            />
          </div>

          {/* Travellers */}
          <div ref={travellersRef} className="relative">
            <button
              onClick={() => {
                setShowTravellers(!showTravellers);
                setShowDestinations(false);
              }}
              className="w-full h-[54px] md:h-[64px] bg-[#f3f4f6] rounded-full px-8 flex items-center gap-3 text-left hover:bg-[#ebedf0] transition"
            >
              <Users
                size={28}
                strokeWidth={1.5}
                className="text-[#1d2d50] shrink-0"
              />

              <span className="flex-1 text-[16px] text-[#333]">
                {travellers} Travellers
              </span>

              <ChevronDown size={22} className="text-[#1d2d50] shrink-0" />
            </button>

            {showTravellers && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-xl rounded-2xl p-5 z-20 border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-800">
                    Travellers
                  </span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setTravellers(Math.max(1, travellers - 1))
                      }
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold">{travellers}</span>

                    <button
                      onClick={() =>
                        setTravellers(Math.min(50, travellers + 1))
                      }
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowTravellers(false)}
                  className="mt-5 w-full bg-[#1d2d50] text-white rounded-full py-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="h-[54px] md:h-[64px] mt-4 md:mt-0 rounded-full border-[1.5px] border-[#1d2d50] flex items-center justify-center gap-3 text-[16px] md:text-[16px] text-[#333] hover:bg-[#1d2d50] hover:text-white transition-all duration-300"
          >
            <Search size={28} strokeWidth={1.5} />
            <span>Search Packages</span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default FindPlace;