"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ViewNewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      setNewsList(data.news || []);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news?")) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setNewsList((prev) => prev.filter((item) => item._id !== id));
        alert("News deleted successfully!");
      } else {
        alert(data.error || "Failed to delete news");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting news");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl font-bold text-[#001F3F]">🗞️ All News</h1>
          <Link
            href="/admin/news/addNews"
            className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-[#c19b2c]"
          >
            + Add News
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : newsList.length === 0 ? (
          <p className="text-gray-500 text-center">No news available.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#001F3F] text-white">
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Slug</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{item.title}</td>
                      <td className="p-3">{item.slug}</td>
                      <td className="p-3">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Link
                          href={`/admin/news/addNews?editId=${item._id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden flex flex-col gap-4">
              {newsList.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 p-4 rounded-lg shadow border"
                >
                  <h2 className="font-semibold text-[#001F3F] mb-1">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Slug:</span> {item.slug}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/news/addNews?editId=${item._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex-1 text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex-1 text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
