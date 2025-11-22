"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTachometerAlt, FaBoxOpen } from "react-icons/fa";

export default function Sidebar({ sidebarOpen }) {
  const [selected, setSelected] = useState(null);

  const links = [
    { id: 1, href: "/products", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: 2, href: "/products", label: "Products", icon: <FaBoxOpen /> },
  ];

  const sidebarStyle = {
    width: sidebarOpen ? "220px" : "60px",
    height: "100vh",
    backgroundColor: "#1f2937",
    color: "#fff",
    paddingTop: "20px",
    paddingLeft: sidebarOpen ? "20px" : "10px",
    position: "fixed",
    top: 0,
    left: 0,
    borderRight: "2px solid #4b5563",
    transition: "width 0.3s, padding 0.3s",
    overflow: "hidden",
    zIndex: 1000,
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: sidebarOpen ? "12px" : "0",
    color: "#9ca3af",
    margin: "15px 0",
    textDecoration: "none",
    fontWeight: 500,
    padding: sidebarOpen ? "10px 15px" : "10px 0",
    borderRadius: "8px",
    transition: "all 0.3s",
    justifyContent: sidebarOpen ? "flex-start" : "center",
  };

  const selectedStyle = {
    backgroundColor: "#374151",
    color: "#ffffff",
  };

  const iconStyle = { fontSize: "22px", minWidth: "22px" };
  const labelStyle = { display: sidebarOpen ? "inline" : "none", whiteSpace: "nowrap", fontSize: "16px" };

  return (
    <div style={sidebarStyle}>
      <h4>Admin Panel</h4>
      <nav>
        {links.map((link, index) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => setSelected(index)}
            style={selected === index ? { ...linkStyle, ...selectedStyle } : linkStyle}
          >
            <span style={iconStyle}>{link.icon}</span>
            <span style={labelStyle}>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
