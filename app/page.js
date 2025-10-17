"use client";
import React, { useState } from "react";
import Nav from "./components/Nav";
import PatientList from "./components/PatientList";

export default function Page() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Nav search={search} setSearch={setSearch} />
      <PatientList search={search} />
    </>
  );
}
