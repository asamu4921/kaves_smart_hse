import React from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, activePage, setActivePage }) {
  const navItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Isi Asesmen", icon: "🗂️" },
    { name: "Rekapitulasi Asesmen", icon: "📄" },
    { name: "Calendar", icon: "📅" },
    { name: "Reports", icon: "📈" },
  ];

  return (
    <aside
      className={`fixed z-20 bg-white w-64 h-screen shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} 
        lg:translate-x-0 lg:static flex flex-col justify-between`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-bold">KAVES</h1>
          <button
            className="lg:hidden text-gray-600 hover:text-black"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-200
                ${
                  activePage === item.name
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-200"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            // contoh logout
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-2 justify-center p-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          🔒 Logout
        </button>
      </div>
    </aside>
  );
}
