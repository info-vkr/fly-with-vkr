"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import NavbarSolid from "../../components/NavbarSolid";
import FooterSolid from "../../components/FooterSolid";

const sriLankanDistricts = [
  "Jaffna", "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
  "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura",
  "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
];

export default function BookServicePage() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    service: selectedService,
    name: "",
    phone: "",
    district: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validation logic
  const validate = (fieldValues = formData) => {
    const newErrors = {};

    if (!fieldValues.service) newErrors.service = "Select a service";
    if (!fieldValues.name.trim()) newErrors.name = "Name is required";
    if (!fieldValues.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(fieldValues.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!fieldValues.district) newErrors.district = "Select your district";
    if (!fieldValues.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/[^\d]/g, "");
      if (/^0\d+/.test(value)) value = "+94" + value.slice(1);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const adminNumber = process.env.NEXT_PUBLIC_ADMIN_NUMBER;
    const message = `*Service Booking Request*\n\nService: ${formData.service}\nName: ${formData.name}\nPhone: ${formData.phone}\nDistrict: ${formData.district}\nDetails: ${formData.description}`;
    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setFormData({
      service: selectedService,
      name: "",
      phone: "",
      district: "",
      description: "",
    });
  };

  return (
    <>
      <NavbarSolid />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-[url('/assets/book_a_service.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Book a Service
          </motion.h1>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fill out the form below and our team will contact you via WhatsApp to confirm your booking.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-8 space-y-6 relative"
        >
          <h2 className="text-3xl font-semibold text-[#001F3F] text-center mb-4">
            Service Booking Form
          </h2>

          {/* Service Type */}
          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.service
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#001F3F]"
              }`}
            >
              <option value="">Select a Service</option>
              <option>Visa Consultation</option>
              <option>Flight Booking</option>
              <option>Hotel Reservation</option>
              <option>Travel Insurance</option>
              <option>Bus Booking</option>
            </select>
            {errors.service && (
              <p className="text-red-500 mt-1 text-sm">{errors.service}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#001F3F]"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (e.g. +94771234567)"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#001F3F]"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* District */}
          <div>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.district
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#001F3F]"
              }`}
            >
              <option value="">Select Your District</option>
              {sriLankanDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 mt-1 text-sm">{errors.district}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your request or requirements"
              rows={5}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#001F3F]"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white font-semibold py-3 rounded-full transition-all ${
              isValid
                ? "bg-[#001F3F] hover:bg-[#003366]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Send via WhatsApp
          </button>

          {/* Toast */}
          {showToast && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
              WhatsApp link opened successfully!
            </div>
          )}
        </motion.form>
      </section>

      <FooterSolid />
    </>
  );
}
