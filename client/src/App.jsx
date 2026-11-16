
import React, { useEffect } from 'react';
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from './screens/Inc/Navbar';
import Footer from './screens/Inc/Footer';
import Banner from './screens/Banner';
import FindPlace from './screens/FindPlace';
import TrendingDestinations from './screens/TrendingDestinations';
import TourPackagesSection from './screens/TourPackagesSection';
import AdventureExperiences from './screens/AdventureExperiences';
import WhyChooseUs from './screens/WhyChooseUs';
import TravelEnquiry from './screens/TravelEnquiry';
import FloatingContact from './screens/FloatingContact';
import ReviewsSection from './screens/ReviewsSection';
import Manali from './screens/TrendingDestinations/Manali';
import Shimla from './screens/TrendingDestinations/Shimla';
import Kasol from './screens/TrendingDestinations/Kasol';
import Spiti from './screens/TrendingDestinations/Spiti';
import SpitiPackage from './screens/TourPackages/Packages/SpitiPackage';
import ShimlaPackage from './screens/TourPackages/Packages/ShimlaPackage';
import ManaliPackage from './screens/TourPackages/Packages/ManaliPackage';
import KasolPackage from './screens/TourPackages/Packages/KasolPackage';
import ScrollToTop from './screens/ScrollToTop';
import TourPackages from './screens/TourPackages';
import Contact from './screens/Contact/index.jsx';

function Home() {
  return (
    <>
      <Banner/>
      <FindPlace/>
      <TrendingDestinations/>
      <TourPackagesSection/>
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

        {/* Destination pages: /destinations/:destinationSlug */}
        <Route path="destinations">
          <Route index element={<TrendingDestinations />} />
          <Route path="manali" element={<Manali />} />
          <Route path="shimla" element={<Shimla />} />
          <Route path="kasol" element={<Kasol />} />
          <Route path="spiti" element={<Spiti />} />
        </Route>

        {/* Tour packages: /tour-packages/:packageSlug */}
        <Route path="tour-packages">
          <Route index element={<TourPackages />} />
          <Route path="manali" element={<ManaliPackage />} />
          <Route path="shimla" element={<ShimlaPackage />} />
          <Route path="spiti" element={<SpitiPackage />} />
          <Route path="kasol" element={<KasolPackage />} />
        </Route>

        <Route path="adventures" element={<AdventureExperiences />} />
        <Route path="about" element={<WhyChooseUs />} />
        <Route path="contact" caseSensitive element={<Contact />} />
        <Route path="Contact" caseSensitive element={<Navigate to="/contact" replace />} />

        {/* Legacy package URLs redirect to the canonical lowercase routes. */}
        <Route path="TourPackagesPage">
          <Route index element={<Navigate to="/tour-packages" replace />} />
          <Route path="ManaliPackage" element={<Navigate to="/tour-packages/manali" replace />} />
          <Route path="ShimlaPackage" element={<Navigate to="/tour-packages/shimla" replace />} />
          <Route path="SpitiPackage" element={<Navigate to="/tour-packages/spiti" replace />} />
          <Route path="KasolPackage" element={<Navigate to="/tour-packages/kasol" replace />} />
        </Route>
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;