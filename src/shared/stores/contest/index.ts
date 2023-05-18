import { create } from "zustand";

export type ContestState = {
  count: number;
  isLoading: boolean;
  isSaveLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
  setIsSaveLoading: (loading: boolean) => void;
};

export const useContestStore = create<ContestState>(
  (set): ContestState => ({
    count: 0,
    isLoading: false,
    isSaveLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading })),
    setIsSaveLoading: (loading) => set(() => ({ isSaveLoading: loading }))
  })
);
