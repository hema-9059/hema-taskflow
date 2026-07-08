import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import {
  User,
  Mail,
  Lock,
  Users,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex bg-gradient-to-br from-cyan-700 via-sky-600 to-blue-900">

    {/* Left Section */}
    <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-white">

      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white/20 p-5 rounded-3xl">
          <Users size={42} />
        </div>

        <div>
          <h1 className="text-6xl font-extrabold">
            TeamFlow
          </h1>

          <p className="mt-2 text-2xl text-cyan-100">
            Create your workspace
          </p>
        </div>

      </div>

      <h2 className="text-6xl font-bold leading-tight">
        Build Teams,
        <br />
        Manage Projects,
        <br />
        Deliver Faster
      </h2>

      <p className="mt-10 text-xl text-cyan-100 max-w-xl leading-9">
        Register your account and start managing
        projects, teams and tasks from one place.
      </p>

    </div>

    {/* Register Card */}
    <div className="flex flex-1 items-center justify-center p-8">

      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10">

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-6">
            <User size={34} className="text-white" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-cyan-100">
          Join TeamFlow today
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-500/20 p-3 text-center text-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-4 text-gray-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl bg-white px-12 py-4 outline-none"
            />
          </div>

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

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-4 text-gray-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-2xl bg-white px-12 py-4 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-semibold text-white hover:scale-105 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="mt-8 text-center text-cyan-100">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>
  );
}