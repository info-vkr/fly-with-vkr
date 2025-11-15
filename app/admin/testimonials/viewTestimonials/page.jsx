"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiTrash2, FiEdit, FiLoader } from "react-icons/fi";

export default function ViewTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        loadData();
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    }
    setDeletingId(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <Link
          href="/admin/testimonials/addTestimonials"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          + Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <FiLoader className="animate-spin text-blue-600" size={24} />
          <span className="ml-2 text-gray-600">Loading testimonials...</span>
        </div>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No testimonials found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{t.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-4">{t.message}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    t.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {t.status}
                </span>

                <div className="flex gap-3">
                  <Link
                    href={`/admin/testimonials/edit/${t._id}`}
                    className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(t._id)}
                    disabled={deletingId === t._id}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 transition"
                  >
                    {deletingId === t._id ? (
                      <FiLoader className="animate-spin" size={16} />
                    ) : (
                      <FiTrash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
