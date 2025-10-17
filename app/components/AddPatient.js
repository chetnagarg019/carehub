"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AddPatient() {
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please log in first");
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image || !contact || !age || !disease) {
      toast.error("Please fill all fields");
      return;
    }

    const newPatient = { name, age, disease, contact, image, description };

    try {
      const res = await fetch("/api/patient/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(" Patient added successfully!");
        router.push("/");
      } else {
        toast.error(` Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      {/* ✅ Add Toaster here */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
          <PlusCircle className="text-blue-600" size={28} /> Add New Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["Name", "Age", "Disease", "Contact", "Image URL"].map((field, idx) => (
            <div key={idx}>
              <label className="block mb-1 text-gray-700 font-medium">{field}</label>
              <input
                type={field === "Age" ? "number" : "text"}
                placeholder={`Enter ${field.toLowerCase()}`}
                value={{ Name: name, Age: age, Disease: disease, Contact: contact, "Image URL": image }[field]}
                onChange={(e) => {
                  if (field === "Name") setName(e.target.value);
                  if (field === "Age") setAge(e.target.value);
                  if (field === "Disease") setDisease(e.target.value);
                  if (field === "Contact") setContact(e.target.value);
                  if (field === "Image URL") setImage(e.target.value);
                }}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Description</label>
            <textarea
              placeholder="Enter patient description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md hover:shadow-md 
            transition font-medium cursor-pointer "
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}
