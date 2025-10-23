import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2E4E27] text-white flex flex-col justify-between p-4 fixed h-full">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://via.placeholder.com/40"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="font-bold text-xl">KAVES</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="font-medium">Asep</p>
              <p className="text-sm opacity-80">Polibatam</p>
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-2 bg-[#F7B500] text-black px-4 py-2 rounded-md font-medium hover:bg-[#f8c12e] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
              Dasbor
            </button>
          </nav>
        </div>

        {/* Tombol Keluar */}
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
          </svg>
          Keluar
        </button>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 ml-64 bg-white p-8">
        <h1 className="text-2xl font-bold mb-2">
          Kamu belum tergabung ke ruang kerja manapun!
        </h1>
        <hr className="mb-8" />

        <div className="bg-[#C5EDC5] rounded-xl flex flex-col md:flex-row items-center justify-between p-8 gap-6">
          {/* Buat Ruang Kerja */}
          <div className="flex-1 flex justify-center">
            <button className="border-2 border-dashed border-gray-400 bg-white rounded-lg p-10 flex flex-col items-center hover:bg-gray-50 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-medium">Buat ruang kerja</span>
            </button>
          </div>

          {/* Ilustrasi */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://undraw.co/api/illustrations/df0f6afc-4b74-4c45-8e8c-90d2a94e16df"
              alt="illustration"
              className="max-w-xs"
            />
          </div>
        </div>
      </main>
    </div>
  );
}