import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import api from "../services/api";
import {
  CheckSquare,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const res = await api.get("/api/tasks");

      const taskData = Array.isArray(res.data)
        ? res.data
        : res.data.tasks || [];

      setTasks(taskData);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) {
      alert("Enter Task Title");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/tasks", {
        title,
        description,
        status: "Pending",
      });

      setTitle("");
      setDescription("");
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
  <div className="space-y-8">

    {/* Header */}
    <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-10 text-white shadow-xl">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">
          <div className="rounded-2xl bg-white/20 p-5">
            <CheckSquare size={42} />
          </div>

          <div>
            <h1 className="text-5xl font-bold">Tasks</h1>
            <p className="mt-2 text-orange-100">
              Organize and track your daily work
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/20 px-8 py-5 text-center">
          <h2 className="text-4xl font-bold">
            {filteredTasks.length}
          </h2>
          <p>Total Tasks</p>
        </div>

      </div>
    </div>

    {/* Search */}

    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-4 text-gray-400"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Task..."
        className="w-full rounded-2xl border border-orange-300 py-3 pl-12 pr-4 outline-none focus:border-orange-500"
      />
    </div>

    {/* Create Task */}

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold">
        Create New Task
      </h2>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-orange-500"
        />

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-orange-500"
        />

        <button
          onClick={createTask}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 text-lg font-semibold text-white hover:bg-orange-700"
        >
          <Plus size={20} />
          {loading ? "Creating..." : "Create Task"}
        </button>

      </div>

    </div>

    {/* Cards */}

    {filteredTasks.length === 0 ? (

      <div className="rounded-3xl bg-white p-12 text-center text-gray-500 shadow-lg">
        No Tasks Available
      </div>

    ) : (

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {filteredTasks.map((task) => (

          <div
            key={task.id}
            className="rounded-3xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-orange-100 p-4">
                <CheckSquare
                  size={28}
                  className="text-orange-600"
                />
              </div>

              <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                {task.status}
              </span>

            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {task.title}
            </h2>

            <p className="mt-3 text-gray-500">
              {task.description || "No description"}
            </p>

            <div className="mt-6 flex gap-3">

              <button className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white">
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