"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function VisaConsultation() {
  const GOLD = "#D4AF37";
  const NAVY = "#001F3F";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    datetime: "",
    message: "",
  });

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    alert("Appointment booked (demo)");
  }

  return (
    <main className="min-h-screen font-sans bg-gradient-to-b from-white to-slate-50">
      <Navbar />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold" style={{ color: NAVY }}>
            Visa Consultation Appointment
          </h2>
          <p className="mt-2 text-slate-600">
            Book an appointment with our experts. Discuss your visa requirements
            in-person at our office.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <form className="p-6 bg-white rounded shadow" onSubmit={submitForm}>
              <input
                className="w-full border rounded px-3 py-2 mt-3"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full border rounded px-3 py-2 mt-3"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full border rounded px-3 py-2 mt-3"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                className="w-full border rounded px-3 py-2 mt-3"
                placeholder="Country of Interest"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
              <input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 mt-3"
                value={form.datetime}
                onChange={(e) => setForm({ ...form, datetime: e.target.value })}
              />
              <textarea
                className="w-full border rounded px-3 py-2 mt-3"
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                className="w-full mt-4 px-4 py-2 rounded"
                style={{ backgroundColor: NAVY, color: "white" }}
              >
                Submit
              </button>
            </form>

            <div className="p-6 bg-white rounded shadow flex flex-col gap-3">
              <h4 className="font-semibold text-lg" style={{ color: NAVY }}>
                Contact Us Directly
              </h4>
              <p className="text-sm text-slate-500">Phone: +94 70 123 4567</p>
              <p className="text-sm text-slate-500">
                WhatsApp: +94 70 123 4567
              </p>
              <p className="text-sm text-slate-500">
                Office: Colombo, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
