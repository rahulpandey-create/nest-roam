
import React, { useEffect } from 'react';
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from './screens/Inc/Navbar';
import Footer from './screens/Inc/Footer';
import Banner from './screens/Banner';
import FindPlace from './screens/FindPlace';
import TrendingDestinations from './screens/TrendingDestinations';
import TourPackages from './screens/TourPackages';
import AdventureExperiences from './screens/AdventureExperiences';
import WhyChooseUs from './screens/WhyChooseUs';
import TravelEnquiry from './screens/TravelEnquiry';
import FloatingContact from './screens/FloatingContact';
import ReviewsSection from './screens/ReviewsSection';
import Manali from './screens/TrendingDestinations/Manali';
import Shimla from './screens/TrendingDestinations/Shimla';
import Kasol from './screens/TrendingDestinations/Kasol';
import Spiti from './screens/TrendingDestinations/Spiti';
import SpitiPackage from './screens/TourPackages/SpitiPackage';
import ShimlaPackage from './screens/TourPackages/ShimlaPackage';
import ManaliPackage from './screens/TourPackages/ManaliPackage';
import KasolPackage from './screens/TourPackages/KasolPackage';
import ScrollToTop from './screens/ScrollToTop';

function Home() {
  return (
    <>
      <Banner/>
      <FindPlace/>
      <TrendingDestinations/>
      <TourPackages/>
      <AdventureExperiences/>
      <WhyChooseUs/>
      <TravelEnquiry/>
      <FloatingContact/>
      <ReviewsSection/>
    </>
  );
}


function App() {

useEffect(() => {

  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 1,
    anchors: true,
  });

  window.lenis = lenis;

  return () => {
    lenis.destroy();
    delete window.lenis;
  };

}, []);


  return (
    <Router>

      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations/manali" element={<Manali />} />
        <Route path="/destinations/shimla" element={<Shimla />} />
        <Route path="/destinations/kasol" element={<Kasol />} />
        <Route path="/destinations/spiti" element={<Spiti />} />

        <Route path="/TourPackages/SpitiPackage" element={<SpitiPackage />} />
        <Route path="/TourPackages/ShimlaPackage" element={<ShimlaPackage />} />
        <Route path="/TourPackages/ManaliPackage" element={<ManaliPackage />} />
        <Route path="/TourPackages/KasolPackage" element={<KasolPackage />} />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;

