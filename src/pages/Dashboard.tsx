import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import api from "../services/api";
import {
  FolderKanban,
  Users,
  CheckSquare,
  PlusCircle,
} from "lucide-react";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const loadDashboard = async () => {
    try {
      const [projects, teams, tasks] = await Promise.all([
        api.get("/api/projects"),
        api.get("/api/teams"),
        api.get("/api/tasks"),
      ]);

      setProjectCount(projects.data.length);
      setTeamCount(teams.data.length);
      setTaskCount(tasks.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <MainLayout>
  <div className="space-y-8">

    {/* Welcome */}
    <div className="rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-white shadow-xl">

      <h1 className="text-5xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-xl text-slate-300">
        Hello, {user.name || "User"}
      </p>

      <p className="mt-2 text-slate-400">
        Manage your projects, teams and tasks from one place.
      </p>

    </div>

    {/* Statistics */}

    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Projects
            </p>

            <h2 className="mt-3 text-5xl font-bold text-emerald-600">
              {projectCount}
            </h2>

          </div>

          <div className="rounded-2xl bg-emerald-100 p-4">
            <FolderKanban
              size={34}
              className="text-emerald-700"
            />
          </div>

        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Teams
            </p>

            <h2 className="mt-3 text-5xl font-bold text-blue-600">
              {teamCount}
            </h2>

          </div>

          <div className="rounded-2xl bg-blue-100 p-4">
            <Users
              size={34}
              className="text-blue-700"
            />
          </div>

        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Tasks
            </p>

            <h2 className="mt-3 text-5xl font-bold text-orange-600">
              {taskCount}
            </h2>

          </div>

          <div className="rounded-2xl bg-orange-100 p-4">
            <CheckSquare
              size={34}
              className="text-orange-700"
            />
          </div>

        </div>

      </div>

    </div>

    {/* Quick Actions */}

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="mt-6 flex flex-wrap gap-4">

        <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
          <PlusCircle size={20} />
          Create Project
        </button>

        <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          <PlusCircle size={20} />
          Create Team
        </button>

        <button className="flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
          <PlusCircle size={20} />
          Create Task
        </button>

      </div>

    </div>

    {/* Activity */}

    <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

      <h2 className="text-3xl font-bold text-slate-700">
        Recent Activity
      </h2>

      <p className="mt-4 text-slate-500">
        No recent activity found.
      </p>

      <p className="text-slate-400">
        Start by creating your first project.
      </p>

    </div>

  </div>
</MainLayout>
);
}