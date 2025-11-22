"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.body.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });

  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
}
