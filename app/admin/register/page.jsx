"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkIfAdminExists() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (data.exists) {
          setExists(true);
        }
      } catch (err) {
        console.error("Check failed:", err);
      } finally {
        setLoading(false);
      }
    }
    checkIfAdminExists();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Admin account created! Redirecting to login...");
        setTimeout(() => router.push("/admin/login"), 2000);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("❌ Failed to register admin");
    }
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Checking setup...</p>;
  }

  if (exists) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛠️ Admin Setup
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Create your first admin account. This page will be disabled afterwards.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="admin@yourdomain.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register Admin
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </motion.div>
    </div>
  );
}
