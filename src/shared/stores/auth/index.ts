import { create } from "zustand";

export type AuthState = {
  isAuthorized: boolean;

  auth: () => void;
  unAuth: () => void;
};

export const useAuthStore = create<AuthState>(
  (set): AuthState => ({
    isAuthorized: false,
    auth: () => set(() => ({ isAuthorized: true })),
    unAuth: () => set(() => ({ isAuthorized: false }))
  })
);
