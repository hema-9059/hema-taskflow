import api from "./api";
import type { Task } from "../types/task";

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (
  data: CreateTaskDto
): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (
  id: string
) => {
  await api.delete(`/tasks/${id}`);
};