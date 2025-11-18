"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalTestimonials: 0,
    totalPackages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">Total News</h3>
          <p className="text-3xl mt-2">{stats.totalNews}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">Active Testimonials</h3>
          <p className="text-3xl mt-2">{stats.totalTestimonials}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">Tour Packages</h3>
          <p className="text-3xl mt-2">{stats.totalPackages}</p>
        </div>
      </div>
    </div>
  );
}
