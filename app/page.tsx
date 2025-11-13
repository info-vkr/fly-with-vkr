"use client";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import Testimonials from "./components/Testimonials";
import OurWorkProcess from "./components/OurWorkProcess";
import NewsCarousel from "./components/NewsGallery";
import VideoSection from "./components/VideoSection";
import { Footer } from "./components/Footer";

export default function Home() {
  const GOLD = "#D4AF37";
  const NAVY = "#001F3F";

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* <!-- Section 5 --> */}
      <Testimonials />

      <NewsCarousel />

      {/* <VideoSection /> */}

      <OurWorkProcess />


      <Footer />
    </main>
  );
}
