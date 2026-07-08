import {
  CheckCircle,
  FolderKanban,
  Users,
} from "lucide-react";

const activities = [
  {
    title: "New Project Created",
    time: "10 min ago",
    icon: FolderKanban,
  },
  {
    title: "Team Assigned",
    time: "35 min ago",
    icon: Users,
  },
  {
    title: "Task Completed",
    time: "1 hour ago",
    icon: CheckCircle,
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-indigo-100 p-3">
                <Icon
                  size={20}
                  className="text-indigo-600"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}