
import React from "react";
import { Link } from "react-router-dom";
import footerlogo from '../../assets/footerlogo.png';
import footerbg from '../../assets/footerbg.png';
import FloatingContact from "../FloatingContact";

const Footer = () => {

  // QUICK LINKS - Change the "to" path according to your pages
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Destinations", to: "/destinations" },
    { label: "Tour Packages", to: "/TourPackagesPage" },
    { label: "Adventures", to: "/adventures" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  // ADVENTURE ACTIVITIES - Set a separate link for each activity
  const activities = [
    { label: "Trekking", to: "/adventures" },
    { label: "River Rafting", to: "/adventures" },
    { label: "Paragliding", to: "/adventures" },
    { label: "Camping", to: "/adventures" },
    { label: "Snow Activities", to: "/adventures" },
    { label: "Custom Adventures", to: "/adventures" },
  ];

  // SOCIAL MEDIA - Add your external social media URLs here
  const socialLinks = [
    { label: "Facebook", href: "", icon: <FacebookIcon /> },
    { label: "Instagram", href: "", icon: <InstagramIcon /> },
    { label: "YouTube", href: "", icon: <YoutubeIcon /> },
  ];

  // CONTACT DETAILS - Change phone and email here
  const phone = "+919988775566";
  const displayPhone = "+91 - 9988775566";
  const email = "info@nestroamholidays.com";

  return (
    <footer className="relative overflow-hidden bg-[#121f3b] text-white">

      {/* Mountain Background */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-55"
        style={{
          backgroundImage: `url(${footerbg})`,
        }}
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#121f3b]/95 via-[#121f3b]/85 to-[#121f3b]/40" /> */}

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 md:px-10 xl:px-14">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_1.05fr] xl:gap-0 xl:py-[92px]">

          {/* Brand Section */}
          <div className="xl:pr-8">
            <div className="mb-10 flex items-center gap-4">
              <img
                src={footerlogo}
                alt="Nestroam Holidays"
              />
            </div>

            <p className="max-w-[540px] text-[16px] leading-[1.5] text-white/90 font-light">
              Making every journey memorable with unforgettable
              destinations, seamless travel experiences, and
              memories that last a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div className="border-white/35 md:border-l md:pl-10 xl:border-l xl:px-8">

            <h3 className="mb-6 text-[20px] font-semibold" style={{ fontSize: "20px" }}>
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-[16px] text-white/85 transition-all duration-300 hover:pl-2 hover:text-[#8fc31f]"
                    style={{ fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Adventure Activities */}
          <div className="border-white/35 md:border-l md:pl-10 xl:border-l xl:px-8">

            <h3 className="mb-6 text-[20px] font-semibold" style={{ fontSize: "20px" }}>
              Adventure Activities
            </h3>

            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index}>
                  <Link
                    to={activity.to}
                    className="text-[16px] text-white/85 transition-all duration-300 hover:pl-2 hover:text-[#8fc31f]"
                    style={{ fontWeight: 300 }}
                  >
                    {activity.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact Section */}
          <div className="border-white/35 md:border-l md:pl-8 xl:border-l xl:pl-8">

            <h3 className="mb-8 text-[20px] font-semibold" style={{ fontSize: "20px" }}>
              Get In Touch
            </h3>

            <div className="space-y-5">

              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 text-[18px] text-white/85 transition hover:text-[#8fc31f]"
              >
                <PhoneIcon />
                {displayPhone}
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-[16px] text-white/85 transition hover:text-[#8fc31f] break-all"
              >
                <MailIcon />
                {email}
              </a>

            </div>

            {/* Social Media */}
            <div className="mt-20 flex flex-wrap items-center gap-5">

              <h3 className="text-[25px] font-semibold">
                Follow Us :
              </h3>

              <div className="flex items-center gap-5 text-[#8fc31f]">

                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="transition hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="fontgoogle flex flex-col justify-between gap-5 border-t border-white/40 py-8 text-[16px] text-white/95 md:flex-row md:items-center md:text-[18px]">

          <p>
            © 2026 NESTROAM, Powered by React JS
          </p>

          <div className="flex flex-wrap gap-x-2 gap-y-2">

            <Link to="/terms-and-conditions" className="hover:text-[#8fc31f]">
              Terms & Condition
            </Link>

            <span>|</span>

            <Link to="/cancellation-policy" className="hover:text-[#8fc31f]">
              Cancellation Policy
            </Link>

            <span>|</span>

            <Link to="/privacy-policy" className="hover:text-[#8fc31f]">
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

      <FloatingContact />

    </footer>
  );
};


/* Inline SVG Icons */

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L9.05 10.9a16 16 0 0 0 4.05 4.05l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69a2 2 0 0 1 1.72 2Z" />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 7 9-7" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="28" height="34" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8h3.4Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="36" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

export default Footer;
