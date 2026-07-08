import {
  Bell,
  Moon,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";

export default function TopNavbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-xl">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Monitor projects, teams and tasks.
        </p>
      </div>

      {/* Center */}

      <div className="hidden w-[420px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">

        <Search
          size={20}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search projects, teams or tasks..."
          className="w-full bg-transparent text-sm outline-none"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="rounded-2xl bg-slate-100 p-3 transition hover:bg-indigo-100">
          <Moon size={20} />
        </button>

        <button className="relative rounded-2xl bg-slate-100 p-3 transition hover:bg-indigo-100">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <button className="rounded-2xl bg-slate-100 p-3 transition hover:bg-indigo-100">
          <Settings size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 px-4 py-2">

          <div className="rounded-full bg-indigo-600 p-2 text-white">

            <UserCircle size={28} />

          </div>

          <div>

            <h3 className="text-sm font-semibold text-slate-800">
              {user?.name || "Administrator"}
            </h3>

            <p className="text-xs text-slate-500">
              {user?.email || "admin@taskflow.com"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}