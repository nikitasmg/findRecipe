import { create } from "zustand";

export type ProjectsState = {
  count: number;
  isLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
};

export const useProjectsStore = create<ProjectsState>(
  (set): ProjectsState => ({
    count: 0,
    isLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading }))
  })
);
