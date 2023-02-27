import { create } from "zustand";
import { LoginPageRoute } from "~shared/routes";

export type AuthState = {
  token: string;

  auth: (_token: string) => void;
  unAuth: () => void;
};

const storageKey = "__token";

export const useAuthStore = create<AuthState>(
  (set): AuthState => ({
    token: localStorage.getItem(storageKey) || "",
    auth: (token: string) => {
      localStorage.setItem(storageKey, token);
      set(() => ({ token }));
    },
    unAuth: () => {
      localStorage.removeItem(storageKey);

      set(() => ({ token: "" }));
    }
  })
);
