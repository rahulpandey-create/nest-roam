
import React, { useEffect } from 'react';
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import AdventurePage from './screens/AdventurePage';
import About from './screens/About';
import SEO from './seo/SEO';
import NotFound from './screens/NotFound';
import DynamicPackage from './screens/TourPackages/DynamicPackage';
import AdminLogin from './admin/AdminLogin';
import AdminGuard from './admin/AdminGuard';
import AdminLayout from './admin/AdminLayout';
import PackageList from './admin/PackageList';
import PackageEditor from './admin/PackageEditor';
import BlogList from './admin/BlogList';
import BlogEditor from './admin/BlogEditor';
import BlogIndex from './screens/Blogs/BlogIndex';
import BlogArticle from './screens/Blogs/BlogArticle';
import McleodGanj from './screens/TrendingDestinations/McleodGanj';
import Dharamshala from './screens/TrendingDestinations/Dharamshala';

function Home() {
  return (
    <>
      <Banner />
      <FindPlace />
      <TrendingDestinations />
      <TourPackagesSection />
      <AdventureExperiences />
      <WhyChooseUs />
      <TravelEnquiry />
      <FloatingContact />
      <ReviewsSection />
    </>
  );
}


export function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminPath) return undefined;

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

  }, [isAdminPath]);


  return (
    <>
      <SEO />
      <ScrollToTop />

      {!isAdminPath && <Navbar />}

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/packages" replace />} />
            <Route path="packages" element={<PackageList />} />
            <Route path="packages/new" element={<PackageEditor />} />
            <Route path="packages/:id" element={<PackageEditor />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/:id" element={<BlogEditor />} />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogIndex />} />
        <Route path="/blogs/:slug" element={<BlogArticle />} />

        {/* Destination pages: /destinations/:destinationSlug */}
        <Route path="destinations">
          <Route index element={<TrendingDestinations asPage />} />
          <Route path="manali" element={<Manali />} />
          <Route path="shimla" element={<Shimla />} />
          <Route path="kasol" element={<Kasol />} />
          <Route path="spiti" element={<Spiti />} />
          <Route path="mcleod-ganj" element={<McleodGanj />} />
          <Route path="dharamshala" element={<Dharamshala />} />
          <Route path="mcleod-ganj" element={<Navigate to="/destinations/mcleod-ganj" replace />} />
          <Route path="dharamshala" element={<Navigate to="/destinations/dharamshala" replace />} />
        </Route>

        {/* Tour packages: /tour-packages/:packageSlug */}
        <Route path="tour-packages">
          <Route index element={<TourPackages />} />
          <Route path="manali" element={<ManaliPackage />} />
          <Route path="shimla" element={<ShimlaPackage />} />
          <Route path="spiti" element={<SpitiPackage />} />
          <Route path="kasol" element={<KasolPackage />} />
        </Route>
        <Route path="tour-packages/:slug" element={<DynamicPackage />} />

        <Route path="/AdventurePage" caseSensitive element={<Navigate to="/adventure" replace />} />
        <Route path="/adventure" caseSensitive element={<AdventurePage />} />
        <Route path="/adventures" caseSensitive element={<Navigate to="/adventure" replace />} />
        <Route path="/about" caseSensitive element={<About />} />
        <Route path="/contact" caseSensitive element={<Contact />} />
        <Route path="/Contact" caseSensitive element={<Navigate to="/contact" replace />} />

        {/* Legacy package URLs redirect to the canonical lowercase routes. */}
        <Route path="TourPackagesPage">
          <Route index element={<Navigate to="/tour-packages" replace />} />
          <Route path="ManaliPackage" element={<Navigate to="/tour-packages/manali" replace />} />
          <Route path="ShimlaPackage" element={<Navigate to="/tour-packages/shimla" replace />} />
          <Route path="SpitiPackage" element={<Navigate to="/tour-packages/spiti" replace />} />
          <Route path="KasolPackage" element={<Navigate to="/tour-packages/kasol" replace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>);
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;