// src/components/landing/Footer.tsx
import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-100 py-6">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600">PerfEval</span>
        <span className="text-gray-400">© {new Date().getFullYear()}</span>
      </div>

    </div>
  </footer>
);

export default Footer;
