interface Task {
    id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "Pending";
  dueDate: string;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
}: Props) {
  const priorityColor = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#10b981",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{task.title}</h3>

        <span
          style={{
            background: priorityColor[task.priority],
            color: "#fff",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {task.priority}
        </span>
      </div>

      <p
        style={{
          color: "#555",
          margin: "15px 0",
        }}
      >
        {task.description}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              task.status === "Completed"
                ? "#16a34a"
                : "#f59e0b",
          }}
        >
          {task.status}
        </span>
      </p>

      <p>
        <strong>Due:</strong> {task.dueDate}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => onToggle(task.id)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {task.status === "Completed"
            ? "Mark Pending"
            : "Mark Complete"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}