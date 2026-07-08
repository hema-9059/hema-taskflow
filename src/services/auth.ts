import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post(
    "/api/auth/register",
    data
  );

  localStorage.setItem("token", response.data.token);
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post(
    "/api/auth/login",
    data
  );

  localStorage.setItem("token", response.data.token);
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};