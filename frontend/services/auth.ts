import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getMe() {
  const response = await api.get("/auth/me");
  return response.data;
}