import { create } from "zustand";

export type UsersState = {
  count: number;
  isLoading: boolean;
  isSaveLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
  setIsSaveLoading: (loading: boolean) => void;
};

export const useUsersStore = create<UsersState>(
  (set): UsersState => ({
    count: 0,
    isLoading: false,
    isSaveLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading })),
    setIsSaveLoading: (loading) => set(() => ({ isSaveLoading: loading }))
  })
);
