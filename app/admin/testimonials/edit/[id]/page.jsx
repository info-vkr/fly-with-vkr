"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({ name: "", message: "", status: "active" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch testimonial data
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch(`/api/admin/testimonials/${id}`);
        const data = await res.json();
        if (data.success) {
          setForm({
            name: data.testimonial.name,
            message: data.testimonial.message,
            status: data.testimonial.status || "active",
          });
        } else {
          alert("Failed to fetch testimonial");
        }
      } catch (err) {
        console.error(err);
      }
      setFetching(false);
    };

    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/testimonials/viewTestimonials");
      } else {
        alert("Failed to update testimonial");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating testimonial");
    }

    setLoading(false);
  };

  if (fetching)
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <p className="text-gray-600">Loading testimonial...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ✏️ Edit Review
        </h2>
        <p className="text-gray-500 text-center">
          Update the Review details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
              Name
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
              Message
            </label>
          </div>

          {/* Status */}
          <div>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            {loading && <FiLoader className="animate-spin" size={20} />}
            {loading ? "Updating..." : "Update Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
