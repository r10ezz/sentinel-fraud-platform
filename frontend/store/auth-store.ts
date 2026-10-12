import { create } from "zustand";
import { User } from "@/types/dashboard";
import { getMe } from "@/services/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: (token: string, user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    try {
      const data = await getMe();
      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        set({
          token,
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      // If token is invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
