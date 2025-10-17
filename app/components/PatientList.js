"use client";
import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import { useRouter } from "next/navigation";

const PatientList = ({ search }) => {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/patient/track")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  const handleAddPatient = () => {
    router.push("/addPatient"); // Button click → redirect
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  return (
    <div className="px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        Patient Records
      </h1>

      {/* 👆 Add Patient Button */}
      <div className="text-center mb-10">
        <button
          onClick={handleAddPatient}
          className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium cursor-pointer"
        >
          + Add Patient
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Loading..</p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
