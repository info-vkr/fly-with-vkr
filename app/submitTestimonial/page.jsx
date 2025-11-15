"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";

export default function SubmitTestimonialPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/testimonials/addTestimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: "", message: "" });
        setSuccess("Thank you! Your testimonial has been submitted.");
        router.push("/"); // Redirect to home
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit testimonial.");
    }

    setLoading(false);
  };

  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/contact-us-banner.jpeg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Share Your Experience
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            We’d love to hear your thoughts! Leave your review below.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-[#001F3F] mb-6 text-center">
            Submit Review
          </h2>

          {success && (
            <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Write your testimonial..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-white font-semibold py-3 rounded-full shadow-lg hover:bg-[#c19b2c] transition"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </motion.div>
      </section>

      <FooterSolid />
    </>
  );
}
