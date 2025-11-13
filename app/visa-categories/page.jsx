"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NavbarSolid from "../components/NavbarSolid";
import FooterSolid from "../components/FooterSolid";
import ReactMarkdown from "react-markdown";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function VisaCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      title: "Student Visa",
      image: "/assets/student-visa.jpg",
      description: [
        {
          type: "text",
          content:
            "In Sri Lanka, around 300,000 students sit for their advanced-level exams annually, with many wishing to continue their higher studies overseas. However, most lack an understanding of the procedure and struggle to select a suitable country and subject.",
        },
        {
          type: "text",
          content:
            "At our consultancy, we prioritize the success of our students’ futures and consult them accordingly, distinguishing us from other visa consultancies. We believe that providing student visas is not a means of earning money, but a service we offer to Sri Lankan students. To demonstrate this, we do not charge any fee for processing student visa applications.",
        },
      ],
    },
    {
      title: "Work Visa",
      image: "/assets/work-visa.jpg",
      description: [
        {
          type: "text",
          content:
            "A work visa is a type of legal authorization that allows an individual to work in A foreign country. It is a document that is issued by the government of the country in which the individual wishes to work, and it grants them permission to be employed for a specific period of time.",
        },
        {
          type: "text",
          content:
            "In order to obtain a work visa, an individual typically needs to meet certain criteria, such as having a job offer from a company in the foreign country, possessing the necessary qualifications and skills required for the job, and passing a background check. The process for obtaining a work visa can vary depending on the country, and it may involve submitting an application, attending an interview, and providing supporting documentation.",
        },
        {
          type: "text",
          content:
            "Once a work visa is granted, the individual is legally allowed to work in the foreign country for the specified period of time. They are typically required to abide by the laws and regulations of the foreign country, and they may need to apply for an extension of their visa if they wish to continue working beyond the initial period.",
        },
        {
          type: "text",
          content:
            "Some common examples of working visa categories that allow you to work abroad are covered below:",
        },
        {
          type: "list",
          content: [
            "UK Highly Skilled Migrant Programme",
            "Australia Skilled Migration",
            "New Zealand Skilled Migration",
            "Canada Skilled Worker Programme",
            "UK Visa under the Association Agreement",
          ],
        },
        {
          type: "text",
          content:
            "If you need to work permanently in any country, you have to apply for a permanent residence visa.",
        },
      ],
    },
    {
      title: "Business & Entrepreneur Visa",
      image: "/assets/business-visa.webp",
      description: [
        {
          type: "text",
          content:
            "The Business & Entrepreneur Visa allows you to travel to other countries for business purposes such as:",
        },
        {
          type: "list",
          content: [
            "Attending meetings, conferences and negotiations",
            "Exploring investment or job opportunities",
            "You may also represent a foreign government or overseas entity in business-related activities.",
          ],
        },
        {
          type: "text",
          content:
            "To apply, you need to provide an invitation or letter verifying your business purpose, as well as documents demonstrating your financial stability and assets in Sri Lanka. It’s important to note that this visa does not allow you to engage in permanent employment, which requires a separate work visa.",
        },
      ],
    },
    {
      title: "Permanent Residency",
      image: "/assets/pr-visa.webp",
      description: [
        {
          type: "text",
          content:
            "If you are considering obtaining permanent residency in a foreign country, it is important to understand the requirements and process for doing so. Permanent residency can offer many benefits, such as the ability to live and work in a foreign country indefinitely, access to healthcare and education, and the opportunity to apply for citizenship after a certain period of time.",
        },
        {
          type: "text",
          content:
            "However, the process of obtaining permanent residency can be complex and challenging. Immigration laws and regulations can vary widely between countries, and the criteria for obtaining permanent residency can be quite stringent. It is important to work with an experienced immigration professional who can guide you through the process and help you understand your options.",
        },
        {
          type: "text",
          content:
            "At our firm, we have extensive experience helping clients obtain permanent residency in a variety of countries. We understand the requirements and nuances of the application process, and we can help you determine your eligibility for permanent residency. We will work closely with you to gather the necessary documentation, prepare your application, and navigate any challenges that arise along the way.",
        },
        {
          type: "text",
          content:
            "Whether you are interested in permanent residency in Australia, New Zealand, Canada, or another country, we are here to help. Our goal is to make the process as smooth and stress-free as possible, so you can focus on your new life in your chosen country. Contact us today to learn more about how we can assist you with your permanent residency application.",
        },
      ],
    },
    {
      title: "Visitor Visa",
      image: "/assets/visitor-visa.jpg",
      description: [
        {
          type: "text",
          content:
            "A visitor visa, also sometimes known as a tourist visa, is a non-immigrant visa for individuals who wish to enter a country temporarily for various reasons, such as business,medical treatment, visiting friends or family, or family re-union for a specific period of time.",
        },
        {
          type: "text",
          content:
            "Each country has its own rules and regulations that must be met in order to obtain a visit visa, which may vary depending on the purpose of the visit and the duration of the stay. Some countries require an interview, while others make decisions based solely on documentation provided by the applicant. visas may be issued for single or multiple entries, and the length of stay allowed varies between countries.",
        },
        { type: "text", content: "**Basic Requirements for a Visitor Visa**" },
        {
          type: "list",
          content: [
            "Valid passport: You must have a valid passport that is not due to expire before your planned departure date",
            "Purpose of visit: You must be able to demonstrate a valid purpose for your visit, such as tourism, business, or medical treatment.",
            "Sufficient funds: You must have enough funds to support yourself during your stay in the country and to cover any travel expenses.",
            "Return ticket: You may be required to provide proof of a return ticket or onward travel plans to show that you intend to leave the country before your visa expires.",
            "No criminal history: You may be required to provide a police clearance certificate or other documentation showing that you do not have a criminal history.",
            "Health requirements: You may be required to undergo a medical examination or provide a vaccination certificate to show that you do not pose a health risk to the country.",
            "Proof of ties to your home country: You may need to provide evidence of your ties to your home country, such as employment or property ownership, to show that you have reasons to return after your visit",
          ],
        },
        { type: "text", content: "**Visa Refusals**" },
        {
          type: "text",
          content:
            "Considered a genuine applicant with a genuine purpose, but had your visitor visa application refused? It could have been due to a shortfall in the documents you submitted. We can assist you in re-lodging your application by addressing any shortcomings and ensuring that all necessary documents are included.",
        },
        { type: "text", content: "**Visa Renewals & Reapplications**" },
        {
          type: "text",
          content:
            "If you already have or had a visa and wish to renew or reapply for the same visa category, we also offer our services to assist you. Sri Lanka has 47 foreign embassies, while New Delhi has around 147 foreign embassies.",
        },
        {
          type: "text",
          content:
            "To ensure the best possible service for our clients, we have established a branch in New Delhi. For countries where an interview is required in India, our services include obtaining the Indian visa, airport pickup, accommodation, interview appointment, embassy guidance, and a safe return to Sri Lanka.",
        },
      ],
    },
    {
      title: "Tourist Visa",
      image: "/assets/tourist-visa.jpg",
      description: [
        {
          type: "text",
          content:
            "If you’re planning to visit another country for tourism purposes, our tourist visa consulting service can be a valuable resource. our experience tourist visa consulting offices will help you obtain visas from the countries that you are looking forward to visiting.",
        },
      ],
    },
  ];

  return (
    <>
      <NavbarSolid />

      <section className="min-h-screen bg-[#F9FAFB] text-gray-900 pt-24 pb-8 px-6 md:px-16 flex flex-col items-center justify-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl font-bold text-center mb-10"
          style={{ color: NAVY }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Visa Categories
        </motion.h1>

        {/* Two-column layout */}
        <div className="max-w-7xl w-full grid md:grid-cols-3 gap-10 items-start">
          {/* LEFT: Category Buttons */}
          <div className="md:col-span-1">
            <div className="sticky top-28 flex flex-col gap-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${
                    selectedCategory?.title === cat.title
                      ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-md"
                      : "border-[#D4AF37] text-[#001F3F] hover:bg-[#D4AF37]/10"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT: Selected Category Info */}
          <div className="md:col-span-2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedCategory ? (
                <motion.div
                  key={selectedCategory.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-2xl"
                >
                {/* Image */}
                <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Image
                    src={selectedCategory.image}
                    alt={selectedCategory.title}
                    fill
                    className="object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black/30 rounded-t-2xl"></div>
                <h2 className="absolute bottom-4 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {selectedCategory.title}
                </h2>
                </div>


                  {/* Flexible Description */}
                  <div className="p-6 text-gray-700 text-lg leading-relaxed">
                    {selectedCategory.description.map((block, idx) => {
                      if (block.type === "text") {
                        return (
                          <div key={idx} className="mb-4">
                            <ReactMarkdown>{block.content}</ReactMarkdown>
                          </div>
                        );
                      } else if (block.type === "list") {
                        return (
                          <ul key={idx} className="list-disc list-inside mb-4">
                            {block.content.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-gray-500"
                >
                  <p className="text-lg">
                    Select a visa category from the left to view details.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <FooterSolid />
    </>
  );
}
