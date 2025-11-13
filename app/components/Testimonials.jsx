"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#D4AF37";

export default function Testimonials() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const testimonials = [
    {
      name: "John Doe",
      role: "CEO of Something",
      img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1700&q=80",
      feedback:
        "This is a no-brainer if you want to take your business to the next level. If you are looking for the ultimate toolset, this is it!",
    },
    {
      name: "Jane Doe",
      role: "CTO of Business",
      img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=2547&q=80",
      feedback:
        "Thanks for creating this service. My life is so much easier. Thanks for making such a great product.",
    },
    {
      name: "John Smith",
      role: "Creator of Stuff",
      img: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=1256&q=80",
      feedback:
        "Packed with awesome content and exactly what I was looking for. I would highly recommend this to anyone.",
    },
    {
      name: "Emily Stone",
      role: "Designer at FlowStudio",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1700&q=80",
      feedback:
        "Absolutely love the clean design and user experience. The attention to detail is top-notch!",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-24 text-center relative overflow-hidden bg-gradient-to-b from-[#003f6d] to-[#18767c]"
    >
      {/* Background faint text */}
      <motion.h2
        style={{ y, scale }}
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
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2"
                style={{ borderColor: GOLD }}
              />
              <div className="text-left">
                <h4 className="font-bold text-gray-800">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-gray-700 text-left italic text-sm sm:text-base">
              “{t.feedback}”
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
