"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarSolid from "../../components/NavbarSolid";
import FooterSolid from "../../components/FooterSolid";
import { useEffect, useState } from "react";

export default function ServiceDetailTemplate({ title, heroImage, contentImage, highlights, description }) {
      const [bookLink, setBookLink] = useState("/services/book");

  useEffect(() => {
    // Only run on the client
    setBookLink(`/services/book?service=${encodeURIComponent(title)}`);
  }, [title]);
  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${title} hero`}
          fill
          className="object-cover object-center brightness-[0.45]"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={contentImage}
            alt={title}
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#001F3F] mb-6">
            Why Choose Our {title}?
          </h2>
          <ul className="space-y-4 text-gray-700">
            {highlights.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#D4AF37] mr-3 text-xl">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

<div className="mt-10">
    <Link href={bookLink}>
          <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-[#D4AF37] text-[#001F3F] font-semibold rounded-full shadow-md hover:bg-yellow-400 transition-all"
    >
      Book This Service
    </motion.button>
        </Link>

</div>

        </motion.div>
      </section>

      <FooterSolid />
    </>
  );
}
