"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import vkrLogo from "@/public/assets/vkr_logo.jpg";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#001F3F]/95 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src={vkrLogo}
              alt="VKR Logo"
              className="object-cover rounded-full"
              fill
              priority
            />
          </div>
          <h1 className="text-xl font-bold">VKR International (Pvt) Ltd</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className="hover:text-[#D4AF37] transition-colors"
            >
              About Us
            </Link>
          </li>
                    <li>
            <Link
              href="/news"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Newses
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/visa-categories"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Visa Categories
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Sliding Side-Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close / Back Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-6 text-2xl font-bold text-gray-800 hover:text-[#D4AF37] transition-colors"
                aria-label="Close Menu"
              >
                &times;
              </button>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-6 text-gray-800 font-medium">
                {[
                  { name: "Home", link: "/" },
                  { name: "About Us", link: "/about-us" },
                  { name: "Services", link: "/services" },
                  { name: "Visa Categories", link: "/visa-categories" },
                  { name: "Contact", link: "/contact-us" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#D4AF37] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
