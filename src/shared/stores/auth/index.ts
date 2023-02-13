import { create } from "zustand";

export type AuthState = {
  token: string;

  auth: (_token: string) => void;
  unAuth: () => void;
};

const storageKey = "__token";

export const useAuthStore = create<AuthState>(
  (set): AuthState => ({
    token: localStorage.getItem(storageKey) || "",
    auth: (token: string) => set(() => ({ token })),
    unAuth: () => set(() => ({ token: "" }))
  })
);

useAuthStore.subscribe((state) => {
  localStorage.setItem(storageKey, state.token);
});
