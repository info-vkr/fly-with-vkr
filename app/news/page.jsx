"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function NewsListPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news?page=${page}&limit=${limit}`);
        const data = await res.json();
        setNewsList(data.news);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("❌ Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading news...
      </div>
    );
  }

  if (!newsList.length) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No news available 📰</p>
      </section>
    );
  }

  return (
    <>
      <NavbarSolid />
      <section className="min-h-screen bg-[#F9FAFB] text-gray-900 pt-24 pb-8 px-6 md:px-16 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-[#001F3F] mb-12">
            Latest News & Updates
          </h1>

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/news/${item.slug}`}>
                  <div className="relative w-full h-56">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#001F3F] mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {item.desc || "Read the latest news update."}
                    </p>
                    <span className="inline-block mt-4 text-[#D4AF37] font-medium hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                page === 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#D4AF37] text-[#001F3F] hover:bg-[#D4AF37] hover:text-white"
              } transition-all`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </button>

            <span className="text-gray-700 font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                page === totalPages
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#D4AF37] text-[#001F3F] hover:bg-[#D4AF37] hover:text-white"
              } transition-all`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>
      <FooterSolid />
    </>
  );
}
