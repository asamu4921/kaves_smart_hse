import { useState } from "react";

function EmailVerify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-account`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp }),
      }
    );

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Hero Section */}
      <div className="hidden md:flex w-1/2 h-screen relative">
        <img
          src="/loginhero.svg"
          alt="Email Verification Hero"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-2">
            Verifikasi Email
          </h2>

          <p className="text-center text-gray-600 text-sm mb-4">
            Masukkan kode OTP yang telah dikirim ke email kamu untuk menyelesaikan verifikasi akun.
          </p>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Kode OTP
            </label>
            <input
              type="text"
              placeholder="Masukkan OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 rounded-md p-2 w-full outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-sm"
          >
            Verifikasi Sekarang
          </button>

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

export default EmailVerify;
