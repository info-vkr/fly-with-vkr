"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddNewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch news for edit
  useEffect(() => {
    if (!editId) return;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/admin/news/${editId}`);
        const data = await res.json();
        if (res.ok && data.news) {
          setTitle(data.news.title);
          setSlug(data.news.slug);
          setDesc(data.news.desc || "");
          setImg(data.news.img || "");
        } else {
          alert(data.error || "Failed to fetch news");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, [editId]);

  // Upload image via your /api/upload route
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImg(data.url);
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug) {
      alert("Title and Slug are required");
      return;
    }

    setLoading(true);

    try {
      const payload = { title, slug, desc, img };
      const url = editId ? `/api/admin/news/${editId}` : "/api/admin/news";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editId ? "News updated successfully!" : "News added successfully!");
        router.push("/admin/news/viewNews");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting news");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#001F3F] mb-6">
          {editId ? "✏️ Edit News" : "📰 Add News"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border rounded px-3 py-2 h-32"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {uploading && <p className="text-gray-500 mt-1">Uploading...</p>}
            {img && (
              <img
                src={img}
                alt="Uploaded"
                className="mt-2 w-48 h-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-[#D4AF37] text-white px-4 py-2 rounded hover:bg-[#c19b2c]"
            disabled={loading || uploading}
          >
            {loading ? "Saving..." : editId ? "Update News" : "Add News"}
          </button>
        </form>
      </div>
    </section>
  );
}
