// src/components/landing/ContactSection.tsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", form);
      if (response.status === 200) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });

        // ✅ Show success toast
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 rounded-xl shadow p-8 flex flex-col space-y-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          {form.email && !form.email.includes("@") && (
            <span className="text-red-500 text-sm">Please enter a valid email address</span>
          )}
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={sent}
          >
            {sent ? "Message Sent!" : "Send Message"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Or email us at{" "}
          <a href="mailto:support@perfeval.com" className="text-blue-600 underline">
            support@perfeval.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
