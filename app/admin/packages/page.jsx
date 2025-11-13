"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Globe2, MapPin, Trash2, Pencil } from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inbound");

  // ✅ Helper: Capitalize first letter of each word
  function capitalize(text = "") {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error("Error loading packages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  async function deletePackage(id) {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const res = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
        if (res.ok) {
          setPackages((prev) => prev.filter((p) => p._id !== id));
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  }

  const inboundPackages = packages.filter((p) => p.category === "inbound");
  const outboundPackages = packages.filter((p) => p.category === "outbound");
  const displayPackages = activeTab === "inbound" ? inboundPackages : outboundPackages;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Manage Tour Packages
        </h1>

        <Link
          href="/admin/package/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
        >
          <Plus size={18} /> Add New
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-start gap-3 mb-8">
        {["inbound", "outbound"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab === "inbound" ? "Inbound Packages" : "Outbound Packages"}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading packages...</p>
      ) : displayPackages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-10"
        >
          No {activeTab} packages found.
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPackages.map((pkg, i) => (
            <motion.div
              key={pkg._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      pkg.category === "inbound"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {pkg.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(pkg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {pkg.category === "inbound"
                    ? capitalize(pkg.district || "Unnamed")
                    : capitalize(pkg.region || "Unnamed")}
                </h2>

                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    {pkg.category === "inbound" ? (
                      <MapPin size={16} className="text-blue-500" />
                    ) : (
                      <Globe2 size={16} className="text-blue-500" />
                    )}
                    {pkg.category === "inbound"
                      ? capitalize(pkg.district || "-")
                      : capitalize(pkg.region || "-")}
                  </p>
                  <p>
                    {pkg.attractions?.length
                      ? `${pkg.attractions.length} attractions`
                      : "No attractions"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-5">
                <Link
                  href={`/admin/packages/edit/${pkg._id}`}
                  className="text-blue-600 hover:text-blue-800 transition-all flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </Link>
                <button
                  onClick={() => deletePackage(pkg._id)}
                  className="text-red-600 hover:text-red-800 transition-all flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
