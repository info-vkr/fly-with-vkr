"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function NewsGallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const [newsList, setNewsList] = useState([]);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?limit=3");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNewsList(data.news || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };
  fetchNews();
}, []);


  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section ref={ref} className="relative py-24 bg-gray-50">
      {/* Background text */}
      <motion.h2
        style={{ y, scale }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-gray-100 select-none pointer-events-none"
      >
        JUST IN
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center text-[#001F3F] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Latest News
          <div className="h-1 w-16 bg-cyan-400 mx-auto mt-3 rounded-full"></div>
        </motion.h3>

        {newsList.length === 0 ? (
          <p className="text-center text-gray-500">No news available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsList.map((news, i) => (
              <motion.div
                key={news._id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <Link href={`/news/${news.slug}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <Image
                      src={news.img} // ✅ your MongoDB field
                      alt={news.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 transition-all duration-300 group-hover:bg-black/60">
                      <h3 className="text-white font-semibold text-lg">
                        {news.title}
                      </h3>
                      <p className="text-white text-sm mt-1 line-clamp-2">
                        {news.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function NewsGallery() {
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch("/api/news");
//         const data = await res.json();
//         console.log("📰 News data from API:", data);
//         setNewsList(data.news || []);
//       } catch (error) {
//         console.error("❌ Error fetching news:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (newsList.length === 0) return <p>No news available.</p>;

//   return (
//     <div>
//       {newsList.map((n) => (
//         <div key={n._id}>
//           <h3>{n.title}</h3>
//           <p>{n.desc}</p>
//           {n.img && <img src={n.img} alt={n.title} width="200" />}
//         </div>
//       ))}
//     </div>
//   );
// }
