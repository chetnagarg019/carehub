import React from "react";
import Link from "next/link";

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300 overflow-hidden w-72 mx-auto transform hover:-translate-y-1 hover:scale-105">
      <div className="w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-800 truncate">{patient.name}</h2>
        <p className="text-gray-700 text-sm"><span className="font-medium">Age:</span> {patient.age}</p>
        <p className="text-gray-700 text-sm"><span className="font-medium">Disease:</span> {patient.disease}</p>

        <Link
          href={`/patients/${patient.id}`}
          className="mt-3 inline-block w-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white py-2 rounded-lg font-semibold transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PatientCard;
