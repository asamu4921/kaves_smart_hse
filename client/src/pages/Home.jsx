import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Asesmen from "./Asesmen";

function Home() {
  const [activePage, setActivePage] = useState("isi-asesmen");

  const handleNavigate = (menuId) => {
    if (menuId === "logout") {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }
    setActivePage(menuId);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        {activePage === "isi-asesmen" && <Asesmen />}
        {activePage === "rekapitulasi-asesmen" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-800">
              Rekapitulasi Asesmen
            </h1>
          </div>
        )}
        {activePage === "isi-laporan" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-800">
              Isi Laporan Kecelakaan
            </h1>
          </div>
        )}
        {activePage === "rekapitulasi-laporan" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-800">
              Rekapitulasi Laporan Kecelakaan
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
