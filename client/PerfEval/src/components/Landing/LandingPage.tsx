// src/components/landing/LandingPage.tsx
import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SolutionsSection from "./SolutionsSection";
import ProductsSection from "./ProductsSection";
import PricingSection from "./PricingSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const LandingPage: React.FC = () => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <ProductsSection />
      <PricingSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
