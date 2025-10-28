import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Asesmen from "./Asesmen"; // ✅ import komponen baru
import RekapitulasiAsesmen from "./RekapitulasiAsesmen";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white sticky top-0 z-10 flex justify-between items-center p-4 shadow-sm">
          <button
            className="p-2 text-2xl font-bold lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h2 className="text-2xl font-semibold">{activePage}</h2>
          <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
        </header>

        <section className="p-6 space-y-4">
          {/* Dashboard */}
          {activePage === "Dashboard" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Dashboard Overview</h3>
              <p>Ini halaman Dashboard, berisi ringkasan umum.</p>
            </div>
          )}

          {/* Projects → tampilkan komponen Asesmen */}
          {activePage === "Isi Asesmen" && (
            <div>
              <Asesmen />
            </div>
          )}

          {/* Documents */}
          {activePage === "Rekapitulasi Asesmen" && (
            <div>
              <RekapitulasiAsesmen />
            </div>
          )}

          {/* Calendar */}
          {activePage === "Calendar" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Calendar</h3>
              <p>Lihat jadwal kegiatan di kalender kamu.</p>
            </div>
          )}

          {/* Reports */}
          {activePage === "Reports" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Reports</h3>
              <p>Analisis dan laporan performa muncul di sini.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
