import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import api from "../services/api";
import {
  FolderKanban,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    if (!title.trim()) {
      alert("Enter Project Name");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await api.post("/api/projects", {
        title,
        description,
        team,
        status: "Active",
        userId: user.id,
      });

      setTitle("");
      setDescription("");
      setTeam("");

      loadProjects();
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
  <div className="space-y-8">

    {/* Header */}
    <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 p-10 text-white shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-6">

          <div className="rounded-3xl bg-white/20 p-5">
            <FolderKanban size={42} />
          </div>

          <div>
            <h1 className="text-6xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-xl text-emerald-100">
              Manage all your active projects
            </p>
          </div>

        </div>

        <div className="rounded-3xl bg-white/20 px-8 py-6 text-center">
          <h2 className="text-5xl font-bold">
            {projects.length}
          </h2>

          <p>Total Projects</p>
        </div>

      </div>

    </div>

    {/* Form */}
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6 flex gap-4">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search Project..."
            className="w-full rounded-2xl border border-emerald-400 py-3 pl-12 pr-4 outline-none"
          />

        </div>

      </div>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Project Name"
          className="w-full rounded-2xl border px-4 py-3 outline-none"
        />

        <textarea
          rows={4}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded-2xl border px-4 py-3 outline-none"
        />

        <select
          value={team}
          onChange={(e)=>setTeam(e.target.value)}
          className="w-full rounded-2xl border px-4 py-3 outline-none"
        >
          <option value="">Select Team</option>
          <option>Development</option>
          <option>Design</option>
          <option>Testing</option>
          <option>Marketing</option>
        </select>

        <button
          onClick={createProject}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-lg font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={20}/>
          {loading ? "Creating..." : "Create Project"}
        </button>

      </div>

    </div>

    {/* Cards */}

    {filteredProjects.length===0 ? (

      <div className="rounded-3xl bg-white p-20 text-center shadow-xl text-gray-500">
        No Projects Found
      </div>

    ) : (

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {filteredProjects.map((project)=>(
          <div
            key={project.id}
            className="rounded-3xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-2xl bg-emerald-100 p-4">
                <FolderKanban
                  size={30}
                  className="text-emerald-700"
                />
              </div>

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                {project.status}
              </span>

            </div>

            <h2 className="mt-6 text-3xl font-bold">
              {project.title}
            </h2>

            <p className="mt-3 text-gray-500">
              {project.description || "No description available"}
            </p>

            <div className="mt-6 flex gap-3">

              <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2 text-white">
                <Pencil size={16}/>
                Edit
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-white">
                <Trash2 size={16}/>
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