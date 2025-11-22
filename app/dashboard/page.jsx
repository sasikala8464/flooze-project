"use client";

import { useEffect, useState } from "react";
import { getRole } from "../products/utils/roles";

export default function DashboardPage({ Component }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getRole());
  }, []);


  if (role !== "manager") {
    return (
      <h1 style={{ color: "red", textAlign: "center", marginTop: "40px" }}>
        Access Denied! Managers Only
      </h1>
    );
  }


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: "30px",
          marginTop: "50px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {Component ? <Component /> : <h2>welcome to Dashboard</h2>}
      </div>
    </div>
  );
}
