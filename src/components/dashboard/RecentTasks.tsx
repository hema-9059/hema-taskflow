export default function RecentTasks() {
  const tasks = [
    {
      title: "Design Login UI",
      priority: "High",
      status: "Completed",
    },
    {
      title: "Build Dashboard",
      priority: "Medium",
      status: "In Progress",
    },
    {
      title: "Create Project Module",
      priority: "Low",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between border rounded-xl p-4"
          >
            <div>
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-sm text-slate-500">
                {task.priority}
              </p>
            </div>

            <span className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}