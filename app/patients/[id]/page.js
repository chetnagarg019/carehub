// "use client";


// export default async function PatientDetails({ params }) {
//   const res = await fetch("http://localhost:3000/api/patient/track", {
//     cache: "no-store", // always fresh data
//   });

//   const patients = await res.json();
//   const patient = patients.find((p) => p.id == params.id);

//   if (!patient)
//     return <h2 className="text-center mt-10 text-xl">Patient Not Found</h2>;

//   return (
//     // Outer Wrapper for responsive padding
//     <div className="px-4 sm:px-8 md:px-16 lg:px-24   ">
//       <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mt-24 border border-gray-200 flex flex-col md:flex-row gap-8 ">
//         {/* Left Section - Image */}
//         <div className="md:w-1/2 w-full h-80 overflow-hidden rounded-xl border-black border-4 flex-shrink-0">
//           <img
//             src={patient.image}
//             alt={patient.name}
//             className="w-full h-full object-cover "
//           />
//         </div>

//         {/* Right Section - Details */}
//         <div className="flex-1 flex flex-col justify-center space-y-4">
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
//             {patient.name}
//           </h1>

//           <div className="text-gray-700 space-y-2 text-base">
//             <p>
//               <strong>Age:</strong> {patient.age}
//             </p>
//             <p>
//               <strong>Disease:</strong> {patient.disease}
//             </p>
//             <p>
//               <strong>Contact:</strong> {patient.contact}
//             </p>
//             <p className="mt-2 text-sm leading-relaxed">{patient.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"; // Make it a client component

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PatientDetails() {
  const params = useParams(); // get patient id from URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch("/api/patient/track", { cache: "no-store" });
        const data = await res.json();
        const foundPatient = data.find((p) => p.id == params.id);
        setPatient(foundPatient || null);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading patient data...</p>;
  if (!patient) return <p className="text-center mt-10 text-lg">Patient Not Found</p>;

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mt-24 border border-gray-200 flex flex-col md:flex-row gap-8">
        {/* Left Section - Image */}
        <div className="md:w-1/2 w-full h-80 overflow-hidden rounded-xl border-black border-4 flex-shrink-0">
          <img
            src={patient.image}
            alt={patient.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Details */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
            {patient.name}
          </h1>
          <div className="text-gray-700 space-y-2 text-base">
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Disease:</strong> {patient.disease}</p>
            <p><strong>Contact:</strong> {patient.contact}</p>
            <p className="mt-2 text-sm leading-relaxed">{patient.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

