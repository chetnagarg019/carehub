"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Nav = ({ search, setSearch }) => {
  const [sideBar, setSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggle = () => setSideBar(!sideBar);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-200 bg-white shadow-sm">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* 🩺 Logo */}
        <div className="flex items-center">
          <p className="text-2xl mr-2">🩺</p>
          <span className="text-2xl font-bold tracking-tight text-blue-700">
            Jarurat Care
          </span>
        </div>

        {/*  Desktop Links */}
        <ul className="hidden lg:flex ml-12 space-x-8 font-medium text-gray-700">
          <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
          <li><a href="#" className="hover:text-blue-600 transition">Patients</a></li>
          <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
        </ul>

        {/* 🔍 Search Box */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-full pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* 👤 Auth Buttons */}
        <div className="hidden lg:flex space-x-4">
          {!user ? (
            <>
              <button
                onClick={handleLoginClick}
                className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={handleSignupClick}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md hover:shadow-md transition cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Log Out
            </button>
          )}
        </div>

        {/*  Mobile Menu Toggle */}
        <button onClick={toggle} className="lg:hidden text-gray-700 z-50">
          {sideBar ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/*  Sidebar (Mobile View) */}
      {sideBar && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center pt-20 space-y-6 text-lg shadow-lg animate-slide-down">
          <a href="#" onClick={toggle} className="hover:text-blue-600">Home</a>
          <a href="#" onClick={toggle} className="hover:text-blue-600">Patients</a>
          <a href="#" onClick={toggle} className="hover:text-blue-600">About</a>

          <div className="mt-10 flex space-x-4">
            {!user ? (
              <>
                <button
                  onClick={handleLoginClick}
                  className="py-2 px-4 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignupClick}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
