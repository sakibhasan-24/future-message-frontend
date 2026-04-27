import { create } from "zustand";

interface AuthState {
  user: any;
  token: string | null;
  setAuth: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setAuth: (res) => {
   console.log(res)
    // localStorage.setItem("token", res);
    // localStorage.setItem("user", JSON.stringify(user));
    // set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));