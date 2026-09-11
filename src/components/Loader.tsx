"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Loader() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color = mounted && theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="flex items-center justify-center w-full h-full py-12">
      <style>{`
        .loader {
          display: inline-grid;
          width: 80px;
          height: 80px;
        }
        .loader:before,
        .loader:after {
          content: "";
          height: 27px;
          aspect-ratio: 5;
          background:
           conic-gradient(from 135deg at top   , ${color} 90deg, #0000 0),
           conic-gradient(from -45deg at bottom, ${color} 90deg, #0000 0) 12.5% 100%;
          background-size: 20% 50%;
          background-repeat: repeat-x;
          clip-path: inset(0 100% 0 0);
          animation: l9 1s infinite linear;
        }
        .loader:after {
          scale: -1 1;
        }
        @keyframes l9 {
          90%, to { clip-path: inset(0); }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );
}
