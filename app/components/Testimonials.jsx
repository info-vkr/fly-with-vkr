"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const GOLD = "#D4AF37";

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials/getTestimonials");
        const data = await res.json();
        if (data.success) setTestimonials(data.testimonials);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  // Setup scroll animations
  const y = useRef("0%");
  const scale = useRef(1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });

    y.current = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    scale.current = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  }, [sectionRef]);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-600">Loading testimonials...</p>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-600">No testimonials yet.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-24 text-center relative overflow-hidden bg-gradient-to-b from-[#003f6d] to-[#18767c]"
    >
      <motion.h2
        style={{ y: y.current, scale: scale.current }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-white/10 select-none pointer-events-none"
      >
        TESTIMONIAL
      </motion.h2>

      {/* Section Title */}
      <motion.div
        className="relative z-10 mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          What People Say
        </h3>
        <div className="h-1 w-16 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
      </motion.div>

      {/* Testimonials grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: GOLD }}
              >
                {t.name.charAt(0)}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-800">{t.name}</h4>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-gray-700 text-left italic text-sm sm:text-base">
              “{t.message}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* Button to submit testimonial */}
      <div className="mt-12">
        <Link
          href="/submitTestimonial"
          className="inline-block bg-[#D4AF37] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#c19b2c] transition"
        >
          Share Your Experience
        </Link>
      </div>
    </section>
  );
}
