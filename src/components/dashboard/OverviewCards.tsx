import {
  FolderKanban,
  Users,
  CheckSquare,
  CircleCheckBig,
} from "lucide-react";

const stats = [
  {
    title: "Projects",
    value: "12",
    color: "from-indigo-500 to-indigo-700",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    value: "6",
    color: "from-violet-500 to-fuchsia-600",
    icon: Users,
  },
  {
    title: "Tasks",
    value: "148",
    color: "from-sky-500 to-cyan-600",
    icon: CheckSquare,
  },
  {
    title: "Completed",
    value: "117",
    color: "from-emerald-500 to-green-600",
    icon: CircleCheckBig,
  },
];

export default function OverviewCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">{item.title}</p>

                <h2 className="mt-3 text-4xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-r ${item.color} p-4 text-white`}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}