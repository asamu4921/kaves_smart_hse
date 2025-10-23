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
      credentials: "include", // penting untuk cookie JWT
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success && data.redirect) {
      window.location.href = data.redirect;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8">
      <img src="/loginhero.svg" alt="login hero" className="w-1/2 max-w-md mb-6 md:mb-0" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-center text-blue-600 cursor-pointer underline"
        >
          {isRegister ? "Already have an account? Login" : "No account? Register"}
        </p>

        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
