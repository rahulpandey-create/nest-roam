import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingContact = () => {
  const phoneNumber = "9671773155";

  return (
    <div className="fixed bottom-6 right-5 z-[9999] flex flex-col gap-3">

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=Hi!%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20more%20information.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <FaWhatsapp size={29} />
      </a>

      {/* Call Button */}
      <a
        href={`tel:+91 ${phoneNumber}`}
        aria-label="Call us"
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <FaPhoneAlt size={23} />
      </a>

    </div>
  );
};

export default FloatingContact;
