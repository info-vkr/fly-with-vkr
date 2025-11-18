"use client";
import { motion } from "framer-motion";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";

export default function ContactPage() {
  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/contact-us-banner.jpeg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            We’d love to hear from you. Reach out to us for any inquiries or support.
          </p>
        </div>
      </section>

      {/* Contact Info + Map Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 text-gray-800 items-center">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-[#001F3F] mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you're planning your next vacation, need visa assistance, or want help with
            travel arrangements, our friendly team is ready to assist you. You can contact us using
            the details below or visit our office for in-person guidance.
          </p>

          <div className="space-y-5 text-base">
            <div>
              <h4 className="font-semibold text-[#001F3F] mb-1">📍 Address</h4>
              <p>No 176, 177 Jaffna-Kankesanturai Rd, Chunnakam 40000</p>
            </div>

<div className="space-y-4">
  <div>
    <h4 className="font-semibold text-[#001F3F] mb-1">📞 Phone</h4>
    <a
      href="tel:+94742183333"
      className="text-gray-700 hover:text-[#D4AF37] transition-colors"
    >
      +94 74 218 3333
    </a>
  </div>

  <div>
    <h4 className="font-semibold text-[#001F3F] mb-1">☎️ Landline</h4>
    <a
      href="tel:0217284284"
      className="text-gray-700 hover:text-[#D4AF37] transition-colors"
    >
      021 728 4284
    </a>
  </div>
</div>


            <div>
              <h4 className="font-semibold text-[#001F3F] mb-1">✉️ Email</h4>
              <a
                href="mailto:info@vkrinternational.com"
                className="text-gray-700 hover:text-[#D4AF37] transition-colors"
              >
                info@vkrinternational.com
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-[#001F3F] mb-1">🕐 Working Hours</h4>
              <p>Mon - Sat: 9:00 AM - 5:30 PM</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Google Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            title="VKR International Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.3094773325874!2d80.0251459!3d9.7398311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe553c6c07e919%3A0xf6cc5048ef906559!2sVKR%20international%20pvt%20ltd!5e0!3m2!1sen!2slk!4v1762418242880!5m2!1sen!2slk"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        </motion.div>
      </section>

      <FooterSolid />
    </>
  );
}
