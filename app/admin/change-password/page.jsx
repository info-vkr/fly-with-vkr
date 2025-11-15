"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Eye toggle states
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password updated successfully!");
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("❌ Something went wrong");
    }
  };

  const inputClass =
    "w-full border rounded-lg px-4 py-2 pr-12 focus:ring focus:ring-blue-300";

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Change Password</h2>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="relative">
          <label className="block font-semibold mb-1">Old Password</label>
          <input
            type={showOld ? "text" : "password"}
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-4 top-9 text-gray-600"
          >
            {showOld ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-9 text-gray-600"
          >
            {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block font-semibold mb-1">
            Confirm New Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-9 text-gray-600"
          >
            {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
