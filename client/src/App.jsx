import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to KAVES</h1>
      <p className="mb-8">Smart HSE platform for modern safety and efficiency.</p>
      <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded">
        Login / Register
      </Link>
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
