
import React from "react";
import {
  MapPin,
  Headset,
  Compass,
  ArrowRight,
  MessageCircle,
  ClipboardList,
  Plane,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import TravelEnquiry from "../TravelEnquiry";

const Contact = () => {
  const features = [
    {
      icon: <Compass size={28} />,
      title: "Personalised Travel Plans",
      description:
        "Every journey is different. Let us help you find a travel experience that matches your interests.",
    },
    {
      icon: <Headset size={28} />,
      title: "Travel Assistance",
      description:
        "Get guidance with your travel plans, destinations and package-related queries.",
    },
    {
      icon: <MapPin size={28} />,
      title: "Explore New Destinations",
      description:
        "Discover beautiful destinations and exciting experiences for your next getaway.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <MessageCircle size={25} />,
      title: "Share Your Plans",
      description:
        "Tell us about your preferred destination, travel dates and requirements.",
    },
    {
      number: "02",
      icon: <ClipboardList size={25} />,
      title: "Get Your Travel Plan",
      description:
        "We help you explore suitable travel packages and experiences.",
    },
    {
      number: "03",
      icon: <Plane size={25} />,
      title: "Get Ready To Explore",
      description:
        "Finalise your travel plans and get ready for your next adventure.",
    },
  ];

  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[550px] flex items-center justify-center overflow-hidden mt-[-150px]">

        <img
          src="/src/assets/manalip.png"
          alt="Beautiful Himalayan mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#101d32]/70"></div>

        <div className="relative z-10 text-center px-5 max-w-[1280px] mx-auto">

          <p className="text-[18px] md:text-[20px] font-light mb-4 text-white mt-20">
            Get In Touch With Nestroam
          </p>

          <h1 className="fontsylegilda leading-tight text-white text-4xl md:text-6xl">
            Let's Plan Your Next Adventure
          </h1>

          <p className="mt-5 max-w-[650px] mx-auto text-[15px] md:text-[17px] font-light leading-relaxed text-white/90">
            Have questions or ready to explore? Connect with us and
            let us help you plan a journey filled with unforgettable memories.
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="#travel-enquiry"
              className="bg-white text-[#1d2d50] px-8 py-3.5 rounded-full font-semibold hover:bg-[#a8db69] transition duration-300 flex items-center gap-2"
            >
              Contact Us <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </section>
{/* Enquiry Form */}
      <section id="travel-enquiry" className="scroll-mt-20">
        <TravelEnquiry />
      </section>

      


      {/* Why Connect With Us */}
      <section className="bg-[#F6F7F8] py-16 md:py-24 px-5 md:px-10 m-5 rounded-[40px]">

        <div className="max-w-[1280px] mx-auto">
          
          <div class="text-center mb-10 md:mb-14"><span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Why Nestroam</span><h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">Let's Make Travel Simple
</h2><p class="text-[16px] leading-[1.55] text-[#414141] font-normal max-w-[650px] mx-auto">We're here to make planning your next getaway easier, smoother and more exciting.

</p></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-7 md:p-9 rounded-[22px] border border-[#eeeeee] hover:shadow-xl transition duration-300 group"
              >

                <div className="w-16 h-16 rounded-2xl bg-[#eff6e3] flex items-center justify-center text-[#719d18] group-hover:bg-[#8fc31f] group-hover:text-[#1d2d50] transition duration-300 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-[#1d2d50] text-xl font-bold mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {item.title}
                </h3>

                <p className="text-[#777] text-sm leading-7">
                  {item.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>
{/* Introduction Section */}
      <section className="py-16 md:py-24 px-5 md:px-10 border-b">

        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          <div>
            <span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[15px] md:text-[16px] font-semibold px-9 py-2 rounded-full mb-5">We're Here To Help</span>
            <h2 class="text-[36px] sm:text-[36px] md:text-[36px] font-bold leading-tight text-[#1d2d50] mb-3">Every Great Journey Starts With A Conversation</h2>
            <p class="text-[16px] leading-[1.55] text-[#414141] max-w-[600px] mb-3">Tell us your travel plans and we’ll get back with the best options for your himachal getaway</p>
            <p class="text-[16px] leading-[1.55] text-[#414141] max-w-[600px] mb-3">Planning a mountain escape, an adventurous road trip or a
              peaceful getaway? We would love to hear about your travel plans.</p>
            <p class="text-[16px] leading-[1.55] text-[#414141] max-w-[600px] ">Reach out to Nestroam and let us help you discover the right destination and create a travel experience worth remembering.</p>
           

           

            <a
              href="#travel-enquiry"
              className="inline-flex items-center gap-2 mt-7 text-[#1d2d50] font-bold hover:text-[#719d18] transition"
            >
              Start Your Journey <ArrowRight size={18} />
            </a>
          </div>

          <div className="relative">
            <img
              src="/src/assets/manalip.png"
              alt="Mountain travel experience"
              className="w-full h-[300px] md:h-[420px] object-cover rounded-[25px]"
            />

            <div className="absolute -bottom-5 left-5 md:-left-5 bg-[#1d2d50] rounded-2xl p-5 md:p-7 max-w-[230px]">
              <Sparkles size={25} className="text-[#fff] mb-3" />

              <h3 className="text-[#fff] text-xl font-bold">
                Your Next Adventure Awaits
              </h3>

              <p className="text-[#fff]/80 text-sm mt-2">
                Let's make your travel dreams a reality.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-5 md:px-10">

        <div className="max-w-[1200px] mx-auto">

         
          <div class="text-center mb-10 md:mb-14"><span class="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-7 py-2.5 rounded-full mb-5">Simple & Easy</span>
          <h2 class="text-[36px] sm:text-[36px] md:text-[36px] leading-tight font-bold text-[#1d2d50] mb-4">How Your Journey Begins</h2>
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {steps.map((step, index) => (
              <div key={index} className="text-center relative">

                <div className="relative w-[85px] h-[85px] rounded-full bg-[#f1f7e7] flex items-center justify-center mx-auto mb-6 text-[#719d18]">

                  {step.icon}

                  <span className="absolute -top-2 -right-2 bg-[#8fc31f] text-[#1d2d50] text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                    {step.number}
                  </span>

                </div>

                <h3 className="text-[#1d2d50] text-xl font-bold mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {step.title}
                </h3>

                <p className="text-[#777] text-sm leading-7 max-w-[320px] mx-auto">
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      


    

    </main>
  );
};

export default Contact;
