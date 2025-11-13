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

  // Token check
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token && typeof window !== "undefined") {
    router.push("/admin/login");
    return null;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  const routeTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/packages": "Packages",
    "/admin/packages/add": "Add Package",
    "/admin/packages/edit": "Edit Package",
    "/admin/news/viewNews": "View News",
    "/admin/news/addNews": "Add News",
    "/admin/users": "Users",
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

          {/* Users */}
          <Link
            href="/admin/users"
            className={`flex items-center gap-3 px-6 py-3 ${activeClass(
              "/admin/users"
            )}`}
          >
            <FiUsers size={20} /> Users
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

              {/* Users */}
              <Link
                href="/admin/users"
                className={`flex items-center gap-3 px-6 py-3 ${activeClass(
                  "/admin/users"
                )}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FiUsers size={20} /> Users
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
            {/* Notification */}
            <button className="relative hover:bg-blue-500 p-2 rounded-full transition">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 bg-white text-gray-800 px-3 py-1 rounded-full">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <span>Admin</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded-full font-semibold"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Center Content */}
        <main className="p-6 flex-1 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
