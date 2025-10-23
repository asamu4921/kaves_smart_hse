import { useState } from "react";

function EmailVerify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // penting agar cookie JWT terbaca
      body: JSON.stringify({ otp }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        window.location.href = "/"; // balik ke landing setelah sukses
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <img src="/loginhero.svg" alt="email verify" className="w-1/2 max-w-md mb-6" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Email Verification</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Verify OTP
        </button>

        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}

export default EmailVerify;
