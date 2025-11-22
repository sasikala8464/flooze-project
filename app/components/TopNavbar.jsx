"use client";

import { FaMoon, FaSun } from "react-icons/fa";

export default function TopNavbar({ onToggle, isMobile, toggleDarkMode, darkMode, sidebarWidth }) {
  const navbarStyle = {
    width: `calc(100% - ${sidebarWidth}px)`,
    height: "60px",
    backgroundColor: darkMode ? "#111827" : "#1f2937",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    fontSize: "20px",
    fontWeight: 600,
    position: "fixed",
    top: 0,
    left: sidebarWidth,
    zIndex: 999,
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  };

  const titleStyle = { fontSize: "20px", fontWeight: 700 };
  const toggleBtnStyle = {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "10px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const darkModeBtnStyle = {
    cursor: "pointer",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  return (
    <div style={navbarStyle}>

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {isMobile && (
          <button style={toggleBtnStyle} onClick={onToggle}>
            ☰
          </button>
        )}
        <button style={darkModeBtnStyle} onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}
