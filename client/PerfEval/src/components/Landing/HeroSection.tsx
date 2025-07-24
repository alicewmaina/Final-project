// src/components/landing/HeroSection.tsx

import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Empower Your Team with Performance Insights
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
        PerfEval helps you track, review, and elevate employee performance with real-time feedback, analytics, and actionable reports.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
