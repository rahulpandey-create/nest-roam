
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
import TourPackagesection from './screens/TourPackagesection';
import AdventureExperiences from './screens/AdventureExperiences';
import WhyChooseUs from './screens/WhyChooseUs';
import TravelEnquiry from './screens/TravelEnquiry';
import FloatingContact from './screens/FloatingContact';
import ReviewsSection from './screens/ReviewsSection';
import Manali from './screens/TrendingDestinations/Manali';
import Shimla from './screens/TrendingDestinations/Shimla';
import Kasol from './screens/TrendingDestinations/Kasol';
import Spiti from './screens/TrendingDestinations/Spiti';
import SpitiPackage from './screens/TourPackagesPage/Packages/SpitiPackage';
import ShimlaPackage from './screens/TourPackagesPage/Packages/ShimlaPackage';
import ManaliPackage from './screens/TourPackagesPage/Packages/ManaliPackage';
import KasolPackage from './screens/TourPackagesPage/Packages/KasolPackage';
import ScrollToTop from './screens/ScrollToTop';
import TourPackages from './screens/TourPackagesPage';
import Contact from './screens/contact';

function Home() {
  return (
    <>
      <Banner/>
      <FindPlace/>
      <TrendingDestinations/>
      <TourPackagesection/>
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

<Route path="/TourPackagesPage/SpitiPackage" element={<SpitiPackage />} />
<Route path="/TourPackagesPage/ShimlaPackage" element={<ShimlaPackage />} />
<Route path="/TourPackagesPage/ManaliPackage" element={<ManaliPackage />} />
<Route path="/TourPackagesPage/KasolPackage" element={<KasolPackage />} />
<Route path="/TourPackagesPage" element={<TourPackages />} />
<Route path="/Contact" element={<Contact />} />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;

