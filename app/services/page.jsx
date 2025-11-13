// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import NavbarSolid from "../components/NavbarSolid";
// import FooterSolid from "../components/FooterSolid";
// import Link from "next/link"; // Add this import

// const services = [
//   {
//     title: "Tourist Packages",
//     description:
//       "Explore Sri Lanka or travel abroad with our curated inbound and outbound tour packages. Perfect for both locals and foreigners.",
//     img: "/assets/services/tourism.jpg",
//   },
//   {
//     title: "Visa Consultation",
//     description:
//       "Get expert advice and assistance for all your visa applications.",
//     img: "/assets/services/visa-consultant.webp",
//   },
//   {
//     title: "Flight Booking",
//     description: "Book domestic and international flights at the best prices.",
//     img: "/assets/services/flight-booking.jpg",
//   },
//   {
//     title: "Hotel Reservation",
//     description: "Easily reserve hotels across Sri Lanka and abroad.",
//     img: "/assets/services/hotel-reservation.jpg",
//   },
//   {
//     title: "Travel Insurance",
//     description: "Secure your trips with reliable travel insurance options.",
//     img: "/assets/services/travel-insurance.jpg",
//   },
//   {
//     title: "Bus Booking",
//     description:
//       "Quickly book bus tickets across Sri Lanka for a hassle-free journey.",
//     img: "/assets/services/bus-booking.webp",
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <>
//       <NavbarSolid />

//       {/* Hero Section */}
//       <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-[url('/assets/services-banner.jpg')] bg-cover bg-center">
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative z-10 text-center px-6">
//           <motion.h1
//             className="text-4xl md:text-5xl font-bold text-white"
//             initial={{ y: -30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             Our Services
//           </motion.h1>
//           <motion.p
//             className="text-white mt-4 text-lg md:text-xl max-w-2xl mx-auto"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             We provide a wide range of travel solutions to make your journeys
//             smooth and memorable.
//           </motion.p>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: idx * 0.1 }}
//             >
//               <div className="relative h-48 w-full">
//                 <Image
//                   src={service.img}
//                   alt={service.title}
//                   className="object-cover"
//                   fill
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-[#001F3F]">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-700 mb-4">{service.description}</p>
//                 <Link
//                   href={`/services/${service.title
//                     .toLowerCase()
//                     .replace(/\s+/g, "-")}`}
//                 >
//                   <button className="px-4 py-2 bg-[#D4AF37] text-[#001F3F] rounded hover:bg-yellow-500 transition-colors font-semibold">
//                     Learn More
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <FooterSolid />
//     </>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";
import Link from "next/link";

const services = [
  {
    title: "Tourist Packages",
    description:
      "Explore Sri Lanka or travel abroad with our curated inbound and outbound tour packages. Perfect for both locals and foreigners.",
    img: "/assets/services/tourism.jpg",
  },
  {
    title: "Visa Consultation",
    description:
      "Get expert advice and assistance for all your visa applications.",
    img: "/assets/services/visa-consultant.webp",
  },
  {
    title: "Flight Booking",
    description: "Book domestic and international flights at the best prices.",
    img: "/assets/services/flight-booking.jpg",
  },
  {
    title: "Hotel Reservation",
    description: "Easily reserve hotels across Sri Lanka and abroad.",
    img: "/assets/services/hotel-reservation.jpg",
  },
  {
    title: "Travel Insurance",
    description: "Secure your trips with reliable travel insurance options.",
    img: "/assets/services/travel-insurance.jpg",
  },
  {
    title: "Bus Booking",
    description:
      "Quickly book bus tickets across Sri Lanka for a hassle-free journey.",
    img: "/assets/services/bus-booking.webp",
  },
];

export default function ServicesPage() {
  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center bg-[url('/assets/services-banner.jpg')] bg-cover bg-center text-center px-6">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-white mt-4 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We provide a wide range of travel solutions to make your journeys
            smooth and memorable.
          </motion.p>

          {/* Book Service Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link href="/services/book">
              <button className="px-6 py-3 bg-[#D4AF37] text-[#001F3F] font-semibold rounded-full hover:bg-yellow-500 transition-colors">
                Book a Service
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.img}
                  alt={service.title}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#001F3F]">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <Link
                  href={`/services/${service.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <button className="px-4 py-2 bg-[#D4AF37] text-[#001F3F] rounded hover:bg-yellow-500 transition-colors font-semibold">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <FooterSolid />
    </>
  );
}
