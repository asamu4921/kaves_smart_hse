import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";

import kavesLogo from "./assets/kaves.png";
import proyekImg from "./assets/proyek.jpg";
import orangImg from "./assets/orang.jpg";
import clipboardImg from "./assets/clipboard.png";
import mapImg from "./assets/map.png";
// import alertImg from "./assets/alert.png";
import gridImg from "./assets/grid.png";
import footerLogo from "./assets/kavesfooter.png";
import social1 from "./assets/social.png";
import social2 from "./assets/social (1).png";
import social3 from "./assets/social (2).png";
import vector from "./assets/Vector.png";
import loc from "./assets/loc.png";

function LandingPage() {
  return (
    <div className="font-sans text-gray-800 scroll-smooth">
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src={kavesLogo} alt="KAVES Logo" className="w-10 h-10" />
            <span className="font-bold text-xl text-blue-600">KAVES</span>
          </div>

          <ul className="hidden md:flex items-center gap-6 text-gray-700">
            <li><a href="#home" className="hover:text-blue-600">Beranda</a></li>
            <li><a href="#tentang" className="hover:text-blue-600">Tentang</a></li>
            <li><a href="#fitur" className="hover:text-blue-600">Fitur</a></li>
            <li><a href="#langganan" className="hover:text-blue-600">Langganan</a></li>
            <li><a href="#kontak" className="hover:text-blue-600">Kontak</a></li>
            <li>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Masuk
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="pt-24 bg-gray-50 min-h-[90vh] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12">
        <div className="md:w-1/2 space-y-5">
          <h1 className="text-5xl font-extrabold text-blue-700">KAVES</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pantau dan kelola aktivitas lingkungan kerja dengan mudah. 
            Satu platform untuk produktivitas tanpa batas.
          </p>
          <a href="#langganan" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            Lebih Lanjut
          </a>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src={proyekImg} alt="KAVES Illustration" className="rounded-2xl shadow-lg max-w-md w-full object-cover" />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="tentang" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Apa Itu KAVES?</h2>
          <p className="text-gray-700 leading-relaxed">
            Aplikasi pembantu staff dan kepala K3 dalam mengelola aktivitas
            keselamatan kerja secara efisien. Mulai dari pencatatan laporan
            aktivitas harian, pemetaan otomatis area berisiko, hingga manajemen
            laporan kecelakaan dan asesmen dokumen hazard.
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="fitur" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="md:w-1/2">
            <img src={orangImg} alt="Fitur Kaves" className="rounded-2xl shadow-lg w-full max-w-sm mx-auto" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Fitur Unggulan Kaves</h2>
            <div className="space-y-4">
              {[
                { img: clipboardImg, text: "Formulir Hazard Otomatis" },
                { img: mapImg, text: "Safety Mapping" },
                { img: alertImg, text: "Manajemen Laporan Kecelakaan" },
                { img: gridImg, text: "Ruang Kerja Ekslusif" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img src={f.img} alt={f.text} className="w-8 h-8" />
                  <span className="text-gray-800 font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="langganan" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Mulai Paket Premium</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Nikmati akses tak terbatas untuk memperluas jangkauan dan produktivitas Anda. 
          Dengan paket Premium, semua fitur tersedia tanpa batasan.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
          {/* Free Plan */}
          <div className="border border-gray-300 rounded-2xl p-8 w-full md:w-1/3 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gratis</h3>
            <div className="text-5xl font-extrabold text-blue-600">0</div>
            <p className="text-gray-500 mb-4">Selamanya</p>
            <ul className="text-gray-700 space-y-1 mb-6">
              <li>15 Anggota</li>
              <li>100 Asesmen</li>
              <li>100 Laporan</li>
              <li>2 Proyek Layout</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Pilih Paket</button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 w-full md:w-1/3 bg-blue-50 shadow-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-2">PREMIUM</h3>
            <div className="text-5xl font-extrabold text-blue-600">300</div>
            <p className="text-gray-600 mb-4">Rupiah/Bulan</p>
            <ul className="text-gray-700 space-y-1 mb-6">
              <li>Anggota tak terbatas</li>
              <li>Asesmen tanpa batas</li>
              <li>Laporan tanpa batas</li>
              <li>Proyek Layout tanpa batas</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Pilih Paket</button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="kontak" className="bg-gray-900 text-gray-100 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {/* Logo & Info */}
          <div className="space-y-3">
            <img src={footerLogo} alt="KAVES Footer Logo" className="w-24" />
            <div className="font-bold text-lg">PT. KAVES INDONESIA</div>
            <div className="text-yellow-400">K3L Safety System</div>
            <div className="text-yellow-400">KAVES – Your Safety, Our Priority</div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-blue-400">Tentang</a></li>
              <li><a href="#fitur" className="hover:text-blue-400">Fitur</a></li>
              <li><a href="#langganan" className="hover:text-blue-400">Langganan</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold mb-3">Kontak</h3>
            {[
              { img: social1, text: "@smart__hse" },
              { img: social2, text: "@smart__hse" },
              { img: social3, text: "@smart__hse" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <img src={s.img} alt="icon" className="w-5 h-5" />
                <a href="#" className="hover:text-blue-400">{s.text}</a>
              </div>
            ))}
          </div>

          {/* Alamat */}
          <div>
            <h3 className="font-semibold mb-3">Alamat</h3>
            <div className="flex items-center gap-2 mb-2">
              <img src={vector} alt="phone" className="w-5 h-5" />
              <span>+62 812 3456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={loc} alt="location" className="w-5 h-5" />
              <span>Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}

export default App;
