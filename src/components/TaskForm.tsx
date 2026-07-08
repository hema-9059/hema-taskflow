import { useState } from "react";

export interface TaskData {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

interface Props {
  onAddTask: (task: TaskData) => void;
}

export default function TaskForm({ onAddTask }: Props) {
  const [task, setTask] = useState<TaskData>({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title.trim()) return;

    onAddTask(task);

    setTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >
      <h2>Create New Task</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            resize: "vertical",
          }}
        />

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}