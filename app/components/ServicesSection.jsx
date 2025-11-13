"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Parallax movement
  // Add this below your existing y transform
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // grows 10% as you scroll

  const services = [
    {
      title: "Visa Consultation",
      desc: "Book an appointment with our experts to discuss your visa needs.",
      icon: (
        <motion.svg
          className="w-12 h-12 text-[#D4AF37] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.3, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.34 6.584L12 20l-6.5-3.84a12.084 12.084 0 01.34-6.584L12 14z"
          />
        </motion.svg>
      ),
    },
    {
      title: "Tour Management",
      desc: "Explore pre-designed and custom tour packages.",
      icon: (
        <motion.svg
          className="w-12 h-12 text-[#D4AF37] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.3, rotate: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-2.21 0-4 1.79-4 4 0 .63.16 1.22.44 1.74L12 22l3.56-8.26A3.993 3.993 0 0016 12c0-2.21-1.79-4-4-4z"
          />
        </motion.svg>
      ),
    },
    {
      title: "Ticket Booking",
      desc: "Easily search and book bus, flight, and other transport tickets in Sri Lanka.",
      icon: (
        <motion.svg
          className="w-12 h-12 text-[#D4AF37] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.3, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 10V6a2 2 0 00-2-2h-4V2H9v2H5a2 2 0 00-2 2v4a2 2 0 000 4v4a2 2 0 002 2h4v2h6v-2h4a2 2 0 002-2v-4a2 2 0 000-4zM12 15a3 3 0 110-6 3 3 0 010 6z"
          />
        </motion.svg>
      ),
    }    
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-slate-50 overflow-hidden"
      id="services"
    >
      {/* Faint Background Text with Parallax */}
      <motion.h2
        style={{ y, scale }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-gray-100 select-none pointer-events-none"
      >
        SERVICES
      </motion.h2>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.h3
          className="text-3xl md:text-4xl font-extrabold text-[#001F3F] relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h3>
        <div className="h-1 w-16 bg-cyan-400 mx-auto mt-3 rounded-full"></div>

        {/* Carousel Wrapper */}
        <div className="mt-12 overflow-x-auto md:overflow-visible hide-scrollbar">
          <div className="flex md:grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="flex-shrink-0 w-72 md:w-auto relative p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#D4AF37] group mx-4 md:mx-0"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <div className="flex flex-col items-center text-center relative z-10">
                  {service.icon}
                  <h4 className="text-xl font-bold text-[#001F3F] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-500">{service.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#001F3F]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
