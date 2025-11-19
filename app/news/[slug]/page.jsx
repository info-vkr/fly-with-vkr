// app/news/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function generateMetadata({ params }) {
  await connectDB();
  const news = await News.findOne({ slug: params.slug }).lean();

  if (!news) {
    return {
      title: "News Not Found | VKR International",
      description: "This news article could not be found.",
    };
  }

  const siteName = "VKR International";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkr.com";

  return {
    title: `${news.title} | ${siteName}`,
    description: news.desc || "Read the latest update from VKR International.",
    openGraph: {
      title: news.title,
      description: news.desc,
      type: "article",
      url: `${baseUrl}/news/${news.slug}`,
      images: [
        {
          url: news.img || `${baseUrl}/default-news.jpg`,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.desc,
      images: [news.img || `${baseUrl}/default-news.jpg`],
    },
  };
}

export default async function NewsDetail({ params }) {
  await connectDB();
  const news = await News.findOne({ slug: params.slug }).lean();

  if (!news) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">News not found 📰</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8f9fb] to-[#ffffff] text-gray-900 pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[#D4AF37] group transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium group-hover:underline">Back to News</span>
        </Link>
      </div>

      {/* Two Column Layout */}
<div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-10 px-6 relative">
  {/* Left Side - Image */}
  <div className="md:w-1/2 relative z-20 flex items-center justify-center">
    {news.img ? (
      <div className="w-full h-80 md:h-[500px] lg:h-[550px] relative overflow-hidden rounded-3xl shadow-xl">
        <Image
          src={news.img}
          alt={news.title}
          fill
          className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    ) : (
      <div className="w-full h-80 md:h-[500px] lg:h-[550px] bg-gray-200 flex items-center justify-center text-gray-600 text-lg rounded-3xl shadow-xl">
        No image available
      </div>
    )}
  </div>

  {/* Right Side - Content Card */}
  <div className="md:w-1/2 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 -mt-20 md:mt-0 relative z-10">
    <div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F3F] mb-6 leading-tight">
        {news.title}
      </h1>
      <div className="text-gray-700 mb-8">
        <p className="leading-relaxed text-lg whitespace-pre-line">
          {news.desc}
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="relative mb-8">
        <div className="h-[2px] w-24 bg-[#D4AF37] rounded-full"></div>
      </div>
    </div>

    {/* Contact Section */}
    <div className="bg-gradient-to-r from-[#fff9f1] to-[#fffefc] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-sm mt-auto">
      <h3 className="font-semibold text-2xl text-[#001F3F] mb-4 flex items-center gap-2">
        Contact Information
      </h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[#D4AF37]" />
          <a
            href="tel:+94123456789"
            className="hover:underline hover:text-[#001F3F] transition-colors"
          >
            +94 77 055 1735
          </a>
        </li>
        <li className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#D4AF37]" />
          <span>No176, 177 Jaffna-Kankesanturai Rd, Chunnakam 40000</span>
        </li>
      </ul>
    </div>
  </div>
</div>

    </section>
  );
}
