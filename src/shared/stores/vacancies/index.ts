import { create } from "zustand";

export type VacanciesState = {
  count: number;
  isLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
};

export const useVacanciesStore = create<VacanciesState>(
  (set): VacanciesState => ({
    count: 0,
    isLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading }))
  })
);
