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
    localStorage.setItem("token", res?.data?.token);
    localStorage.setItem("user", JSON.stringify(res?.data?.rest));
    set( res?.data?.rest, res?.data?.token );
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));