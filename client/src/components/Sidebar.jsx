import React, { useState } from 'react';
import logo from "../assets/fu-xuan.png";

const Sidebar = ({ 
  userRole = 'superadmin', 
  activePage = 'dasbor',
  onNavigate = (menuId) => console.log('Navigate to:', menuId),
  userData = { name: 'Asep', location: 'Polibatam' }
}) => {

  const handleMenuClick = (menuId) => {
    onNavigate(menuId);
  };

  // Definisi menu items
  const menuItems = [
    {
      id: 'isi-asesmen',
      label: 'Isi asesmen',
      // icon: <FileText size={24} />,
      section: 'asesmen'
    },
    {
      id: 'rekapitulasi-asesmen',
      label: 'Rekapitulasi asesmen',
      // icon: <Folder size={24} />,
      section: 'asesmen'
    },
    {
      id: 'isi-laporan',
      label: 'Isi laporan kecelakaan',
      // icon: <ClipboardList size={24} />,
      section: 'asesmen'
    },
    {
      id: 'rekapitulasi-laporan',
      label: 'Rekapitulasi laporan kecelakaan',
      // icon: <FileCheck size={24} />,
      section: 'asesmen'
    },
    {
      id: 'denah',
      label: 'Denah',
      // icon: <Map size={24} />,
      section: 'denah'
    },
    {
      id: 'kelola-ruang-kerja',
      label: 'Kelola Ruang Kerja',
      // icon: <Users size={24} />,
      section: 'ruang-kerja',
      adminOnly: true
    },
    {
      id: 'riwayat-langganan',
      label: 'Riwayat langganan',
      // icon: <DollarSign size={24} />,
      section: 'langganan',
      adminOnly: true
    }
  ];

  // Filter menu berdasarkan role
  const getFilteredMenuItems = () => {
    if (userRole === 'superadmin') {
      return menuItems;
    }
    return menuItems.filter(item => !item.adminOnly);
  };

  const filteredMenuItems = getFilteredMenuItems();

  return (
    <div className="w-fit h-screen bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col">
      {/* Logo Header */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-wide">KAVES</h1>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-3xl overflow-hidden">
            <div className="bg-blue-600 w-full h-full flex items-center justify-center">
              <span className="text-yellow-300 text-2xl">👨</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-green-300 text-sm">{userData.location}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-auto py-4 scrollbar-hide">
        {/* Dasbor */}
        <div className="px-4 mb-6">
          <button
            onClick={() => handleMenuClick('dasbor')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activePage === 'dasbor'
                ? 'bg-yellow-500 text-green-900'
                : 'hover:bg-yellow-400 hover:text-green-900'
            }`}
          >
            {/* <LayoutDashboard size={24} /> */}
            <span className="font-semibold text-lg">Dasbor</span>
          </button>
        </div>

        {/* Asesmen Section */}
        <div className="mb-6">
          <h3 className="px-6 mb-3 text-sm font-semibold text-green-300">Asesmen</h3>
          {filteredMenuItems
            .filter(item => item.section === 'asesmen')
            .map(item => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                  activePage === item.id
                    ? 'bg-yellow-500 text-green-900 mx-4 rounded-lg px-4'
                    : 'hover:bg-yellow-400 hover:text-green-900 hover:mx-4 hover:rounded-lg hover:px-4'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
        </div>

        {/* Denah Section */}
        <div className="mb-6">
          <h3 className="px-6 mb-3 text-sm font-semibold text-green-300">Denah</h3>
          <button
            onClick={() => handleMenuClick('denah')}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
              activePage === 'denah'
                ? 'bg-yellow-500 text-green-900 mx-4 rounded-lg px-4'
                : 'hover:bg-yellow-400 hover:text-green-900 hover:mx-4 hover:rounded-lg hover:px-4'
            }`}
          >
            {/* <Map size={24} /> */}
            <span className="font-medium">Denah</span>
          </button>
        </div>

        {/* Ruang Kerja Section - Only for superadmin */}
        {userRole === 'superadmin' && (
          <div className="mb-6">
            <h3 className="px-6 mb-3 text-sm font-semibold text-green-300">Ruang kerja</h3>
            <button
              onClick={() => handleMenuClick('kelola-ruang-kerja')}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                activePage === 'kelola-ruang-kerja'
                  ? 'bg-yellow-500 text-green-900 mx-4 rounded-lg px-4'
                  : 'hover:bg-yellow-400 hover:text-green-900 hover:mx-4 hover:rounded-lg hover:px-4'
              }`}
            >
              {/* <Users size={24} /> */}
              <span className="font-medium">Kelola Ruang Kerja</span>
            </button>
          </div>
        )}

        {/* Langganan Section - Only for superadmin */}
        {userRole === 'superadmin' && (
          <div className="mb-6">
            <h3 className="px-6 mb-3 text-sm font-semibold text-green-300">Langganan</h3>
            <button
              onClick={() => handleMenuClick('riwayat-langganan')}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                activePage === 'riwayat-langganan'
                  ? 'bg-yellow-500 text-green-900 mx-4 rounded-lg px-4'
                  : 'hover:bg-yellow-400 hover:text-green-900 hover:mx-4 hover:rounded-lg hover:px-4'
              }`}
            >
              {/* <DollarSign size={24} /> */}
              <span className="font-medium">Riwayat langganan</span>
            </button>
          </div>
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button 
          onClick={() => handleMenuClick('logout')}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors"
        >
          {/* <LogOut size={20} /> */}
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;