"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
    const tiktokEmbedUrl = "https://www.youtube.com/shorts/Ekh3PnhBtko1"; 
    // Replace with your TikTok video embed URL
  
    return (
      <section className="py-24 bg-gray-50 relative">
        {/* Faint background text */}
      <motion.h2
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-gray-100 select-none pointer-events-none"
      >
        LATEST VIDEO
      </motion.h2>
  
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-[#001F3F] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Watch Our Video
          </motion.h3>
  
          <motion.div
            className="relative w-full aspect-video mx-auto rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              className="w-full h-full"
              src={tiktokEmbedUrl}
              title="TikTok video player"
              frameBorder="0"
              allow="autoplay; fullscreen; clipboard-write; encrypted-media"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>
    );
  }
