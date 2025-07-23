// src/components/landing/Navbar.tsx
import React from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-blue-100/90 backdrop-blur border-b border-blue-200 shadow-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-800">PerfEval</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="text-blue-900 hover:text-blue-600 transition-colors font-medium"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/login"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
