"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import vkrLogo from "@/public/assets/vkr_logo.jpg";
import Link from "next/link";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function AboutUsPage() {
  return (
    <>
      <NavbarSolid />

      <main className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-[url('/assets/About-banner.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center px-6">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              About VKR International (Pvt) Ltd
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Seamless travel solutions across Sri Lanka — bus, flight, and other transport bookings, made easy.
            </motion.p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/assets/vkr.jpg"
              alt="VKR Logo"
              className="rounded-xl object-cover shadow-xl"
              width={500}
              height={500}
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 flex flex-col gap-6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-[#001F3F]">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              VKR International (Pvt) Ltd is a premier travel and ticketing company in Sri Lanka. With years of experience, we help customers book bus and flight tickets efficiently, providing exceptional travel guidance and support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team is committed to delivering seamless journeys, prioritizing comfort, safety, and reliability. Transparency and customer satisfaction are at the heart of everything we do.
            </p>
            <Link
              href="#contact"
              className="self-start mt-4 px-8 py-3 bg-[#D4AF37] text-[#001F3F] font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </section>

        {/* Mission & Values */}
        <section className="bg-[#F9FAFB] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2
              className="text-3xl font-bold mb-12 text-[#001F3F]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Mission & Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Mission",
                  description: "Deliver hassle-free travel solutions and exceptional booking experiences.",
                  delay: 0.1,
                },
                {
                  title: "Vision",
                  description: "Become Sri Lanka’s most trusted and innovative travel platform.",
                  delay: 0.2,
                },
                {
                  title: "Values",
                  description: "Customer-first, transparency, trust, and innovation in every service.",
                  delay: 0.3,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay }}
                >
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-[#001F3F]"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Team
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                img: "/assets/avatar-1.jpg",
                description: "Visionary behind VKR International, ensuring seamless travel planning for all.",
                delay: 0.1,
              },
              {
                name: "Jane Smith",
                role: "Operations Manager",
                img: "/assets/avatar-1.jpg",
                description: "Oversees smooth operations and maintains excellent customer service.",
                delay: 0.2,
              },
              {
                name: "Michael Lee",
                role: "Marketing Head",
                img: "/assets/avatar-1.jpg",
                description: "Leads marketing efforts, expanding VKR International’s reach across Sri Lanka.",
                delay: 0.3,
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: member.delay }}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                  width={128}
                  height={128}
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <FooterSolid />
    </>
  );
}
