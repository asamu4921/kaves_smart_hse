import { useState } from "react";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isRegister
      ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`
      : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success && data.redirect) {
      window.location.href = data.redirect;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Hero Section */}
      <div className="hidden md:flex w-1/2 h-screen relative">
        <img
          src="/loginhero.svg"
          alt="Login Hero"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5"
        >
          <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-2">
            {isRegister ? "Daftar Akun" : "Masuk ke Akun"}
          </h2>

          {isRegister && (
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nama kamu"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 rounded-md p-2 w-full outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 rounded-md p-2 w-full outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 rounded-md p-2 w-full outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-sm"
          >
            {isRegister ? "Daftar Sekarang" : "Masuk"}
          </button>

          <p
            onClick={() => setIsRegister(!isRegister)}
            className="text-center text-emerald-700 cursor-pointer underline mt-4 hover:text-emerald-800"
          >
            {isRegister
              ? "Sudah punya akun? Masuk"
              : "Belum punya akun? Daftar"}
          </p>

          {message && (
            <p className="text-center text-sm text-gray-600 mt-4 bg-emerald-50 py-2 rounded">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
