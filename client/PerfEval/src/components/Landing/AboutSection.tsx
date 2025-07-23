// src/components/landing/AboutSection.tsx
import React from "react";
import { Lightbulb, Users, BarChart3 } from "lucide-react";

const AboutSection: React.FC = () => (
  <section id="about" className="bg-blue-50 py-20 px-4 md:px-6">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">About PerfEval</h2>
      <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
        PerfEval is a cutting-edge performance evaluation platform crafted to help teams thrive.
        Whether you're managing a startup or scaling an enterprise, our tools empower your workforce
        through meaningful feedback, data-driven insights and clear performance goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Lightbulb className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To simplify performance management by making it transparent, fair and growth-oriented —
            for individuals and teams alike.
          </p>
        </div>

        {/* People First */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">People First</h3>
          <p className="text-gray-600">
            At PerfEval, we believe performance starts with people. Our platform fosters trust,
            open dialogue and recognition — so employees feel heard, valued and empowered to grow.
          </p>
        </div>

        {/* Actionable Insights */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Actionable Insights</h3>
          <p className="text-gray-600">
            Turn performance data into real progress. PerfEval visualizes strengths, gaps and trends,
            helping managers make smart, data-backed decisions that drive results — not just reports.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-16">
        <blockquote className="text-blue-700 italic font-medium max-w-2xl mx-auto">
          “Empowering organizations to evaluate and elevate performance — with clarity, purpose and empathy.”
        </blockquote>
      </div>
    </div>
  </section>
);

export default AboutSection;
