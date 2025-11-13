"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTourPackage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: "inbound",
    district: "",
    region: "",
    attractions: [{ name: "", description: "", image: "" }],
  });
  const [loading, setLoading] = useState(true);

  const sriLankaDistricts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Vavuniya",
    "Mullaitivu",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  // 🔹 Fetch package data by ID
  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch(`/api/admin/packages/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            category: data.category || "inbound",
            district: data.district || "",
            region: data.region || "",
            attractions:
              data.attractions && data.attractions.length > 0
                ? data.attractions
                : [{ name: "", description: "", image: "" }],
          });
        } else {
          alert("Failed to load package");
        }
      } catch (error) {
        console.error("Error loading package:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPackage();
  }, [id]);

  // 🔹 Handle general input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle attraction change
  const handleAttractionChange = (index, field, value) => {
    const updated = [...formData.attractions];
    updated[index][field] = value;
    setFormData({ ...formData, attractions: updated });
  };

  // 🔹 Add attraction
  const addAttraction = () => {
    setFormData({
      ...formData,
      attractions: [
        ...formData.attractions,
        { name: "", description: "", image: "" },
      ],
    });
  };

  // 🔹 Remove attraction
  const removeAttraction = (index) => {
    const updated = formData.attractions.filter((_, i) => i !== index);
    setFormData({ ...formData, attractions: updated });
  };

  // 🔹 Upload image to Cloudinary
  const uploadToCloudinary = async (file, index) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (res.ok && data.url) {
      handleAttractionChange(index, "image", data.url);
    } else {
      alert("Image upload failed");
    }
  };

  // 🔹 Submit the update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/packages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Package updated successfully!");
      router.push("/admin/packages");
    } else {
      alert("Failed to update package");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading package...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Tour Package
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>

        {/* District or Region */}
        {formData.category === "inbound" ? (
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select District</option>
              {sriLankaDistricts.map((district) => (
                <option key={district} value={district.toLowerCase()}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Region
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Gulf">Gulf</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        )}

        {/* Attractions */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Attractions
          </label>
          {formData.attractions.map((attr, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md bg-gray-50">
              <input
                type="text"
                placeholder="Attraction Name"
                value={attr.name}
                onChange={(e) =>
                  handleAttractionChange(index, "name", e.target.value)
                }
                className="w-full mb-2 border px-3 py-2 rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={attr.description}
                onChange={(e) =>
                  handleAttractionChange(index, "description", e.target.value)
                }
                className="w-full mb-2 border px-3 py-2 rounded"
                required
              />

              {/* Image Upload */}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    uploadToCloudinary(e.target.files[0], index)
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                {attr.image && (
                  <img
                    src={attr.image}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => removeAttraction(index)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAttraction}
            className="text-blue-600 font-semibold mt-2 hover:underline"
          >
            + Add Another Attraction
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
        >
          Update Package
        </button>
      </form>
    </div>
  );
}
