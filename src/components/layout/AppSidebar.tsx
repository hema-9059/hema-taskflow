import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  UserCircle,
  LogOut,
  BriefcaseBusiness,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: Users,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: UserCircle,
  },
];

export default function AppSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-72 min-h-screen bg-gradient-to-b from-indigo-700 via-violet-700 to-indigo-900 text-white flex flex-col shadow-2xl"
    >
      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-2xl">
            <BriefcaseBusiness size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              TaskFlow
            </h1>

            <p className="text-indigo-100 text-sm">
              Enterprise Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-lg font-semibold"
                    : "text-indigo-100 hover:bg-white/10"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* User */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="rounded-2xl bg-white/10 p-4 mb-4">
          <p className="text-xs text-indigo-100">Logged in as</p>
          <h3 className="mt-1 font-semibold">
            {JSON.parse(localStorage.getItem("user") || "{}")?.name || "User"}
          </h3>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}