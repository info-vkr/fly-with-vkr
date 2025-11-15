"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiPackage,
  FiFileText,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);

const handleLogout = async () => {
  await fetch("/api/admin/logout");
  window.location.href = "/login";
};


  const routeTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/packages": "Packages",
    "/admin/packages/add": "Add Package",
    "/admin/packages/edit": "Edit Package",
    "/admin/news/viewNews": "View News",
    "/admin/news/addNews": "Add News",
    "/admin/change-password": "Change Password",
    "/admin/testimonials/viewTestimonials": "View Testimonials",
    "/admin/testimonials/addTestimonials": "Add Testimonials",
  };

  // Determine base path
  const segments = pathname.split("/").filter(Boolean);
  let basePath = `/${segments.slice(0, 3).join("/")}`;
  if (segments[1] === "dashboard") basePath = "/admin/dashboard";
  const pageTitle = routeTitles[basePath] || segments[segments.length - 1];

  const activeClass = (path) =>
    pathname.startsWith(path)
      ? "bg-blue-200 text-blue-700 font-semibold"
      : "text-gray-700 hover:bg-blue-50";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        <div className="px-6 py-4 text-2xl font-bold text-blue-600 border-b">
          Admin Panel
        </div>
        <nav className="flex-1 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-6 py-3 ${activeClass(
              "/admin/dashboard"
            )}`}
          >
            <FiHome size={20} /> Dashboard
          </Link>

          {/* Packages Menu */}
          <div className="">
            <button
              onClick={() => setPackagesOpen(!packagesOpen)}
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-6 py-3"
            >
              <span className="flex items-center gap-3">
                <FiPackage size={20} /> Packages
              </span>
              {packagesOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {packagesOpen && (
              <div className="mt-2 flex flex-col ml-10 space-y-1">
                <Link
                  href="/admin/packages"
                  className={`px-2 py-1 rounded ${activeClass(
                    "/admin/packages"
                  )}`}
                >
                  All Packages
                </Link>
                <Link
                  href="/admin/packages/add"
                  className={`px-2 py-1 rounded ${activeClass(
                    "/admin/packages/add"
                  )}`}
                >
                  Add Package
                </Link>
              </div>
            )}
          </div>

          {/* News Menu */}
          <div className="">
            <button
              onClick={() => setNewsOpen(!newsOpen)}
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-6 py-3"
            >
              <span className="flex items-center gap-3">
                <FiFileText size={20} /> News
              </span>
              {newsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {newsOpen && (
              <div className="mt-2 flex flex-col ml-10 space-y-1">
                <Link
                  href="/admin/news/viewNews"
                  className={`px-2 py-1 rounded ${activeClass(
                    "/admin/news/viewNews"
                  )}`}
                >
                  View News
                </Link>
                <Link
                  href="/admin/news/addNews"
                  className={`px-2 py-1 rounded ${activeClass(
                    "/admin/news/addNews"
                  )}`}
                >
                  Add News
                </Link>
              </div>
            )}
          </div>

{/* Testimonial Menu */}
<div className="">
  <button
    onClick={() => setTestimonialsOpen(!testimonialsOpen)}
    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-6 py-3"
  >
    <span className="flex items-center gap-3">
      <FiFileText size={20} /> Testimonials
    </span>
    {testimonialsOpen ? <FiChevronUp /> : <FiChevronDown />}
  </button>

  {testimonialsOpen && (
    <div className="mt-2 flex flex-col ml-10 space-y-1">
      <Link
        href="/admin/testimonials/viewTestimonials"
        className={`px-2 py-1 rounded ${activeClass(
          "/admin/testimonials/viewTestimonials"
        )}`}
      >
        View Testimonials
      </Link>

      <Link
        href="/admin/testimonials/addTestimonials"
        className={`px-2 py-1 rounded ${activeClass(
          "/admin/testimonials/addTestimonials"
        )}`}
      >
        Add Testimonials
      </Link>
    </div>
  )}
</div>


          <Link
  href="/admin/change-password"
  className={`flex items-center gap-3 px-6 py-3 ${activeClass(
    "/admin/change-password"
  )}`}
>
  <FiUsers size={20} /> Change Password
</Link>

        </nav>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden">
          <aside className="fixed left-0 top-0 w-64 h-full bg-white shadow-md z-50 flex flex-col transition-transform duration-300">
            <div className="px-6 py-4 text-2xl font-bold text-blue-600 border-b flex justify-between items-center">
              Admin Panel
              <button onClick={() => setSidebarOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-3 px-6 py-3 ${activeClass(
                  "/admin/dashboard"
                )}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FiHome size={20} /> Dashboard
              </Link>

              {/* Packages Menu */}
              <div className="px-6 py-3">
                <button
                  onClick={() => setPackagesOpen(!packagesOpen)}
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-2 py-1"
                >
                  <span className="flex items-center gap-3">
                    <FiPackage size={20} /> Packages
                  </span>
                  {packagesOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {packagesOpen && (
                  <div className="mt-2 flex flex-col ml-5 space-y-1">
                    <Link
                      href="/admin/packages"
                      className={`px-2 py-1 rounded ${activeClass(
                        "/admin/packages"
                      )}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      All Packages
                    </Link>
                    <Link
                      href="/admin/packages/add"
                      className={`px-2 py-1 rounded ${activeClass(
                        "/admin/packages/add"
                      )}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      Add Package
                    </Link>
                  </div>
                )}
              </div>

              {/* News Menu */}
              <div className="px-6 py-3">
                <button
                  onClick={() => setNewsOpen(!newsOpen)}
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-2 py-1"
                >
                  <span className="flex items-center gap-3">
                    <FiFileText size={20} /> News
                  </span>
                  {newsOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {newsOpen && (
                  <div className="mt-2 flex flex-col ml-5 space-y-1">
                    <Link
                      href="/admin/news/viewNews"
                      className={`px-2 py-1 rounded ${activeClass(
                        "/admin/news/viewNews"
                      )}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      View News
                    </Link>
                    <Link
                      href="/admin/news/addNews"
                      className={`px-2 py-1 rounded ${activeClass(
                        "/admin/news/addNews"
                      )}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      Add News
                    </Link>
                  </div>
                )}
              </div>

              {/* Testimonials */}
<div className="">
  <button
    onClick={() => setTestimonialsOpen(!testimonialsOpen)}
    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md px-6 py-3"
  >
    <span className="flex items-center gap-3">
      <FiFileText size={20} /> Testimonials
    </span>
    {testimonialsOpen ? <FiChevronUp /> : <FiChevronDown />}
  </button>

  {testimonialsOpen && (
    <div className="mt-2 flex flex-col ml-10 space-y-1">
      <Link
        href="/admin/testimonials/viewTestimonials"
        className={`px-2 py-1 rounded ${activeClass(
          "/admin/testimonials/viewTestimonials"
        )}`}
        onClick={() => setSidebarOpen(false)}
      >
        View Testimonials
      </Link>

      <Link
        href="/admin/testimonials/addTestimonials"
        className={`px-2 py-1 rounded ${activeClass(
          "/admin/testimonials/addTestimonials"
        )}`}
        onClick={() => setSidebarOpen(false)}
      >
        Add Testimonials
      </Link>
    </div>
  )}
</div>
<Link
  href="/admin/change-password"
  className={`flex items-center gap-3 px-6 py-3 ${activeClass(
    "/admin/change-password"
  )}`}
  onClick={() => setSidebarOpen(false)}
>
  <FiUsers size={20} /> Change Password
</Link>

            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Modern Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 shadow px-6 py-3 text-white">
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 hover:bg-blue-500 rounded transition"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold">{pageTitle}</h1>
          </div>

<div className="flex items-center gap-4">
  {/* Modern Logout Link */}
  <span
    onClick={handleLogout}
    className="relative cursor-pointer text-white font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
  >
    Logout
  </span>
</div>


        </header>

        {/* Center Content */}
        <main className="p-6 flex-1 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
