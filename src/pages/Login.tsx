import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { Mail, Lock, Users } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login({
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-slate-950 via-gray-900 to-black">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-white">

        <div className="flex items-center gap-5 mb-10">

          <div className="rounded-3xl bg-emerald-500/20 p-5 shadow-xl">
            <Users size={42} />
          </div>

          <div>
            <h1 className="text-6xl font-extrabold">
              TeamFlow
            </h1>

            <p className="mt-2 text-2xl text-emerald-200">
              Work Together. Build Faster.
            </p>
          </div>

        </div>

        <h2 className="text-6xl font-bold leading-tight">
          Smart Team
          <br />
          Management
          <br />
          Platform
        </h2>

        <p className="mt-10 max-w-xl text-xl text-gray-300 leading-9">
          Collaborate with your team,
          manage projects and monitor
          tasks from one modern dashboard.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-3xl bg-black/30 border border-emerald-500/30 backdrop-blur-xl shadow-2xl p-10">

          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-xl">
              <Lock
                size={34}
                className="text-white"
              />
            </div>
          </div>

          <h1 className="mt-6 text-center text-5xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-center text-emerald-200">
            Login to continue
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-500/20 p-3 text-center text-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl bg-white px-12 py-4 outline-none"
              />

            </div>
                        <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl bg-white px-12 py-4 outline-none"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="mt-8 text-center text-emerald-200">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-300 underline"
            >
              Register
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-400">
            © 2026 TeamFlow • Full Stack Project
          </p>

        </div>

      </div>

    </div>
  );
}