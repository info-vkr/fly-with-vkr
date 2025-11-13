"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import NavbarSolid from "../../../../components/NavbarSolid";
import FooterSolid from "../../../../components/FooterSolid";

export default function OutboundRegionPage() {
  const { region } = useParams();
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedName = region.charAt(0).toUpperCase() + region.slice(1);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();

        // Filter packages for this region (outbound)
const filtered = data.find(
  (pkg) =>
    pkg.category === "outbound" &&
    pkg.region?.toLowerCase() === region?.toLowerCase()
);


        if (filtered) {
          setAttractions(filtered.attractions);
        }
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [region]);

  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-[url('/assets/outbound-banner.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-bold capitalize"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Explore {formattedName} Region
          </motion.h1>
          <p className="mt-3 text-lg">
            Discover exciting destinations and attractions in {formattedName}.
          </p>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#001F3F] mb-4">
          Top Tourist Attractions in {formattedName}
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading attractions...</p>
        ) : attractions.length === 0 ? (
          <p className="text-gray-600">
            No attractions found for this region yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {attractions.map((attr, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-40 mb-4 rounded overflow-hidden">
                  <img
                    src={attr.image}
                    alt={attr.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#001F3F]">
                  {attr.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {attr.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <FooterSolid />
    </>
  );
}
