// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ViewNewsPage() {
//   const [newsList, setNewsList] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const res = await fetch("/api/admin/news");
//       const data = await res.json();
//       setNewsList(data.news || []);
//     };
//     fetchNews();
//   }, []);

//   return (
//     <section className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-[#001F3F]">🗞️ All News</h1>
//           <Link
//             href="/admin/news/addNews"
//             className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-[#c19b2c]"
//           >
//             + Add News
//           </Link>
//         </div>

//         {newsList.length === 0 ? (
//           <p className="text-gray-500 text-center">No news available.</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-[#001F3F] text-white">
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Slug</th>
//                 <th className="p-3 text-left">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newsList.map((item) => (
//                 <tr
//                   key={item._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-3">{item.title}</td>
//                   <td className="p-3">{item.slug}</td>
//                   <td className="p-3">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </section>
//   );
// }
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
    <section className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
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
                    {/* Edit */}
                    <Link
                      href={`/admin/news/addNews?editId=${item._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>

                    {/* Delete */}
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
        )}
      </div>
    </section>
  );
}
