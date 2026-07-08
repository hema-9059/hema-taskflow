import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import api from "../services/api";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

interface Team {
  id: string;
  name: string;
  description?: string;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTeams = async () => {
    try {
      const res = await api.get("/api/teams");
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const createTeam = async () => {
    if (!name.trim()) {
      alert("Enter Team Name");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/teams", {
        name,
        description,
      });

      setName("");
      setDescription("");

      loadTeams();
    } catch (err) {
      alert("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
  <div className="space-y-8">

    {/* Header */}
    <div className="rounded-3xl bg-gradient-to-r from-slate-800 to-blue-900 p-10 text-white shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-6">

          <div className="rounded-2xl bg-white/20 p-5">
            <Users size={40} />
          </div>

          <div>
            <h1 className="text-5xl font-bold">
              Teams
            </h1>

            <p className="mt-2 text-lg text-blue-100">
              Create and organize your workspaces
            </p>
          </div>

        </div>

        <div className="rounded-2xl bg-white/20 px-8 py-5 text-center">
          <h2 className="text-4xl font-bold">
            {teams.length}
          </h2>

          <p>Total Teams</p>
        </div>

      </div>

    </div>

    {/* Form */}

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="relative mb-6">

        <Search
          size={20}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Team..."
          className="w-full rounded-2xl border border-blue-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
        />

      </div>

      <div className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team Name"
          className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-blue-600"
        />

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-blue-600"
        />

        <button
          onClick={createTeam}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800"
        >
          <Plus size={20} />
          {loading ? "Creating..." : "Create Team"}
        </button>

      </div>

    </div>

    {/* Cards */}

    {filteredTeams.length === 0 ? (

      <div className="rounded-3xl bg-white p-16 text-center text-gray-500 shadow-lg">
        No Teams Available
      </div>

    ) : (

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {filteredTeams.map((team) => (

          <div
            key={team.id}
            className="rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-blue-100 p-4">
                <Users
                  size={28}
                  className="text-blue-700"
                />
              </div>

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Active
              </span>

            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {team.name}
            </h2>

            <p className="mt-3 text-gray-500">
              {team.description || "No description available"}
            </p>

            <div className="mt-6 flex gap-3">

              <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white">
                <Pencil size={16} />
                Edit
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white">
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
</MainLayout>
);
}