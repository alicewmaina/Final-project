// src/components/landing/PricingSection.tsx
import React from "react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: ["Basic performance tracking", "Unlimited users", "Email support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    features: ["Everything in Free", "Advanced analytics", "Custom reports", "Priority support"],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: ["All Pro features", "Custom integrations", "Dedicated manager"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingSection: React.FC = () => (
  <section id="pricing" className="bg-blue-50 py-16">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl shadow p-8 flex flex-col items-center ${
              tier.highlight ? "bg-white border-2 border-blue-600 scale-105" : "bg-white"
            } transition`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">{tier.price}</div>
            <ul className="mb-6 space-y-2">
              {tier.features.map(f => (
                <li key={f} className="text-gray-700 flex items-center">
                  <span className="mr-2 text-blue-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href={tier.name === "Enterprise" ? "#contact" : "/signup"}
              className={`px-6 py-2 rounded-lg font-medium ${
                tier.highlight
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } transition`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
