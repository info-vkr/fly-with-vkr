"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaTiktok } from "react-icons/fa";

export function Footer() {
  const logoColor = "#D4AF37"; // Original logo color

  const iconVariants = {
    hover: {
      scale: [1, 1.3, 1.1], // bounce
      rotate: [0, 15, -10, 0], // slight rotation
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-[#003f6d] text-gray-200 py-8">
      <div className="max-w-screen-xl mx-auto px-6 text-center space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 flex-wrap">
          <motion.a
            href="https://facebook.com/vkr.kajanan"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-200 hover:text-[${logoColor}]`}
            variants={iconVariants}
            whileHover="hover"
          >
            <span className="sr-only">Facebook</span>
            <FaFacebookF className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/vkag.ency"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-200 hover:text-[${logoColor}]`}
            variants={iconVariants}
            whileHover="hover"
          >
            <span className="sr-only">Instagram</span>
            <FaInstagram className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://wa.me/+94742183333"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-200 hover:text-[${logoColor}]`}
            variants={iconVariants}
            whileHover="hover"
          >
            <span className="sr-only">WhatsApp</span>
            <FaWhatsapp className="w-6 h-6" />
          </motion.a>


          <motion.a
            href="https://www.tiktok.com/@vkrinternational"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-200 hover:text-[${logoColor}]`}
            variants={iconVariants}
            whileHover="hover"
          >
            <span className="sr-only">TikTok</span>
            <FaTiktok className="w-6 h-6" />
          </motion.a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm mt-4">
          © 2025 VKR International Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
