"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

export default function DashboardLayout({ children, title = "" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = sidebarOpen ? 220 : 60;

  const contentStyle = {
    position: "absolute",
    top: 60,
    left: sidebarWidth,
    width: `calc(100vw - ${sidebarWidth}px)`,
    height: "calc(100vh - 60px)",
    overflow: "auto",
    padding: isMobile ? "10px" : "20px",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark-wrapper" : "light-wrapper"}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <TopNavbar
        onToggle={toggleSidebar}
        isMobile={isMobile}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        sidebarWidth={sidebarWidth}
      />
      <main style={contentStyle}>
        {title && <h2 style={{ margin: 0, marginBottom: 12 }}>{title}</h2>}
        {children}
      </main>
      <style jsx>{`
        .light-wrapper,
        .dark-wrapper {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .light-wrapper {
          background: #f3f4f6;
          color: #111827;
        }

        .dark-wrapper {
          background: #0f172a;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
