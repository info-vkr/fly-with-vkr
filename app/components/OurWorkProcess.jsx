"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChatBubbleLeftRightIcon, DocumentCheckIcon, PencilIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const steps = [
  {
    number: 1,
    title: "FREE CONSULTATION",
    gradient: "from-orange-400 to-orange-600",
    icon: <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />,
    description:
      "Schedule a free consultation with our experts to discuss your visa requirements and get personalized guidance.",
  },
  {
    number: 2,
    title: "CONTENT ANALYZING",
    gradient: "from-green-400 to-green-600",
    icon: <DocumentCheckIcon className="w-10 h-10 text-white" />,
    description:
      "Our team carefully reviews your documents and information to ensure everything is accurate and complete.",
  },
  {
    number: 3,
    title: "STANDARDIZE DOCUMENTATION",
    gradient: "from-purple-400 to-purple-600",
    icon: <PencilIcon className="w-10 h-10 text-white" />,
    description:
      "We format and organize all your paperwork according to official visa requirements to prevent any delays.",
  },
  {
    number: 4,
    title: "SERVICE PROCESS",
    gradient: "from-lime-400 to-lime-600",
    icon: <Cog6ToothIcon className="w-10 h-10 text-white" />,
    description:
      "Our streamlined service ensures that your visa application is submitted efficiently and monitored until approval.",
  },
];

export default function OurWorkProcess() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { y: -20, opacity: 0, scale: 0 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0.3 },
    visible: { scale: 1.2, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      id="work-process"
      className="relative py-24 bg-gray-50 text-center overflow-hidden"
    >
      {/* Faint background text */}
      <motion.h2
        style={{ y, scale }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-gray-100 select-none pointer-events-none"
      >
        VISA PROCESS
      </motion.h2>

      {/* Section Title */}
      <motion.div
        className="relative z-10 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-4xl md:text-3xl font-bold text-[#001F3F]">
          Our Work Process
        </h3>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Timeline container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Central vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 hidden md:block"></div>

        {/* Steps */}
        <div className="flex flex-col space-y-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="relative w-full flex"
              >
                {/* Step content */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-white rounded-3xl p-6 shadow-xl w-full md:w-[45%] flex flex-col md:flex-row items-start gap-4 ${
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  {/* Icon with gradient circle and animation */}
                  <motion.div
                    variants={iconVariants}
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${step.gradient} shadow-md`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Text */}
                  <div className="text-left">
                    <h4 className="font-semibold text-lg md:text-xl tracking-wide text-[#001F3F] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Timeline connector dot */}
                <motion.div
                  className="hidden md:flex w-8 h-8 bg-white border-4 border-cyan-400 rounded-full absolute left-1/2 -translate-x-1/2 z-10 shadow-lg"
                  variants={dotVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  whileHover={{ scale: 1.4, backgroundColor: "#06b6d4" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
