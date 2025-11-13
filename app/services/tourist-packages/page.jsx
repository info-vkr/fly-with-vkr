"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarSolid from "../../components/NavbarSolid";
import FooterSolid from "../../components/FooterSolid";
import Link from "next/link";

const inboundDistricts = [
  "Jaffna",
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

const outboundRegions = ["Asia", "Europe", "Gulf", "Canada"];

export default function TouristPackagesPage() {
  const [activeTab, setActiveTab] = useState("inbound");

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[url('/assets/tourist-package.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Tourist Packages
          </motion.h1>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our curated inbound and outbound tour packages for locals
            and foreigners alike.
          </motion.p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setActiveTab("inbound")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "inbound"
                ? "bg-[#001F3F] text-white shadow-lg"
                : "bg-gray-200 text-[#001F3F] hover:bg-gray-300"
            }`}
          >
            Inbound Packages
          </button>

          <button
            onClick={() => setActiveTab("outbound")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "outbound"
                ? "bg-[#001F3F] text-white shadow-lg"
                : "bg-gray-200 text-[#001F3F] hover:bg-gray-300"
            }`}
          >
            Outbound Packages
          </button>
        </div>

        {/* Inbound / Outbound Content */}
        <AnimatePresence mode="wait">
          {activeTab === "inbound" ? (
            <motion.div
              key="inbound"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-semibold text-[#001F3F] mb-6 text-center">
                Explore Sri Lanka by District
              </h2>
              <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
                Discover 25 beautiful districts, each offering unique cultural,
                historical, and natural experiences.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {inboundDistricts.map((district, index) => (
                  <Link
                    href={`/services/tourist-packages/inbound/${district.toLowerCase()}`}
                  >
                    <motion.div
                      className="p-6 bg-white rounded-xl shadow hover:shadow-xl text-center border border-gray-100 cursor-pointer transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <h3 className="text-lg font-bold text-[#001F3F]">
                        {district}
                      </h3>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outbound"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-semibold text-[#001F3F] mb-6 text-center">
                Explore International Packages
              </h2>
              <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
                Travel across the world with our exclusive outbound packages
                designed for every traveler.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {outboundRegions.map((region, index) => (
<Link href={`/services/tourist-packages/outbound/${region.toLowerCase()}`}>
  <motion.div
    className="p-8 bg-white rounded-xl shadow hover:shadow-xl text-center border border-gray-100 cursor-pointer transition-all"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-xl font-bold text-[#001F3F] mb-2">{region}</h3>
    <p className="text-gray-600">Click to view available tour options.</p>
  </motion.div>
</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <FooterSolid />
    </>
  );
}
