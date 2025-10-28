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
    <div className="min-h-screen flex items-center justify-center">
      <img src="/loginhero.svg" alt="login hero" className="hidden md:block w-1/3 h-screen object-cover" />
      <form onSubmit={handleSubmit} className="w-full max-w space-y-4 m-24 p-4">
        <h1 className="text-4xl font-bold text-center">
          {isRegister ? "Daftar" : "Login"}
        </h1>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            className="border p-4 w-full rounded-xl"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-4 w-full rounded-xl"
        />
      </div>

        <input
          type="password"
          name="password"
          placeholder="Kata sandi"
          value={form.password}
          onChange={handleChange}
          className="border p-4 w-full rounded-xl"
        />

        <button
          type="submit"
          className="w-full text-lg font-semibold bg-green-600 text-white py-4 rounded hover:bg-green-700 rounded-xl"
        >
          {isRegister ? "Daftar" : "Login"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-center font-semibold"
        >
          {isRegister ? (
    <>
      Sudah punya akun?{" "}
      <span className="text-green-700 hover:text-green-800 cursor-pointer">
        Login
      </span>
    </>
  ) : (
    <>
      Belum punya akun?{" "}
      <span className="text-green-700 cursor-pointer">
        Daftar
      </span>
    </>
  )}
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
