// src/components/landing/ProductsSection.tsx
import React, { useState } from "react";
import {
  Target,
  Users,
  FileText,
  BarChart3,
  Star,
  BookOpenCheck,
  HeartPulse,
  BrainCog
} from "lucide-react";

const products = [
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Goal Setting & OKRs",
    desc: "Empower teams to set measurable goals aligned with business strategy.",
    more: "Align individual objectives with company-wide goals. Track progress and performance through measurable key results. Visual dashboards help you stay focused and accountable."
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: "360° Feedback",
    desc: "Facilitate peer, manager, and self-evaluations for well-rounded insights.",
    more: "Collect anonymous and transparent feedback from every direction—peers, reports, and managers—to support fair evaluations and professional growth."
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: "Performance Reviews",
    desc: "Customize and automate review cycles with structured templates.",
    more: "Run seamless review cycles with templates, reminders, and rating guides. Tailor reviews for roles, departments, and timelines to meet your organization’s unique needs."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-yellow-600" />,
    title: "Real-Time Analytics",
    desc: "Visualize performance trends and make data-driven decisions.",
    more: "Leverage intuitive dashboards to uncover trends, identify high performers, and detect areas for improvement. Make smarter decisions backed by real-time data."
  },
  {
    icon: <Star className="h-8 w-8 text-pink-600" />,
    title: "Recognition & Rewards",
    desc: "Celebrate achievements with badges, shout-outs, and rewards.",
    more: "Motivate your team with built-in recognition tools—give praise, earn badges, and tie performance to rewards to foster a positive, high-performance culture."
  },
  {
    icon: <BookOpenCheck className="h-8 w-8 text-indigo-600" />,
    title: "Learning & Development",
    desc: "Track growth paths and recommend upskilling opportunities.",
    more: "Create personalized development plans, suggest training resources, and monitor employee progress toward skill-building and career goals."
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-red-500" />,
    title: "Team Pulse Surveys",
    desc: "Check team engagement through anonymous pulse surveys.",
    more: "Gather real-time feedback on morale, workload, and satisfaction through short, anonymous surveys. Identify and address issues before they escalate."
  },
  {
    icon: <BrainCog className="h-8 w-8 text-teal-600" />,
    title: "AI Insights",
    desc: "Leverage AI for smart suggestions, summaries, and alerts.",
    more: "Let AI analyze feedback and performance data to surface summaries, spot risks, and recommend coaching opportunities—automatically."
  }
];

const ProductsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="products" className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Explore Our Products
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              {product.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-600 mt-2">{product.desc}</p>
              <button
                onClick={() => toggleExpand(i)}
                className="mt-4 text-blue-600 font-medium hover:underline focus:outline-none"
              >
                {expandedIndex === i ? "Show Less" : "Learn More →"}
              </button>

              {expandedIndex === i && (
                <div className="mt-4 text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  {product.more}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
