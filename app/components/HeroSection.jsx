"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

// NEW FIRST SLIDE ADDED
const slides = [
  {
    title: "Visa Consultation by Experts",
    desc: "Get professional guidance and a smooth process for all your visa needs.",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Explore Sri Lanka with VKR International",
    desc: "Your trusted partner for visa consultancy, curated tour packages, and seamless bus ticket booking.",
    img: "https://plus.unsplash.com/premium_photo-1726869782115-1550d3e5151c?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Discover Paradise by Bus",
    desc: "Book comfortable bus tickets and enjoy scenic journeys across Sri Lanka.",
    img: "https://images.unsplash.com/photo-1759674406719-baa59167036b?auto=format&fit=crop&q=80&w=1026",
  },
  {
    title: "Tailored Tour Packages",
    desc: "Experience curated tours designed for your convenience and pleasure.",
    img: "https://plus.unsplash.com/premium_photo-1726863120414-4bc4ee123054?auto=format&fit=crop&q=80&w=1170",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) =>
          index === current ? (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            ></motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/80 via-[#001F3F]/60 to-[#001F3F]/80"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <motion.h1
          key={current}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={current + "-desc"}
          className="text-lg md:text-xl text-slate-100 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {slides[current].desc}
        </motion.p>

        <motion.div
          key={current + "-buttons"}
          className="flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* UPDATED BUTTON */}
          <a
            href="/services/book"
            className="px-8 py-3 rounded-full font-semibold border transition-all duration-300 hover:bg-[#D4AF37] hover:text-white"
            style={{ borderColor: GOLD}}
          >
            Book Appointment
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent"></div>
    </section>
  );
}
