// src/components/landing/HeroSection.tsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "/assets/pexels-artempodrez-5716037.jpg"; // Ensure this path is correct

const HeroSection: React.FC = () => (
  <section
    id="hero"
    className="relative h-[90vh] flex items-center justify-center text-white bg-no-repeat bg-center bg-cover"
    style={{
      backgroundImage: `url(${heroImage})`,
    }}
  >
    {/* Overlay to improve text visibility */}
    <div className="absolute inset-0 bg-black/50" />

    {/* Hero content */}
    <div className="relative z-10 px-6 max-w-4xl text-center space-y-6">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Empower Your Team with <span className="text-blue-300">Performance Insights</span>
      </motion.h1>
      <p className="text-lg md:text-xl text-white/90">
        PerfEval helps you track, review, and elevate employee performance with real-time feedback, analytics, and actionable reports.
      </p>
      <a
        href="/login"
        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
      >
        Get Started
      </a>
    </div>
  </section>
);

export default HeroSection;
