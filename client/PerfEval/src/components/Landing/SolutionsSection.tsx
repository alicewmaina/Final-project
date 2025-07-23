// src/components/landing/SolutionsSection.tsx
import React from "react";
import { BarChart3, MessageCircle, FileText } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Performance Tracking",
    desc: "Monitor progress and achievements with real-time analytics and dashboards.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-green-600" />,
    title: "Real-Time Feedback",
    desc: "Foster a culture of growth with instant, actionable feedback and peer reviews.",
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: "Comprehensive Reports",
    desc: "Generate detailed reports to inform decisions and drive improvement.",
  },
];

const SolutionsSection: React.FC = () => (
  <section id="solutions" className="bg-white py-16">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Solutions</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-blue-50 rounded-xl p-8 flex flex-col items-center shadow hover:shadow-lg transition"
          >
            {f.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-gray-600 text-center">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionsSection;
