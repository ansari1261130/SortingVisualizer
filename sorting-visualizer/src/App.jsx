import React, { useState, useEffect } from "react";
import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 transition-colors duration-300">

      <main className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SortingVisualizer />
        </div>
      </main>
    </div>
  );
}

export default App;
